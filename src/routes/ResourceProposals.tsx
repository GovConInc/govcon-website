import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import Card from "../components/Card";
import { Button, LinkButton } from "../components/Button";

const COPY_TEXT = `PAST PERFORMANCE QUESTIONNAIRE (PPQ)

1. Contract Information
- Contract Number:
- Period of Performance:
- Contract Value:
- Project Title:

2. Customer Point of Contact
- Name:
- Title:
- Email:
- Phone:

3. Performance Rating (1-5 Scale)
[ ] Quality of Service
[ ] Schedule Adherence
[ ] Cost Control
[ ] Management Responsiveness
[ ] Regulatory Compliance

4. Narrative
Please briefly describe the scope of work performed and the contractor's ability to solve complex problems during execution.

[Signature Block]`;

export default function ResourceProposals() {
  return (
    <>
      <Helmet>
        <title>Writing Proposals — GovCon Inc.</title>
      </Helmet>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold tracking-wide text-gov-blue">Resources</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Writing Proposals</h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Winning proposals aren't just well-written; they are compliant and structured. 
              We follow industry-standard methodologies like Shipley to ensure every bid is a contender.
            </p>
          </div>
        </div>
      </section>

      <Section title="The Color Team Method" kicker="Process">
        <p className="text-slate-600 mb-6">
          The Shipley method uses "Color Teams" to review the proposal at specific milestones.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4 border-l-4 border-blue-600" hover={false}>
            <h4 className="font-bold text-slate-900">Blue Team</h4>
            <p className="text-xs text-slate-500 mt-1">Strategy & Outline</p>
            <p className="mt-2 text-sm text-slate-700">
              Occurs before writing starts. Reviews the outline, win themes, and solution strategy.
            </p>
          </Card>
          <Card className="p-4 border-l-4 border-pink-400" hover={false}>
            <h4 className="font-bold text-slate-900">Pink Team</h4>
            <p className="text-xs text-slate-500 mt-1">Storyboards & Mockups</p>
            <p className="mt-2 text-sm text-slate-700">
              60% draft. Validates that the writers are on track and the story makes sense.
            </p>
          </Card>
          <Card className="p-4 border-l-4 border-red-600" hover={false}>
            <h4 className="font-bold text-slate-900">Red Team</h4>
            <p className="text-xs text-slate-500 mt-1">Evaluation Simulation</p>
            <p className="mt-2 text-sm text-slate-700">
              90% draft. Reviewed by someone who hasn't read it yet. Scored exactly like the government would.
            </p>
          </Card>
          <Card className="p-4 border-l-4 border-green-600" hover={false}>
            <h4 className="font-bold text-slate-900">Green Team</h4>
            <p className="text-xs text-slate-500 mt-1">Pricing</p>
            <p className="mt-2 text-sm text-slate-700">
              Reviews the price volume to ensure profitability and competitiveness.
            </p>
          </Card>
          <Card className="p-4 border-l-4 border-yellow-500" hover={false}>
            <h4 className="font-bold text-slate-900">Gold Team</h4>
            <p className="text-xs text-slate-500 mt-1">Final Polish</p>
            <p className="mt-2 text-sm text-slate-700">
              100% complete. "White Glove" check for typos, formatting, and file errors before print/upload.
            </p>
          </Card>
          <Card className="p-4 border-l-4 border-slate-400" hover={false}>
            <h4 className="font-bold text-slate-900">White Glove</h4>
            <p className="text-xs text-slate-500 mt-1">Production</p>
            <p className="mt-2 text-sm text-slate-700">
              The physical or digital packing of the files. Ensuring no metadata errors or missing pages.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Past Performance Questionnaire" kicker="Template">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-slate-600 text-sm mb-4">
              Many RFPs require you to have clients fill out a PPQ. Even if they don't, you should have these on file.
              Copy this text into a Word doc and send it to your top 3 clients.
            </p>
            <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-700">
              <pre className="whitespace-pre-wrap">{COPY_TEXT}</pre>
              <Button 
                onClick={() => navigator.clipboard.writeText(COPY_TEXT)}
                className="absolute top-2 right-2 bg-white text-gov-navy border border-slate-200 text-xs py-1 px-3 h-auto"
              >
                Copy
              </Button>
            </div>
          </div>
          <Card className="p-6 bg-gov-navy text-white" hover={false}>
            <h3 className="text-xl font-bold">Need a Red Team Review?</h3>
            <p className="mt-3 text-slate-300">
              You can't proofread your own work. Our team provides independent Red Team reviews to score your proposal 
              before you submit. We find the compliance gaps that disqualify you.
            </p>
            <div className="mt-6">
              <LinkButton href="/contact" className="bg-white text-gov-navy hover:bg-slate-100">Book a Review</LinkButton>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
