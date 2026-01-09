import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import Card from "../components/Card";
import { LinkButton } from "../components/Button";

export default function ResourceGSA() {
  return (
    <>
      <Helmet>
        <title>GSA Contract Vehicles — GovCon Inc.</title>
      </Helmet>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold tracking-wide text-gov-blue">Resources</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">GSA Contract Vehicles</h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              The GSA Multiple Award Schedule (MAS) is the premier vehicle for selling to the federal government. 
              It allows agencies to buy from you without a full public bid. Here is how it works.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <LinkButton href="https://www.gsaelibrary.gsa.gov/" target="_blank" variant="secondary">GSA eLibrary</LinkButton>
              <LinkButton href="https://www.gsaadvantage.gov/" target="_blank" variant="secondary">GSA Advantage</LinkButton>
              <LinkButton href="https://www.gsa.gov/buy-through-us/purchasing-programs/gsa-multiple-award-schedule/gsa-schedule-offerings/mas-roadmap" target="_blank" variant="secondary">GSA MAS Roadmap</LinkButton>
            </div>
          </div>
        </div>
      </section>

      <Section title="What is the GSA Schedule?" kicker="Overview">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6" hover={false}>
            <h3 className="text-lg font-semibold text-slate-900">The "License to Hunt"</h3>
            <p className="mt-2 text-sm text-slate-600">
              A GSA Schedule contract is a long-term agreement (up to 20 years) with the General Services Administration.
              It pre-negotiates your pricing, terms, and conditions.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              <strong>Why get one?</strong> Agencies can buy from you directly via GSA Advantage or eBuy, bypassing
              lengthy public solicitations. It is often required for IT, consulting, and industrial sales.
            </p>
          </Card>
          <Card className="p-6" hover={false}>
            <h3 className="text-lg font-semibold text-slate-900">Key Qualifications</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>• <strong>2 Years in Business:</strong> Generally required (Startup Springboard offers exceptions).</li>
              <li>• <strong>Financial Stability:</strong> No bankruptcy, positive cash flow.</li>
              <li>• <strong>Past Performance:</strong> Must show relevant project experience.</li>
              <li>• <strong>TAA Compliance:</strong> Products must be made in the US or TAA-compliant countries.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section title="Understanding the Basics" kicker="Education">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "SINs (Special Item Numbers)",
              d: "These are categories that define what you sell (e.g., 54151S for IT Services). You must pick the right SINs to be found."
            },
            {
              t: "GSA Advantage",
              d: "The Amazon of government. If you sell products, your catalog lives here. Agencies click to buy."
            },
            {
              t: "GSA eBuy",
              d: "An exclusive job board for GSA holders. Agencies post RFQs here that the public never sees."
            }
          ].map(x => (
            <Card key={x.t} className="p-6" hover={false}>
              <h4 className="font-semibold text-slate-900">{x.t}</h4>
              <p className="mt-2 text-sm text-slate-600">{x.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Common Challenges" kicker="Reality Check">
        <Card className="p-6 bg-red-50 border-gov-red" hover={false}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-slate-900">Getting the Contract</h4>
              <ul className="mt-2 list-disc pl-4 text-sm text-slate-700 space-y-1">
                <li>Rejection due to vague project experience.</li>
                <li>Pricing not supported by commercial invoices.</li>
                <li>6-12 month review timelines if submitted poorly.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Managing the Contract</h4>
              <ul className="mt-2 list-disc pl-4 text-sm text-slate-700 space-y-1">
                <li>Failing to meet the $25k/year sales minimum.</li>
                <li>Forgetting to pay the Industrial Funding Fee (IFF).</li>
                <li>Not updating the catalog (modifications).</li>
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="We handle the headache" kicker="Our Services">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <h4 className="font-semibold text-slate-900">GSA MAS Submission</h4>
            <p className="mt-2 text-sm text-slate-600">
              We build the entire offer package: technical narratives, price support, and admin docs. 
              We negotiate with the Contracting Officer to get you awarded.
            </p>
            <div className="mt-4">
              <LinkButton href="/services/gsa-mas-submission" variant="secondary">View Service</LinkButton>
            </div>
          </Card>
          <Card className="p-6">
            <h4 className="font-semibold text-slate-900">Contract Management</h4>
            <p className="mt-2 text-sm text-slate-600">
              Already have a schedule? We handle mods, IFF reporting, SIP/FCP uploads, and compliance 
              so you don't get cancelled.
            </p>
            <div className="mt-4">
              <LinkButton href="/services/contract-management" variant="secondary">View Service</LinkButton>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
