import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import Card from "../components/Card";
import FourCStepper from "../components/FourCStepper";
import PDCALoop from "../components/PDCALoop";
import { BRAND } from "../lib/constants";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — GovCon Inc.</title>
      </Helmet>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold tracking-wide text-gov-blue">About Us</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              A clear path to winning government business
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              GovCon Inc. exists because “federal systems” change constantly and businesses waste months learning
              by rework. We build a repeatable approach: strategy, compliance, execution, and continuous
              improvement.
            </p>
          </div>
        </div>
      </section>

      <Section title="Our story" kicker="Origin">
        <Card className="p-6" hover={false}>
          <p className="text-slate-600">
            We’re based in {BRAND.location} and support organizations from startups to large primes. The work
            spans registrations and profiles, market intelligence and capture, and proposal development across
            multiple industries.
          </p>
          <p className="mt-4 text-slate-600">
            The industry’s “boom moments” usually come from system transitions: new portals, new data
            structures, new rules — and usually not enough guidance. That’s where we grew: helping companies
            stay compliant, avoid preventable delays, and pursue the right work with a real strategy.
          </p>
          <p className="mt-4 text-slate-600">
            {BRAND.founder} has supported proposals across diverse scopes — including complex, high-value
            pursuits — and built this firm to turn hard-earned lessons into a cleaner path for clients.
          </p>
        </Card>
      </Section>

      <Section title="How we think" kicker="Methodology">
        <FourCStepper />
      </Section>

      <Section title="How we improve" kicker="PDCA">
        <PDCALoop />
      </Section>
    </>
  );
}
