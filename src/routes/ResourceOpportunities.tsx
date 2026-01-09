import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import Card from "../components/Card";
import { LinkButton } from "../components/Button";

export default function ResourceOpportunities() {
  return (
    <>
      <Helmet>
        <title>Understand Opportunities — GovCon Inc.</title>
      </Helmet>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold tracking-wide text-gov-blue">Resources</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Understand Opportunities</h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Not all government postings are the same. Understanding the difference between a "Sources Sought" 
              and an "RFP" is the difference between wasting time and winning work.
            </p>
            <div className="mt-6">
              <LinkButton href="https://sam.gov/content/opportunities" target="_blank">Search SAM.gov</LinkButton>
            </div>
          </div>
        </div>
      </section>

      <Section title="Notice Types" kicker="Vocabulary">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Sources Sought",
              desc: "Market research. The government asks: 'Does anyone do this?' Responding here helps shape the future RFP."
            },
            {
              title: "RFI (Request for Info)",
              desc: "Similar to Sources Sought but more technical. They want to know HOW you would solve the problem."
            },
            {
              title: "RFP / RFQ",
              desc: "The real deal. Request for Proposal/Quote. This is a solicitation you bid on to win money."
            },
            {
              title: "Award Notice",
              desc: "The announcement of who won. Useful for competitive intelligence and subcontracting."
            }
          ].map(x => (
            <Card key={x.title} className="p-6" hover={false}>
              <h4 className="font-semibold text-slate-900">{x.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{x.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Contract Types" kicker="Risk & Payment">
        <div className="space-y-4">
          <Card className="p-6" hover={false}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-slate-900">Firm Fixed Price (FFP)</h4>
                <p className="mt-2 text-sm text-slate-600">
                  You agree to do the job for $X. If you go over budget, you eat the cost. If you are efficient, you keep the profit. 
                  Most common for products and simple services.
                </p>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-slate-900">Time & Materials (T&M)</h4>
                <p className="mt-2 text-sm text-slate-600">
                  You bill for hours worked + materials cost. Lower risk for you, but the government watches hours closely. 
                  Requires an accounting system that tracks hours per project.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6" hover={false}>
             <h4 className="text-lg font-semibold text-slate-900">IDIQ (Indefinite Delivery, Indefinite Quantity)</h4>
             <p className="mt-2 text-sm text-slate-600">
               An "umbrella" contract. Winning an IDIQ doesn't guarantee money; it gives you the right to bid on "Task Orders" 
               against a smaller pool of holders. GSA MAS is a type of IDIQ.
             </p>
          </Card>
        </div>
      </Section>

      <Section title="Pipeline Strategy" kicker="How to win">
        <Card className="p-6 bg-slate-50 border-gov-navy" hover={false}>
          <h4 className="font-semibold text-slate-900">Don't bid on everything.</h4>
          <p className="mt-2 text-sm text-slate-600">
            The biggest mistake is the "shotgun approach." You should have a strict "Gate Review" process.
            If you don't talk to the customer before the RFP comes out, your chance of winning is less than 10%.
          </p>
          <div className="mt-4">
            <LinkButton href="/contact" variant="primary">Build a Capture Strategy</LinkButton>
          </div>
        </Card>
      </Section>
    </>
  );
}
