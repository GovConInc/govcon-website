import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import StatCard from "../components/StatCard";
import FourCStepper from "../components/FourCStepper";
import PDCALoop from "../components/PDCALoop";
import ContractSearch from "../components/ContractSearch";
import RSSFeed from "../components/RSSFeed";
import Card from "../components/Card";
import { LinkButton } from "../components/Button";
import { BRAND, LINKS } from "../lib/constants";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>GovCon Inc. — Win Government Contracts</title>
        <meta
          name="description"
          content="GovCon Inc. helps businesses win government contracts through compliance, capture, and proposal execution."
        />
      </Helmet>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <div className="absolute inset-0 bg-grid opacity-70" />
            <div className="relative">
              <p className="text-sm font-semibold tracking-wide text-gov-blue">Government Contracting Consulting</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                {BRAND.tagline}.
                <span className="block text-gov-navy">Built like a machine, not a mood.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-600">
                We handle compliance and paperwork, build your pipeline, and ship proposals that hold up under evaluation.
                If you want to stop guessing and start winning, this is the operating system.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer">
                  Book a Readiness Call
                </LinkButton>
                <LinkButton variant="secondary" href="/services">
                  View Services
                </LinkButton>
              </div>

              <div className="mt-6 text-sm text-slate-700">
                <span className="font-semibold">Call:</span> {BRAND.phone} &nbsp;|&nbsp;{" "}
                <span className="font-semibold">Email:</span> {BRAND.email}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <StatCard label="Registrations & Profiles" value="7,000+" detail="SAM, DSBS, and related registrations executed end-to-end." />
            <StatCard label="Largest Win Supported" value="$640M" detail="Complex proposals across multiple industries and contract types." />
            <StatCard label="Focus" value="Repeatable Wins" detail="Compliance + pipeline + proposals — not random acts of contracting." />
          </div>
        </div>
      </section>

      <Section title="Search real contract data" kicker="Home / Contract Search">
        <ContractSearch />
      </Section>

      <Section title="The 4 C’s Framework" kicker="How we operate">
        <FourCStepper />
      </Section>

      <Section title="PDCA Process Improvement" kicker="Plan • Do • Check • Act">
        <PDCALoop />
      </Section>

      <Section title="Resources and updates" kicker="Stay current">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RSSFeed />
          </div>
          <Card className="p-6" hover={false}>
            <p className="text-sm font-semibold tracking-wide text-gov-blue">Quick links</p>
            <p className="mt-1 text-sm text-slate-600">Useful references, then we’ll do the rest if you want it done right.</p>
            <div className="mt-4 grid gap-2 text-sm">
              {[
                ["SAM.gov", "https://sam.gov"],
                ["SBA DSBS", "https://dsbs.sba.gov"],
                ["GSA eLibrary", "https://www.gsaelibrary.gsa.gov"],
                ["GSA Advantage", "https://www.gsaadvantage.gov"],
              ].map(([t, u]) => (
                <a key={u} href={u} target="_blank" rel="noreferrer" className="focus-ring rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:bg-slate-50">
                  <span className="font-semibold text-slate-900">{t}</span>
                  <span className="ml-2 text-xs text-slate-500">opens external</span>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Ready to stop winging it?" kicker="Next step">
        <Card className="p-8" hover={false}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-semibold text-slate-900">Book a 15–30 minute readiness call.</p>
              <p className="mt-2 text-slate-600">
                We’ll validate your path: compliance gaps, target agencies, opportunity fit, and what to do next.
              </p>
            </div>
            <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" className="sm:shrink-0">
              Book Now
            </LinkButton>
          </div>
        </Card>
      </Section>
    </>
  );
}
