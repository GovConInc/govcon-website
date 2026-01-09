import React from "react";
import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import Card from "../components/Card";
import Gantt, { type GanttTask } from "../components/Gantt";
import { LinkButton } from "../components/Button";
import { cn } from "../components/cn";

type TabKey =
  | "overview"
  | "gsa-mas"
  | "contract-management"
  | "oasis"
  | "fcp"
  | "registration"
  | "capture"
  | "proposal"
  | "process"
  | "kickoff"
  | "prime"
  | "vip";

const TAB_LABELS: Record<TabKey, string> = {
  overview: "Overview",
  "gsa-mas": "GSA MAS Submission",
  "contract-management": "Contract Management",
  oasis: "Oasis+ & Other Vehicles",
  fcp: "FCP Baseline Upload",
  registration: "Registration Management",
  capture: "Capture Management",
  proposal: "Proposal Writing",
  process: "Process Improvement",
  kickoff: "Kickoff Program",
  prime: "Prime Program",
  vip: "VIP Program",
};

function Tabs({ active, onChange }: { active: TabKey; onChange: (k: TabKey) => void }) {
  const keys = Object.keys(TAB_LABELS) as TabKey[];
  return (
    <div className="flex flex-wrap gap-2">
      {keys.map((k) => {
        const is = k === active;
        return (
          <button
            key={k}
            onClick={() => onChange(k)}
            className={cn(
              "focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition",
              is ? "border-gov-blue bg-slate-50 text-gov-crimson" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            )}
          >
            {TAB_LABELS[k]}
          </button>
        );
      })}
    </div>
  );
}

export default function Services({ initialTab }: { initialTab?: string }) {
  const [tab, setTab] = React.useState<TabKey>((initialTab as TabKey) ?? "overview");

  const masTasks: GanttTask[] = [
    { id: "kick", label: "Kickoff + Data Intake", startWeek: 1, durationWeeks: 1, detail: "Collect docs, confirm SIN strategy, build compliance checklist." },
    { id: "narr", label: "Narratives + Templates", startWeek: 1, durationWeeks: 2, detail: "Capability narrative, past performance packaging, and template cleanup." },
    { id: "price", label: "Pricing + EPA Logic", startWeek: 2, durationWeeks: 2, detail: "Market alignment, price support, EPA path, and assumptions locked." },
    { id: "upload", label: "Submission + Tracking", startWeek: 4, durationWeeks: 1, detail: "Submit, respond to clarifications, and keep the process moving." },
    { id: "award", label: "Award Prep + Launch", startWeek: 5, durationWeeks: 2, detail: "eBuy training, sales reporting readiness, catalog/listing readiness." },
  ];

  const fcpTasks: GanttTask[] = [
    { id: "prep", label: "Data Cleanup", startWeek: 1, durationWeeks: 1, detail: "Catalog fields validated, conversions reviewed, exceptions documented." },
    { id: "build", label: "Baseline Build", startWeek: 1, durationWeeks: 1, detail: "Baseline constructed with correct structures and validation checks." },
    { id: "upload", label: "FCP Upload", startWeek: 2, durationWeeks: 1, detail: "Upload + issue resolution. Target: successful upload within 7 days." },
  ];

  return (
    <>
      <Helmet>
        <title>Services — GovCon Inc.</title>
      </Helmet>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold tracking-wide text-gov-blue">Services</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">From paperwork to proposals — packaged as programs</h1>
            <p className="mt-3 max-w-2xl text-slate-600">We don’t sell “advice.” We sell execution and measurable outcomes.</p>
            <div className="mt-6"><Tabs active={tab} onChange={setTab} /></div>
          </div>
        </div>
      </section>

      {tab === "overview" ? (
        <Section title="Service map" kicker="Start here">
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              ["GSA Vehicles", "MAS submissions, management, and baseline uploads."],
              ["Professional Services", "Registration, capture, proposals, and process improvement."],
              ["Programs", "Kickoff, Prime, and VIP engagement models."],
            ].map(([t, d]) => (
              <Card key={t} className="p-6" hover={false}>
                <p className="text-lg font-semibold text-slate-900">{t}</p>
                <p className="mt-2 text-slate-600">{d}</p>
                <div className="mt-5">
                  <button
                    className="focus-ring rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-50"
                    onClick={() => setTab(t === "GSA Vehicles" ? "gsa-mas" : t === "Professional Services" ? "capture" : "kickoff")}
                  >
                    Drill in
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      {tab === "gsa-mas" ? (
        <Section title="GSA MAS Submission" kicker="GSA">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-6" hover={false}>
              <p className="text-sm font-semibold tracking-wide text-gov-blue">What you get</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>SIN strategy + readiness validation.</li>
                <li>Templates, narratives, and price support built clean.</li>
                <li>Submission tracking + responses to clarifications.</li>
                <li>Launch prep: eBuy, eMod, sales reporting readiness.</li>
              </ul>
              <div className="mt-6"><LinkButton href="/contact" variant="secondary">Talk to us</LinkButton></div>
            </Card>
            <Gantt title="Typical submission timeline (example)" weeks={6} tasks={masTasks} />
          </div>
        </Section>
      ) : null}

      {tab === "fcp" ? (
        <Section title="FCP Baseline Upload" kicker="Catalog.gsa.gov">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-6" hover={false}>
              <p className="text-sm font-semibold tracking-wide text-gov-blue">Fast, compliant upload</p>
              <p className="mt-3 text-sm text-slate-600">Successful baseline upload, quickly — without corrupt conversions or missing fields.</p>
              <div className="mt-6"><LinkButton href="/contact">Get it done</LinkButton></div>
            </Card>
            <Gantt title="7-day baseline program (example)" weeks={3} tasks={fcpTasks} />
          </div>
        </Section>
      ) : null}

      {(tab === "contract-management" || tab === "oasis" || tab === "registration" || tab === "capture" || tab === "proposal" || tab === "process" || tab === "kickoff" || tab === "prime" || tab === "vip") ? (
        <Section title={TAB_LABELS[tab]} kicker="Details">
          <Card className="p-6" hover={false}>
            <p className="text-slate-600">This section is scaffolded. Next step: we’ll build this page to your exact deliverables and pricing.</p>
          </Card>
        </Section>
      ) : null}
    </>
  );
}
