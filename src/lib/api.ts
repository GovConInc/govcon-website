import type { SpendingDashboardResponse, RSSResponse } from "./types";

export type SpendSearchParams = {
  q?: string;
  naics?: string | number;
  state?: string;
  limit?: number;
};

export async function searchSpending(params: SpendSearchParams): Promise<SpendingDashboardResponse> {
  const url = new URL("/api/contracts", window.location.origin);

  if (params.q) url.searchParams.set("q", String(params.q));
  if (params.naics !== undefined && params.naics !== null && String(params.naics).trim()) {
    url.searchParams.set("naics", String(params.naics));
  }
  if (params.state) url.searchParams.set("state", String(params.state));
  if (params.limit) url.searchParams.set("limit", String(params.limit));

  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = payload?.error ? String(payload.error) : `Spending search failed (${res.status})`;
    throw new Error(msg);
  }
  return payload as SpendingDashboardResponse;
}

export async function fetchRss(urlOverride?: string): Promise<RSSResponse> {
  const url = new URL("/api/rss", window.location.origin);
  if (urlOverride) url.searchParams.set("url", urlOverride);
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`RSS fetch failed (${res.status})`);
  return res.json();
}
