import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import Card from "../components/Card";
import { Button } from "../components/Button";
import { Helmet } from "react-helmet-async";

interface ResourceLink {
  title: string;
  url: string;
  description: string;
  type: "government" | "guide" | "form" | "tool";
}

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const samResources: ResourceLink[] = [
  {
    title: "SAM.gov Main Portal",
    url: "https://sam.gov",
    description: "The official System for Award Management portal where all federal contracting registration begins.",
    type: "government",
  },
  {
    title: "SAM.gov Registration Guide",
    url: "https://www.sam.gov/content/dam/SAM/documents/SAM%20Registration%20Guide.pdf",
    description: "Official step-by-step guide for SAM registration from the federal government.",
    type: "guide",
  },
  {
    title: "CAGE Code Information",
    url: "https://www.sam.gov/content/pages/CAGE-CodeFAQs",
    description: "Understanding CAGE codes and how to register for one through SAM.",
    type: "guide",
  },
  {
    title: "Exclusions Database",
    url: "https://www.sam.gov/content/pages/Exclusions",
    description: "Search the exclusions list to ensure your company is not debarred.",
    type: "tool",
  },
];

const dsbsResources: ResourceLink[] = [
  {
    title: "Dynamic Small Business Search (DSBS)",
    url: "https://dsbs.sba.gov/search/dsp_dsbs.cfm",
    description: "Official SBA portal for small business certifications and registrations.",
    type: "government",
  },
  {
    title: "SBA Size Standards",
    url: "https://www.sba.gov/document/support--table-size-standards",
    description: "Check if you qualify as a small business for your specific NAICS codes.",
    type: "guide",
  },
  {
    title: "8(a) Business Development Program",
    url: "https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program",
    description: "SBA's premier program for small disadvantaged businesses.",
    type: "guide",
  },
  {
    title: "HUBZone Program",
    url: "https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program",
    description: "For businesses in Historically Underutilized Business Zones.",
    type: "guide",
  },
  {
    title: "SDVOSB Program",
    url: "https://www.sba.gov/federal-contracting/contracting-assistance-programs/service-disabled-veteran-owned-small-business-program",
    description: "Certification program for veteran-owned small businesses.",
    type: "guide",
  },
  {
    title: "WOSB Program",
    url: "https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-wosb-federal-contracting-program",
    description: "Federal contracting program for women-owned businesses.",
    type: "guide",
  },
];

const femaResources: ResourceLink[] = [
  {
    title: "FEMA Registration Portal",
    url: "https://event.dhs.gov/portal/default.aspx",
    description: "DHS event registration system for FEMA and other federal emergency management certifications.",
    type: "government",
  },
  {
    title: "Contracting with FEMA",
    url: "https://www.fema.gov/disaster/procurement",
    description: "Overview of FEMA contracting opportunities and vendor registration.",
    type: "guide",
  },
  {
    title: "Disaster Contracting Vendor Registration",
    url: "https://www.fema.gov/disaster/procurement/contracting-assistance",
    description: "Register as a disaster recovery contractor with FEMA.",
    type: "guide",
  },
];

function ResourceLinkCard({ resource }: { resource: ResourceLink }) {
  const typeColors = {
    government: "border-gov-navy",
    guide: "border-gov-red",
    form: "border-blue-600",
    tool: "border-slate-400",
  };
  const typeBgColors = {
    government: "bg-slate-50",
    guide: "bg-red-50",
    form: "bg-blue-50",
    tool: "bg-slate-50",
  };
  const typeLabels = {
    government: "Gov Portal",
    guide: "Guide",
    form: "Form",
    tool: "Tool",
  };
  return (
    <a href={resource.url} target="_blank" rel="noreferrer" className="group block">
      <Card className={`p-4 ${typeBgColors[resource.type]} hover:border-slate-300`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-slate-900 transition group-hover:text-gov-blue">
                {resource.title}
              </h4>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 transition group-hover:text-gov-blue" />
            </div>
            <p className="mt-1 text-sm text-slate-600">{resource.description}</p>
          </div>
          <span
            className={`inline-block flex-shrink-0 whitespace-nowrap rounded-full border-2 ${typeColors[resource.type]} px-2 py-0.5 text-xs font-semibold text-slate-700`}
          >
            {typeLabels[resource.type]}
          </span>
        </div>
      </Card>
    </a>
  );
}

function SAMSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900">System for Award Management (SAM)</h3>
        <p className="mt-2 text-slate-600">
          SAM.gov is the single government-wide system that consolidates federal contract management,
          grants, and other systems into one unified platform. If you're a government contractor, SAM
          registration is non-negotiable.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-gov-red/30 bg-white p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gov-red" />
            <div>
              <h4 className="font-semibold text-slate-900">Why SAM Registration Matters</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li>• It's how agencies find and vet contractors</li>
                <li>• Required to compete for federal contracts</li>
                <li>• Displays your business certifications and qualifications</li>
                <li>• Enables payment processing for government contracts</li>
                <li>• 100% free to register</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="border-gov-navy/30 bg-white p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gov-navy" />
            <div>
              <h4 className="font-semibold text-slate-900">Important Dates & Reminders</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li>• Renew SAM registration annually (expiration notices sent 60 days prior)</li>
                <li>• Update business information within 30 days of any changes</li>
                <li>• Processing typically takes 24-48 hours</li>
                <li>• Keep your DUNS number and UEI handy</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold text-slate-900">SAM Registration Step-by-Step</h4>
        <div className="space-y-3">
          {[
            {
              step: 1,
              title: "Get Your UEI/DUNS",
              details: "SAM now assigns a Unique Entity ID (UEI). You will get this during the registration process.",
            },
            {
              step: 2,
              title: "Create Your SAM.gov Account",
              details:
                'Go to sam.gov and click "Create Account." You\'ll use Login.gov. Set a strong password and enable 2FA.',
            },
            {
              step: 3,
              title: "Begin Entity Registration",
              details:
                'Select "Register" and choose your entity type (LLC, Corp, etc.). Enter your legal business name exactly as it appears on tax docs.',
            },
            {
              step: 4,
              title: "Complete Business Information",
              details: "Fill in your business address, Congressional district, and start date. Accuracy here is critical.",
            },
            {
              step: 5,
              title: "Add NAICS Codes",
              details:
                "Select your primary NAICS code and secondary codes. These define what your business does (e.g., 541611 for Consulting).",
            },
            {
              step: 6,
              title: "Certifications & Representations",
              details:
                "Attest to your business size and status (Small, Woman-Owned, Veteran-Owned, etc.). Don't guess—check SBA standards.",
            },
            {
              step: 7,
              title: "Point of Contact & Banking",
              details:
                "Designate your primary POCs and add banking info (Electronic Funds Transfer) so the government can pay you.",
            },
            {
              step: 8,
              title: "Submit & Authenticate",
              details: "Review everything. Submit. You will likely need to perform identity verification via Login.gov.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gov-navy text-sm font-semibold text-white">
                  {item.step}
                </div>
              </div>
              <div className="pt-1">
                <h5 className="font-semibold text-slate-900">{item.title}</h5>
                <p className="mt-1 text-sm text-slate-600">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="border-gov-red bg-red-50 p-6">
        <h4 className="flex items-center gap-2 font-semibold text-slate-900">
          <AlertCircle className="h-5 w-5 text-gov-red" />
          Common SAM Mistakes
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>
            ❌ <strong>Name Mismatch:</strong> "ABC Corp Inc" vs "ABC Corp" causes validation errors with the IRS.
          </li>
          <li>
            ❌ <strong>Wrong NAICS:</strong> Picking codes that are too broad or irrelevant hurts your visibility.
          </li>
          <li>
            ❌ <strong>Orphaned Accounts:</strong> Always have a secondary admin in case the primary employee leaves.
          </li>
        </ul>
      </Card>

      <div>
        <h4 className="mb-4 text-lg font-semibold text-slate-900">SAM Resources & Tools</h4>
        <div className="grid gap-3">
          {samResources.map((resource) => (
            <ResourceLinkCard key={resource.url} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DSBSSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900">Dynamic Small Business Search (DSBS)</h3>
        <p className="mt-2 text-slate-600">
          While SAM gets you "in the door," DSBS is the marketing catalog. Contracting officers use DSBS to find
          small businesses for set-aside contracts.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-gov-red/30 bg-white p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gov-red" />
            <div>
              <h4 className="font-semibold text-slate-900">Why DSBS Matters</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li>• Access to "set-asides" (23%+ of federal spend)</li>
                <li>• Competitive advantage in evaluations</li>
                <li>• Visibility to Prime Contractors looking for subs</li>
                <li>• Sole-source award eligibility (8a, SDVOSB, WOSB)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold text-slate-900">SBA Certification Guide</h4>
        <div className="space-y-3">
          {[
            {
              step: 1,
              title: "Verify Size Standard",
              details: "Check the SBA size standard for your primary NAICS. You must be under the revenue/employee cap.",
            },
            {
              step: 2,
              title: "Determine Eligibility",
              details:
                "Review requirements for 8(a), HUBZone, SDVOSB, and WOSB. Don't apply if you don't fit—audits are real.",
            },
            {
              step: 3,
              title: "Prepare Documents",
              details:
                "Gather tax returns, operating agreements, payroll, and proof of ownership (51%+).",
            },
            {
              step: 4,
              title: "Apply via certify.sba.gov",
              details: "Most certifications (WOSB, SDVOSB, 8a, HUBZone) now go through the SBA's unified certification portal.",
            },
            {
              step: 5,
              title: "Update SAM",
              details: "Once certified, ensure your SAM profile reflects your new status.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gov-navy text-sm font-semibold text-white">
                  {item.step}
                </div>
              </div>
              <div className="pt-1">
                <h5 className="font-semibold text-slate-900">{item.title}</h5>
                <p className="mt-1 text-sm text-slate-600">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold text-slate-900">SBA Resources</h4>
        <div className="grid gap-3">
          {dsbsResources.map((resource) => (
            <ResourceLinkCard key={resource.url} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FEMASection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900">FEMA & Disaster Contracting</h3>
        <p className="mt-2 text-slate-600">
          Disaster recovery moves fast. To win FEMA work (debris removal, emergency services, construction),
          you must be registered <em>before</em> the disaster strikes.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-gov-navy/30 bg-white p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gov-navy" />
            <div>
              <h4 className="font-semibold text-slate-900">FEMA Differences</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li>• Separate from SAM (though SAM is needed)</li>
                <li>• Requires DHS Event Registration</li>
                <li>• Geographic flexibility is key</li>
                <li>• Proof of insurance often required upfront</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold text-slate-900">FEMA Registration Steps</h4>
        <div className="space-y-3">
          {[
            {
              step: 1,
              title: "Active SAM Registration",
              details: "Ensure your SAM registration is active. FEMA uses this for payment.",
            },
            {
              step: 2,
              title: "DHS Event Registration",
              details: "Register your company at the DHS Vendor Portal (linked below).",
            },
            {
              step: 3,
              title: "Debris Contractor Registry",
              details: "If you do debris removal, register specifically for the Debris Removal Contractor Registry.",
            },
            {
              step: 4,
              title: "Monitor Opportunities",
              details: "During disasters, check SAM.gov and local notices. Speed of response is everything.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gov-navy text-sm font-semibold text-white">
                  {item.step}
                </div>
              </div>
              <div className="pt-1">
                <h5 className="font-semibold text-slate-900">{item.title}</h5>
                <p className="mt-1 text-sm text-slate-600">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold text-slate-900">FEMA Resources</h4>
        <div className="grid gap-3">
          {femaResources.map((resource) => (
            <ResourceLinkCard key={resource.url} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <Card className="border-2 border-gov-navy bg-slate-50 p-8" hover={false}>
      <div className="grid items-center gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Want this done right?</h3>
          <p className="mt-3 text-slate-600">
            Navigating SAM, DSBS, and FEMA registrations while running your business is a headache.
            One mistake can cost you a contract.
          </p>
          <p className="mt-2 text-slate-600">
            Our team handles the heavy lifting—ensuring your registrations are perfect, compliant, and optimized.
          </p>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border-2 border-gov-red bg-red-50 p-4">
            <p className="text-sm font-semibold text-slate-900">What We Do</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li>✓ Full SAM optimization & maintenance</li>
              <li>✓ SBA certification applications (8a, WOSB, VOSB)</li>
              <li>✓ Disaster contracting capability statements</li>
            </ul>
          </div>
          <a href="/contact" className="block">
            <Button className="w-full bg-gov-navy text-white hover:bg-gov-navy/90">
              Schedule a Consultation
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}

export default function ResourceSAMDBSFema() {
  const [expandedSection, setExpandedSection] = useState<string>("sam");
  const sections: Section[] = [
    { id: "sam", title: "SAM Registration", content: <SAMSection /> },
    { id: "dsbs", title: "DSBS & SBA Certifications", content: <DSBSSection /> },
    { id: "fema", title: "FEMA & Disaster Contracting", content: <FEMASection /> },
  ];

  return (
    <>
      <Helmet>
        <title>SAM, DSBS & FEMA Registration — GovCon Inc.</title>
      </Helmet>
      <div className="min-h-screen bg-white">
        <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">SAM, DSBS & FEMA Guide</h1>
              <p className="mt-4 text-lg text-slate-600">
                Your complete, free resource for federal contractor registration. Get registered, certified,
                and ready to win.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-3">
              {sections.map((section, idx) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? "" : section.id)}
                    className="w-full"
                  >
                    <Card
                      className={`p-6 transition ${
                        expandedSection === section.id
                          ? "border-gov-navy bg-slate-50"
                          : "border-slate-200 hover:border-gov-navy"
                      }`}
                      hover={expandedSection !== section.id}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="text-left text-xl font-bold text-slate-900">{section.title}</h2>
                        {expandedSection === section.id ? (
                          <ChevronUp className="h-5 w-5 flex-shrink-0 text-gov-navy" />
                        ) : (
                          <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400" />
                        )}
                      </div>
                    </Card>
                  </button>
                  {expandedSection === section.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">{section.content}</div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CTA />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
