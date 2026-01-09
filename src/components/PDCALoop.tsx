import { useState } from "react";
import Card from "./Card";
import { cn } from "./cn";

const NODES = [
  { k: "plan", label: "Plan", desc: "Define strategy, scope, and success criteria. Build the blueprint." },
  { k: "do", label: "Do", desc: "Execute the work with tight process control and documentation." },
  { k: "check", label: "Check", desc: "Review metrics, quality, and outcomes. Diagnose root causes." },
  { k: "act", label: "Act", desc: "Standardize what worked and fix what didn’t. Scale the wins." },
] as const;

export default function PDCALoop() {
  const [active, setActive] = useState<(typeof NODES)[number]["k"]>("plan");
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="p-6 lg:col-span-3" hover={false}>
        <p className="text-sm font-semibold tracking-wide text-gov-blue">PDCA Operating Rhythm</p>
        <p className="mt-2 text-slate-600">
          Not “consulting theater.” This is a simple loop that keeps your registrations clean, your pipeline
          focused, and your proposal output improving month over month.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {NODES.map((n) => {
            const is = n.k === active;
            return (
              <button
                key={n.k}
                onClick={() => setActive(n.k)}
                className={cn(
                  "focus-ring rounded-2xl border px-4 py-4 text-left transition",
                  is ? "border-gov-crimson bg-slate-50" : "border-slate-200 bg-white hover:bg-slate-50"
                )}
              >
                <p className="text-xs font-semibold tracking-wide text-slate-500">Phase</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{n.label}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold tracking-wide text-slate-500">What happens here</p>
          <p className="mt-2 text-base font-semibold text-slate-900">
            {NODES.find((n) => n.k === active)!.label}
          </p>
          <p className="mt-2 text-sm text-slate-600">{NODES.find((n) => n.k === active)!.desc}</p>
        </div>
      </Card>

      <Card className="p-6 lg:col-span-2" hover={false}>
        <p className="text-sm font-semibold tracking-wide text-gov-blue">“The Loop”</p>
        <p className="mt-2 text-sm text-slate-600">
          Research → Diagnose → Improve → Repeat. Hover and click around the site — almost everything has a detail layer.
        </p>

        <div className="mt-6 space-y-3">
          {[
            { t: "Research", d: "Market signals, agency trends, spend, and opportunity patterns." },
            { t: "Diagnose", d: "Root issues with your SME + outside perspective, without rocking the boat." },
            { t: "Improve", d: "Leverage metrics to reduce costs, tighten compliance, and increase output." },
            { t: "Results", d: "Clear outcomes that justify retention — because the work speaks for itself." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300">
              <p className="text-sm font-semibold text-slate-900">{x.t}</p>
              <p className="mt-1 text-sm text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
