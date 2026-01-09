import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import { cn } from "./cn";

const STEPS = [
  {
    key: "concept",
    name: "Concept",
    headline: "Define the pursuit thesis.",
    body:
      "We map your market, agencies, NAICS, and positioning so you’re not “spraying and praying.”",
  },
  {
    key: "compliance",
    name: "Compliance",
    headline: "Get compliant and stay compliant.",
    body:
      "SAM.gov, DSBS, certifications, and registrations — built clean, verified, and maintained.",
  },
  {
    key: "consulting",
    name: "Consulting",
    headline: "Operate the win engine.",
    body:
      "Opportunity validation, win probability, capture plays, and proposal quality control (red team).",
  },
  {
    key: "continuity",
    name: "Continuity",
    headline: "Scale the machine.",
    body:
      "Turn wins/losses into process improvements, automation, and repeatable growth — prime-ready.",
  },
] as const;

export default function FourCStepper() {
  const [active, setActive] = useState<(typeof STEPS)[number]["key"]>("concept");
  const step = useMemo(() => STEPS.find((s) => s.key === active)!, [active]);

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <div className="grid gap-2">
          {STEPS.map((s, idx) => {
            const isActive = s.key === active;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={cn(
                  "focus-ring rounded-2xl border px-4 py-4 text-left transition",
                  isActive ? "border-gov-blue bg-slate-50" : "border-slate-200 bg-white hover:bg-slate-50"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-slate-500">
                      Step {idx + 1}
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">{s.name}</p>
                  </div>
                  <div className={cn("h-2.5 w-2.5 rounded-full", isActive ? "bg-gov-crimson" : "bg-slate-300")} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        key={step.key}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="lg:col-span-3"
      >
        <Card className="p-6">
          <p className="text-sm font-semibold tracking-wide text-gov-blue">The 4 C’s Framework</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{step.headline}</h3>
          <p className="mt-3 text-slate-600">{step.body}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold tracking-wide text-slate-500">Deliverable</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Actionable Next Steps</p>
              <p className="mt-2 text-sm text-slate-600">
                You leave each phase with clear outputs you can reuse — not “advice” you forget next week.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold tracking-wide text-slate-500">Control</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Quality Gates</p>
              <p className="mt-2 text-sm text-slate-600">
                We stop bad pursuits early, tighten compliance, and ship proposals that won’t embarrass you.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
