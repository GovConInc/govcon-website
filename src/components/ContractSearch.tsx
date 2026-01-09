import { useMemo, useState } from "react";
import Card from "./Card";
import StatCard from "./StatCard";
import { Button } from "./Button";
import SpendingCharts from "./SpendingCharts";
import { searchSpending } from "../lib/api";
import type { SampleRow, SpendingDashboardResponse } from "../lib/types";
import { isoToShortDate, usd, compact } from "../lib/format";

function clean(s: string) {
  return s.trim();
}

export default function ContractSearch() {
  const [q, setQ] = useState("");
  const [naics, setNaics] = useState("");
  const [state, setState] = useState("");

  const [data, setData] = useState<SpendingDashboardResponse | null>(null);
  const [source, setSource] = useState<"bigquery" | "mock">("mock");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const filtersOk = useMemo(() => {
    return Boolean(clean(q) || clean(naics) || clean(state));
  }, [q, naics, state]);

  async function runSearch() {
    setErr(null);
    if (!filtersOk) {
      setErr("Give me at least one filter: keyword, NAICS, or state.");
      return;
    }
    setLoading(true);
    try {
      const out = await searchSpending({
        q: clean(q) || undefined,
        naics: clean(naics) || undefined,
        state: clean(state) || undefined,
        limit: 50,
      });
      setData(out);
      setSource(out.source);
      if (out.error) setErr(out.error);
    } catch (e: any) {
      setErr(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  }

  const summary = data?.summary;
  const sample: SampleRow[] = data?.sample ?? [];
  const hasResults = Boolean(data && (summary || sample.length));

  const totalSpend = summary?.total_spend ?? 0;
  const smallSpend = summary?.small_spend ?? 0;
  const smallVendors = summary?.unique_small_vendors ?? 0;

  return (
    <div className="space-y-4">
      <Card className="p-5" hover={false}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-gov-blue">Spending Dashboard</p>
            <p className="mt-1 text-sm text-slate-600">
              Search by keyword, NAICS, and/or state. This computes totals, small business breakdown, vendor counts, and a quarterly timeline.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Source: <span className="font-semibold">{source}</span>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold tracking-wide text-slate-600">Keyword</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Try: "DHS", "janitorial", "Lockheed", "cyber"...'
              className="focus-ring mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold tracking-wide text-slate-600">NAICS</label>
            <input
              value={naics}
              onChange={(e) => setNaics(e.target.value)}
              placeholder="541512"
              className="focus-ring mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold tracking-wide text-slate-600">State</label>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="FL"
              className="focus-ring mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm uppercase text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <Button onClick={() => runSearch()} disabled={loading} className="w-full sm:w-48">
              {loading ? "Running…" : "Run Analysis"}
            </Button>
          </div>
        </div>

        {err ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {err}
          </div>
        ) : null}
      </Card>

      {hasResults ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Gov Spend" value={usd(totalSpend)} detail="Sum of federal_action_obligation" />
          <StatCard label="Small Biz Spend" value={usd(smallSpend)} detail="Size code indicates Small Business" />
          <StatCard label="Unique Small Vendors" value={compact(smallVendors)} detail="Distinct recipient UEI (small only)" />
        </div>
      ) : null}

      {data?.pie?.length || data?.timeline?.length ? (
        <SpendingCharts pie={data?.pie ?? []} timeline={data?.timeline ?? []} />
      ) : null}

      {sample.length ? (
        <Card className="overflow-hidden" hover={false}>
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Top Transactions (by obligation)</p>
              <p className="mt-1 text-xs text-slate-600">Sample rows returned from the filtered dataset (limited).</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Vendor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Agency</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">State</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">NAICS</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Report Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Link</th>
                </tr>
              </thead>
              <tbody>
                {sample.map((r) => (
                  <tr key={r.contract_transaction_unique_key} className="group border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">{usd(Number(r.amount || 0))}</td>
                    <td className="px-4 py-3 text-sm text-slate-900">
                      <div className="font-semibold">{r.recipient_name}</div>
                      <div className="mt-0.5 text-xs text-slate-500">{r.recipient_uei}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{r.awarding_sub_agency_name}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{r.state}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {r.naics_code ? String(r.naics_code) : "—"}
                      <div className="mt-0.5 text-xs text-slate-500">{r.naics_description || ""}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{r.initial_report_date ? isoToShortDate(r.initial_report_date) : "—"}</td>
                    <td className="px-4 py-3 text-sm">
                      {r.usaspending_permalink ? (
                        <a
                          className="focus-ring inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-gov-blue transition hover:border-slate-300 hover:bg-slate-50"
                          href={r.usaspending_permalink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open
                        </a>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
