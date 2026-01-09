import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Card from "./Card";
import type { ContractRow } from "../lib/types";
import { compact } from "../lib/format";

function topN<T extends string>(rows: ContractRow[], key: (r: ContractRow) => T | undefined, n = 8) {
  const map = new Map<string, { name: string; value: number; amount: number }>();
  for (const r of rows) {
    const k = key(r) ?? "Unknown";
    const cur = map.get(k) ?? { name: k, value: 0, amount: 0 };
    cur.value += 1;
    cur.amount += Number(r.amount || 0);
    map.set(k, cur);
  }
  return Array.from(map.values())
    .sort((a, b) => b.amount - a.amount)
    .slice(0, n);
}

export default function ChartsPanel({
  rows,
  onAgencyClick,
}: {
  rows: ContractRow[];
  onAgencyClick: (agency: string) => void;
}) {
  const byAgency = useMemo(() => topN(rows, (r) => r.agency, 10), [rows]);
  const byNaics = useMemo(() => topN(rows, (r) => r.naics ?? "Unknown", 8), [rows]);

  const pieColors = ["#7f1d1d", "#1e3a8a", "#0ea5e9", "#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1"];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-5" hover={false}>
        <p className="text-sm font-semibold tracking-wide text-gov-blue">Top Agencies (by $)</p>
        <p className="mt-1 text-sm text-slate-600">Click a bar to filter results by agency.</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byAgency}>
              <XAxis dataKey="name" hide />
              <YAxis tickFormatter={(v) => compact(Number(v))} />
              <Tooltip formatter={(v: unknown) => compact(Number(v))} />
              <Bar
                dataKey="amount"
                onClick={(d: any) => onAgencyClick(String(d?.name ?? ""))}
                isAnimationActive
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
          {byAgency.slice(0, 6).map((a) => (
            <button
              key={a.name}
              className="focus-ring rounded-full border border-slate-200 bg-white px-3 py-1 transition hover:bg-slate-50"
              onClick={() => onAgencyClick(a.name)}
            >
              {a.name}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-5" hover={false}>
        <p className="text-sm font-semibold tracking-wide text-gov-blue">NAICS Mix (by count)</p>
        <p className="mt-1 text-sm text-slate-600">Hover slices for detail.</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byNaics} dataKey="value" nameKey="name" outerRadius={110} innerRadius={55}>
                {byNaics.map((_, i) => (
                  <Cell key={i} fill={pieColors[i % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-xs text-slate-600">
          Showing top {byNaics.length} NAICS by award count (from the returned search set).
        </div>
      </Card>
    </div>
  );
}
