import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import Card from "../components/Card";
import { Button } from "../components/Button";

// A representative list of state procurement sites
const STATES = {
  Northeast: [
    { name: "New York", url: "https://nyspro.ogs.ny.gov/" },
    { name: "Massachusetts", url: "https://www.commbuys.com/" },
    { name: "Pennsylvania", url: "http://www.emarketplace.state.pa.us/" },
    { name: "New Jersey", url: "https://www.njstart.gov/" },
    { name: "Connecticut", url: "https://portal.ct.gov/DAS/Procurement/Contracting" },
  ],
  Southeast: [
    { name: "Florida", url: "https://vendor.myfloridamarketplace.com/" },
    { name: "Georgia", url: "https://doas.ga.gov/state-purchasing" },
    { name: "Virginia", url: "https://eva.virginia.gov/" },
    { name: "North Carolina", url: "https://www.ips.state.nc.us/" },
    { name: "Alabama", url: "https://purchasing.alabama.gov/" },
  ],
  Midwest: [
    { name: "Illinois", url: "https://bidbuy.illinois.gov/" },
    { name: "Ohio", url: "https://procure.ohio.gov/" },
    { name: "Michigan", url: "https://sigma.michigan.gov/webapp/PRDVSS2X1/AltSelfService" },
    { name: "Indiana", url: "https://www.in.gov/idoa/procurement/" },
    { name: "Wisconsin", url: "https://vendornet.wi.gov/" },
  ],
  West: [
    { name: "California", url: "https://caleprocure.ca.gov/" },
    { name: "Texas", url: "http://www.txsmartbuy.com/esbd" },
    { name: "Washington", url: "https://pr-webs-vendor.des.wa.gov/" },
    { name: "Arizona", url: "https://app.az.gov/" },
    { name: "Colorado", url: "https://codpa-vss.cloud.cgifederal.com/webapp/PRDVSS2X1/AltSelfService" },
  ],
};

function BidCalculator() {
  const [score, setScore] = useState(0);
  
  const questions = [
    { q: "Do you know the customer?", w: 20 },
    { q: "Did you influence the requirements?", w: 20 },
    { q: "Do you have the exact past performance?", w: 20 },
    { q: "Is the timeline realistic for you?", w: 10 },
    { q: "Is the Incumbent vulnerable?", w: 15 },
    { q: "Do you have a teaming partner?", w: 15 },
  ];

  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const calculate = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i]) s += q.w;
    });
    setScore(s);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <span className="text-sm font-medium text-slate-700">{q.q}</span>
            <input 
              type="checkbox" 
              className="h-5 w-5 accent-gov-crimson"
              checked={!!answers[i]}
              onChange={(e) => {
                setAnswers(p => ({...p, [i]: e.target.checked}));
              }}
            />
          </div>
        ))}
      </div>
      <Button onClick={calculate} className="w-full">Calculate PWin</Button>
      {score > 0 && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-sm text-slate-600">Win Probability Score</p>
          <p className={`text-3xl font-bold ${score > 70 ? "text-green-600" : score > 40 ? "text-yellow-600" : "text-red-600"}`}>
            {score}%
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {score > 70 ? "Bid immediately." : score > 40 ? "Bid with caution." : "No Bid. Save your money."}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ResourceBidOpps() {
  return (
    <>
      <Helmet>
        <title>Find Bid Opportunities — GovCon Inc.</title>
      </Helmet>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold tracking-wide text-gov-blue">Resources</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Find Bid Opportunities</h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Finding the work is half the battle. Use these links to build your daily search routine.
              We recommend checking SAM.gov and your target state portals every morning.
            </p>
          </div>
        </div>
      </section>

      <Section title="Interactive Bid/No-Bid Tool" kicker="Decision Matrix">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6" hover={false}>
            <p className="text-slate-600 mb-4">
              Don't waste 40 hours writing a proposal you can't win. Use this simple calculator to grade your opportunities.
              If you score below 50%, focus your energy elsewhere.
            </p>
            <p className="text-xs text-slate-500">
              * This is a simplified version of the proprietary matrix we use for our Capture Management clients.
            </p>
          </Card>
          <Card className="p-6" hover={false}>
            <BidCalculator />
          </Card>
        </div>
      </Section>

      <Section title="State Bid Portals" kicker="50 State Access">
        <p className="text-slate-600 mb-6">
          Every state has its own version of SAM.gov. You usually need to register as a vendor (free) to see details.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(STATES).map(([region, states]) => (
            <div key={region} className="space-y-3">
              <h4 className="font-bold text-gov-navy border-b border-slate-200 pb-2">{region}</h4>
              <ul className="space-y-2 text-sm">
                {states.map(s => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-gov-blue hover:underline">
                      {s.name} Portal
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-slate-50 rounded-xl text-center text-sm text-slate-600">
          * Note: This is a curated list of major portals. Smaller states often use systems like "Buyspeed" or "Periscope".
        </div>
      </Section>

      <Section title="Setting up SAM.gov Searches" kicker="Automation">
        <Card className="p-6" hover={false}>
          <ol className="list-decimal pl-5 space-y-2 text-slate-700">
            <li>Log in to <strong>SAM.gov</strong> (you need an account to save searches).</li>
            <li>Go to "Search" and select domain "Contract Opportunities".</li>
            <li>Filter by <strong>NAICS</strong> (e.g., 541511), <strong>Place of Performance</strong>, and <strong>Set-Aside</strong> (e.g., Total Small Business).</li>
            <li>Click "Actions" {'>'} "Save Search".</li>
            <li>Name it and check "Notify me when new results appear".</li>
          </ol>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-600">
              <strong>Need a pipeline built for you?</strong> We configure automated search agents and deliver a weekly pipeline report to our clients.
            </p>
            <div className="mt-3">
               <Button className="bg-gov-navy text-white">Get a Pipeline Audit</Button>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}
