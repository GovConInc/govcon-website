import { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import Card from "./Card";
import type { PieSlice, TimelinePoint } from "../lib/types";
import { compact } from "../lib/format";

const pieColors = ["#7f1d1d", "#1e3a8a", "#0ea5e9", "#0f172a", "#475569", "#94a3b8"];

function qLabel(p: TimelinePoint) {
  return `${p.year} Q${p.quarter}`;
}

export default function SpendingCharts({ pie, timeline }: { pie: PieSlice[]; timeline: TimelinePoint[] }) {
  const lineData = useMemo(
    () => (timeline ?? []).map((p) => ({ ...p, label: qLabel(p) })),
    [timeline]
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-5" hover={false}>
        <p className="text-sm font-semibold tracking-wide text-gov-blue">Small Business Type Mix (by spend)</p>
        <p className="mt-1 text-sm text-slate-600">Mutually-exclusive classification (8(a) → HUBZone → SDB → VOSB → WOSB → other).</p>
        <div className="mt-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pie} dataKey="value" nameKey="label" innerRadius={60} outerRadius={110} paddingAngle={3}>
                {(pie ?? []).map((_, i) => (
                  <Cell key={i} fill={pieColors[i % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: unknown) => compact(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5" hover={false}>
        <p className="text-sm font-semibold tracking-wide text-gov-blue">Quarterly Spending (by report date)</p>
        <p className="mt-1 text-sm text-slate-600">Total vs Small Business spend by quarter.</p>
        <div className="mt-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => compact(Number(v))} />
              <Tooltip formatter={(v: unknown) => compact(Number(v))} />
              <Legend />
              <Line type="monotone" dataKey="total_spend" name="Total Spend" stroke="#1e3a8a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="small_spend" name="Small Biz Spend" stroke="#7f1d1d" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
