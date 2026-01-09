import type { Env } from "./_types";
import { getGoogleAccessToken, json } from "./utils";

/**
 * Spending / vendor dashboard powered by a BigQuery table.
 * Filters: keyword (q), NAICS (naics), State (state). At least ONE filter is required.
 *
 * Required columns (as provided by user screenshot):
 * - federal_action_obligation (FLOAT)
 * - contracting_officers_determination_of_business_size_code (STRING)  // "S" for small business (common in USASpending)
 * - recipient_uei (STRING)
 * - recipient_name (STRING)
 * - awarding_sub_agency_name (STRING)
 * - primary_place_of_performance_state_code (STRING)
 * - naics_code (INTEGER)
 * - naics_description (STRING)
 * - initial_report_date (DATE)
 * - usaspending_permalink (STRING)
 * - prime_award_base_transaction_description (STRING)
 * - product_or_service_code_description (STRING)
 * - veteran_owned_business (BOOLEAN)
 * - woman_owned_business (BOOLEAN)
 * - small_disadvantaged_business (BOOLEAN)
 * - c8a_program_participant (BOOLEAN)
 * - historically_underutilized_business_zone_hubzone_firm (BOOLEAN)
 */

type PieSlice = { label: string; value: number };
type TimelinePoint = { year: number; quarter: number; total_spend: number; small_spend: number };
type SampleRow = {
  contract_transaction_unique_key: string;
  awarding_sub_agency_name: string;
  recipient_name: string;
  recipient_uei: string;
  state: string;
  naics_code: number | null;
  naics_description: string;
  amount: number;
  initial_report_date: string; // YYYY-MM-DD
  usaspending_permalink: string;
  description: string;
};

type ApiResponse = {
  filters: { q?: string; naics?: number; state?: string };
  source: "bigquery" | "mock";
  summary: { total_spend: number; small_spend: number; unique_small_vendors: number };
  pie: PieSlice[];
  timeline: TimelinePoint[];
  sample: SampleRow[];
  error?: string;
};

const MOCK: ApiResponse = {
  filters: { q: "demo" },
  source: "mock",
  summary: { total_spend: 123456789, small_spend: 45678901, unique_small_vendors: 87 },
  pie: [
    { label: "8(a)", value: 12300000 },
    { label: "HUBZone", value: 9800000 },
    { label: "SDB", value: 8700000 },
    { label: "VOSB", value: 6500000 },
    { label: "WOSB", value: 5400000 },
    { label: "Small (Other)", value: 6700001 },
  ],
  timeline: [
    { year: 2024, quarter: 1, total_spend: 12000000, small_spend: 4200000 },
    { year: 2024, quarter: 2, total_spend: 14500000, small_spend: 5100000 },
    { year: 2024, quarter: 3, total_spend: 16100000, small_spend: 5600000 },
    { year: 2024, quarter: 4, total_spend: 17800000, small_spend: 6100000 },
    { year: 2025, quarter: 1, total_spend: 19100000, small_spend: 6500000 },
  ],
  sample: [
    {
      contract_transaction_unique_key: "demo-001",
      awarding_sub_agency_name: "Department of Homeland Security",
      recipient_name: "Example Small Biz LLC",
      recipient_uei: "ABCD1234EFGH",
      state: "FL",
      naics_code: 541512,
      naics_description: "Computer Systems Design Services",
      amount: 2450000,
      initial_report_date: "2025-10-14",
      usaspending_permalink: "https://www.usaspending.gov/",
      description: "Cybersecurity support services",
    },
  ],
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function toInt(v: string | null): number | null {
  if (!v) return null;
  const cleaned = v.replace(/[^\d]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function isNonEmpty(s?: string | null) {
  return Boolean(s && s.trim().length > 0);
}

/** BigQuery JSON result parser (handles RECORD + REPEATED). */
function parseBQRow(row: any, schemaFields: any[]): any {
  const out: any = {};
  const cells = row?.f ?? [];
  for (let i = 0; i < schemaFields.length; i++) {
    const field = schemaFields[i];
    const cell = cells[i];
    out[field.name] = parseBQCell(cell, field);
  }
  return out;
}

function parseBQCell(cell: any, field: any): any {
  if (!cell) return null;
  const v = cell.v;
  if (v === null || v === undefined) return null;

  // Repeated fields come back as { v: [ {v: ...}, ... ] }
  if (field.mode === "REPEATED") {
    const arr = Array.isArray(v) ? v : [];
    return arr.map((item) => parseBQCell(item, { ...field, mode: "NULLABLE" }));
  }

  // RECORD/STRUCT comes back as { v: { f: [...] } }
  const t = String(field.type ?? "").toUpperCase();
  if (t === "RECORD" || t === "STRUCT") {
    const obj: any = {};
    const subFields = field.fields ?? [];
    const subCells = v.f ?? [];
    for (let i = 0; i < subFields.length; i++) {
      obj[subFields[i].name] = parseBQCell(subCells[i], subFields[i]);
    }
    return obj;
  }

  // Scalars come back as strings.
  if (t === "INTEGER" || t === "INT64") return Number(v);
  if (t === "FLOAT" || t === "FLOAT64" || t === "NUMERIC" || t === "BIGNUMERIC") return Number(v);
  if (t === "BOOLEAN" || t === "BOOL") return v === true || v === "true";
  return v;
}

function buildSQL(tableFqn: string, clauses: string[]) {
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  // Note: Business type is a precedence classification to make the pie chart mutually exclusive.
  return `
WITH base AS (
  SELECT
    contract_transaction_unique_key,
    SAFE_CAST(federal_action_obligation AS FLOAT64) AS federal_action_obligation,
    SAFE_CAST(action_date_fiscal_year AS INT64) AS action_date_fiscal_year,
    CAST(awarding_sub_agency_name AS STRING) AS awarding_sub_agency_name,
    CAST(recipient_uei AS STRING) AS recipient_uei,
    CAST(recipient_name AS STRING) AS recipient_name,
    CAST(primary_place_of_performance_state_code AS STRING) AS state,
    SAFE_CAST(naics_code AS INT64) AS naics_code,
    CAST(naics_description AS STRING) AS naics_description,
    CAST(prime_award_base_transaction_description AS STRING) AS description,
    CAST(product_or_service_code_description AS STRING) AS psc_description,
    CAST(usaspending_permalink AS STRING) AS usaspending_permalink,
    CAST(initial_report_date AS DATE) AS initial_report_date,
    SAFE_CAST(veteran_owned_business AS BOOL) AS veteran_owned_business,
    SAFE_CAST(woman_owned_business AS BOOL) AS woman_owned_business,
    SAFE_CAST(small_disadvantaged_business AS BOOL) AS small_disadvantaged_business,
    SAFE_CAST(c8a_program_participant AS BOOL) AS c8a_program_participant,
    SAFE_CAST(historically_underutilized_business_zone_hubzone_firm AS BOOL) AS hubzone_firm,
    UPPER(CAST(contracting_officers_determination_of_business_size_code AS STRING)) AS size_code
  FROM \`${tableFqn}\`
  ${where}
),
typed AS (
  SELECT
    *,
    size_code IN ('S', 'SMALL', 'SMALL BUSINESS') AS is_small,
    CASE
      WHEN size_code IN ('S', 'SMALL', 'SMALL BUSINESS') THEN
        CASE
          WHEN c8a_program_participant THEN '8(a)'
          WHEN hubzone_firm THEN 'HUBZone'
          WHEN small_disadvantaged_business THEN 'SDB'
          WHEN veteran_owned_business THEN 'VOSB'
          WHEN woman_owned_business THEN 'WOSB'
          ELSE 'Small (Other)'
        END
      ELSE 'Other than Small'
    END AS business_type
  FROM base
),
summary AS (
  SELECT
    SUM(COALESCE(federal_action_obligation, 0)) AS total_spend,
    SUM(IF(is_small, COALESCE(federal_action_obligation, 0), 0)) AS small_spend,
    COUNT(DISTINCT IF(is_small, recipient_uei, NULL)) AS unique_small_vendors
  FROM typed
),
pie AS (
  SELECT business_type AS label, SUM(COALESCE(federal_action_obligation, 0)) AS value
  FROM typed
  WHERE is_small
  GROUP BY label
),
by_qtr AS (
  SELECT
    EXTRACT(YEAR FROM initial_report_date) AS year,
    EXTRACT(QUARTER FROM initial_report_date) AS quarter,
    SUM(COALESCE(federal_action_obligation, 0)) AS total_spend,
    SUM(IF(is_small, COALESCE(federal_action_obligation, 0), 0)) AS small_spend
  FROM typed
  WHERE initial_report_date IS NOT NULL
  GROUP BY year, quarter
),
sample AS (
  SELECT
    contract_transaction_unique_key,
    awarding_sub_agency_name,
    recipient_name,
    recipient_uei,
    state,
    naics_code,
    naics_description,
    COALESCE(federal_action_obligation, 0) AS amount,
    CAST(initial_report_date AS STRING) AS initial_report_date,
    usaspending_permalink,
    description
  FROM typed
  ORDER BY amount DESC
  LIMIT @limit
)
SELECT
  (SELECT AS STRUCT * FROM summary) AS summary,
  (SELECT ARRAY_AGG(STRUCT(label, value) ORDER BY value DESC) FROM pie) AS pie,
  (SELECT ARRAY_AGG(STRUCT(year, quarter, total_spend, small_spend) ORDER BY year, quarter) FROM by_qtr) AS timeline,
  (SELECT ARRAY_AGG(STRUCT(
    contract_transaction_unique_key,
    awarding_sub_agency_name,
    recipient_name,
    recipient_uei,
    state,
    naics_code,
    naics_description,
    amount,
    initial_report_date,
    usaspending_permalink,
    description
  )) FROM sample) AS sample
`;
}

export async function onRequestGet({ request, env, waitUntil }: { request: Request; env: Env; waitUntil: (p: Promise<any>) => void }) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim();
  const naics = toInt(url.searchParams.get("naics"));
  const stateRaw = (url.searchParams.get("state") ?? "").trim();
  const state = stateRaw ? stateRaw.toUpperCase().slice(0, 2) : "";
  const limit = clamp(Number(url.searchParams.get("limit") ?? env.BQ_LIMIT ?? 50), 1, 200);

  if (!isNonEmpty(q) && !naics && !isNonEmpty(state)) {
    return json(
      { ...MOCK, filters: {}, error: "Provide at least one filter: q, naics, or state." } satisfies ApiResponse,
      { status: 400 }
    );
  }

  const cacheKey = new Request(url.toString(), request);
  const cache = caches.default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  try {
    let clientEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let privateKey = env.GOOGLE_PRIVATE_KEY;

    // Support storing the whole Google service account JSON as a single secret.
    // Prefer explicit EMAIL/PRIVATE_KEY if set; otherwise derive from JSON.
    if ((!clientEmail || !privateKey) && env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      try {
        const parsed = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_JSON) as { client_email?: string; private_key?: string };
        clientEmail = clientEmail ?? parsed.client_email;
        privateKey = privateKey ?? parsed.private_key;
      } catch {
        // Ignore malformed JSON; will fall back to mock mode below.
      }
    }

    const projectId = env.BQ_PROJECT_ID ?? "govspend1";
    const tableFqn = env.BQ_TABLE_FQN ?? "govspend1.cc.cc3";

    // If BigQuery isn't configured, return demo data filtered a bit.
    if (!clientEmail || !privateKey || !projectId || !tableFqn) {
      const demo: ApiResponse = {
        ...MOCK,
        filters: { ...(q ? { q } : {}), ...(naics ? { naics } : {}), ...(state ? { state } : {}) },
        source: "mock",
      };
      const res = json(demo, { status: 200 });
      res.headers.set("Cache-Control", "public, max-age=60");
      waitUntil(cache.put(cacheKey, res.clone()));
      return res;
    }

    const token = await getGoogleAccessToken({
      clientEmail,
      privateKeyPem: privateKey,
      scope: "https://www.googleapis.com/auth/bigquery",
    });

    const clauses: string[] = [];
    const params: any[] = [
      { name: "limit", parameterType: { type: "INT64" }, parameterValue: { value: String(limit) } },
    ];

    if (isNonEmpty(q)) {
      clauses.push(`(
        LOWER(recipient_name) LIKE CONCAT('%', LOWER(@q), '%')
        OR LOWER(awarding_sub_agency_name) LIKE CONCAT('%', LOWER(@q), '%')
        OR LOWER(CAST(prime_award_base_transaction_description AS STRING)) LIKE CONCAT('%', LOWER(@q), '%')
        OR LOWER(CAST(product_or_service_code_description AS STRING)) LIKE CONCAT('%', LOWER(@q), '%')
        OR CAST(naics_code AS STRING) LIKE CONCAT('%', @q, '%')
        OR LOWER(naics_description) LIKE CONCAT('%', LOWER(@q), '%')
      )`);
      params.push({ name: "q", parameterType: { type: "STRING" }, parameterValue: { value: q } });
    }

    if (naics) {
      clauses.push(`naics_code = @naics`);
      params.push({ name: "naics", parameterType: { type: "INT64" }, parameterValue: { value: String(naics) } });
    }

    if (isNonEmpty(state)) {
      clauses.push(`primary_place_of_performance_state_code = @state`);
      params.push({ name: "state", parameterType: { type: "STRING" }, parameterValue: { value: state } });
    }

    const query = buildSQL(tableFqn, clauses);

    const body = {
      query,
      useLegacySql: false,
      parameterMode: "NAMED",
      queryParameters: params,
      location: env.BQ_LOCATION ?? "US",
    };

    const r = await fetch(`https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/queries`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const t = await r.text();
      throw new Error(`BigQuery query failed (${r.status}): ${t.slice(0, 200)}`);
    }

    const out = (await r.json()) as any;
    const schemaFields = out.schema?.fields ?? [];
    const row0 = out.rows?.[0];
    const parsed = row0 ? parseBQRow(row0, schemaFields) : {};

    const summary = parsed.summary ?? {};
    const pie = (parsed.pie ?? []) as any[];
    const timeline = (parsed.timeline ?? []) as any[];
    const sample = (parsed.sample ?? []) as any[];

    const resp: ApiResponse = {
      filters: { ...(q ? { q } : {}), ...(naics ? { naics } : {}), ...(state ? { state } : {}) },
      source: "bigquery",
      summary: {
        total_spend: Number(summary.total_spend ?? 0),
        small_spend: Number(summary.small_spend ?? 0),
        unique_small_vendors: Number(summary.unique_small_vendors ?? 0),
      },
      pie: pie.map((s) => ({ label: String(s.label ?? ""), value: Number(s.value ?? 0) })).filter((s) => s.label),
      timeline: timeline
        .map((p) => ({
          year: Number(p.year ?? 0),
          quarter: Number(p.quarter ?? 0),
          total_spend: Number(p.total_spend ?? 0),
          small_spend: Number(p.small_spend ?? 0),
        }))
        .filter((p) => p.year && p.quarter),
      sample: sample.map((x) => ({
        contract_transaction_unique_key: String(x.contract_transaction_unique_key ?? ""),
        awarding_sub_agency_name: String(x.awarding_sub_agency_name ?? ""),
        recipient_name: String(x.recipient_name ?? ""),
        recipient_uei: String(x.recipient_uei ?? ""),
        state: String(x.state ?? ""),
        naics_code: x.naics_code === null || x.naics_code === undefined ? null : Number(x.naics_code),
        naics_description: String(x.naics_description ?? ""),
        amount: Number(x.amount ?? 0),
        initial_report_date: String(x.initial_report_date ?? ""),
        usaspending_permalink: String(x.usaspending_permalink ?? ""),
        description: String(x.description ?? ""),
      })),
    };

    const res = json(resp, { status: 200 });
    res.headers.set("Cache-Control", "public, max-age=120");
    waitUntil(cache.put(cacheKey, res.clone()));
    return res;
  } catch (e: any) {
    const demo: ApiResponse = {
      ...MOCK,
      filters: { ...(q ? { q } : {}), ...(naics ? { naics } : {}), ...(state ? { state } : {}) },
      source: "mock",
      error: String(e?.message ?? e),
    };
    const res = json(demo, { status: 200 });
    res.headers.set("Cache-Control", "public, max-age=30");
    waitUntil(cache.put(cacheKey, res.clone()));
    return res;
  }
}
