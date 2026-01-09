import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import Card from "../components/Card";
import ContactForm from "../components/forms/ContactForm";
import { BRAND, LINKS } from "../lib/constants";
import { LinkButton } from "../components/Button";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — GovCon Inc.</title>
      </Helmet>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold tracking-wide text-gov-blue">Contact</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Let’s talk.</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Send a message or book a readiness call. We’ll tell you what’s real, what’s noise, and what to do next.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer">Book a Readiness Call</LinkButton>
              <LinkButton href={`mailto:${BRAND.email}`} variant="secondary">Email Us</LinkButton>
            </div>
          </div>
        </div>
      </section>

      <Section title="Get in touch" kicker="Contact Us">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <Card className="p-6" hover={false}>
            <p className="text-sm font-semibold tracking-wide text-gov-blue">Direct</p>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <div><span className="font-semibold">Phone:</span> {BRAND.phone}</div>
              <div><span className="font-semibold">Email:</span> {BRAND.email}</div>
              <div><span className="font-semibold">Location:</span> {BRAND.location}</div>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Form collection roadmap</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
                <li>Contact form posts to <span className="font-mono text-xs">/api/contact</span>.</li>
                <li>Function stores the submission in Cloudflare KV (free tier) and/or forwards to a webhook.</li>
                <li>Optionally enable Cloudflare Turnstile (free) for spam protection.</li>
              </ol>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
