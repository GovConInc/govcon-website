import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import Card from "../components/Card";
import { LinkButton } from "../components/Button";

const SECTIONS = [
  { id: "sam", title: "SAM Registration, DSBS & FEMA", body: "DIY basics and what matters for eligibility.", items: [["SAM.gov","Entity registration and renewals."],["DSBS","SBA profile for buyers/primes."],["FEMA","Disaster vendor pathways."]] },
  { id: "gsa", title: "GSA Contract Vehicles", body: "MAS SINs, pricing, compliance, mods, and baseline uploads.", items: [["eLibrary","Contract/SIN lookup."],["Advantage","Catalog surface."],["Maintenance","Mods, reporting, baselines."]] },
  { id: "opps", title: "Understand Opportunities", body: "RFI/RFP/Sources Sought and bid/no-bid decision gates.", items: [["Types","RFI/RFP/SS."],["Contracting","FFP, T&M, IDIQ."],["Decision","Win probability gating."]] },
  { id: "bids", title: "Find Bid Opportunities", body: "SAM searches and pipeline tracking that doesn’t suck.", items: [["Saved searches","Filters and alerts."],["State portals","State/local paths."],["Trackers","Process + cadence."]] },
  { id: "proposals", title: "Writing Proposals", body: "Color teams and reusable content assets.", items: [["Shipley","Blue/Red/Gold."],["Assets","PPQs, resumes, case studies."],["Templates","Compliance-first structure."]] },
] as const;

export default function Resources({ initialSection }: { initialSection?: string }) {
  const first = SECTIONS.find((s) => s.id === initialSection) ?? SECTIONS[0];

  return (
    <>
      <Helmet>
        <title>Resources — GovCon Inc.</title>
      </Helmet>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold tracking-wide text-gov-blue">Resources</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Practical guidance</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Enough to get you unstuck. If you want it executed and maintained, that’s our lane.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="focus-ring rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section title={first.title} kicker="Featured">
        <Card className="p-6" hover={false}>
          <p className="text-slate-600">{first.body}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {first.items.map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300">
                <p className="text-sm font-semibold text-slate-900">{t}</p>
                <p className="mt-1 text-sm text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {SECTIONS.map((s) => (
        <Section key={s.id} id={s.id} title={s.title} kicker="Guide">
          <Card className="p-6" hover={false}>
            <p className="text-slate-600">{s.body}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {s.items.map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300">
                  <p className="text-sm font-semibold text-slate-900">{t}</p>
                  <p className="mt-1 text-sm text-slate-600">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">Want this done right and maintained? We’ll handle it.</p>
              <LinkButton href="/contact" variant="secondary">Contact Us</LinkButton>
            </div>
          </Card>
        </Section>
      ))}
    </>
  );
}
