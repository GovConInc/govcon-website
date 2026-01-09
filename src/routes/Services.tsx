import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Shield, Target, PenTool, Database, Users, AlertTriangle, ArrowRight } from "lucide-react";
import Section from "../components/Section";
import Card from "../components/Card";
import { Button, LinkButton } from "../components/Button";
import InteractiveGantt from "../components/InteractiveGantt";
import FourCStepper from "../components/FourCStepper";
import ServicePackages from "../components/ServicePackages";
import { cn } from "../components/cn";

export default function Services({ initialTab = "all" }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState<"gsa" | "professional">("gsa");

  return (
    <>
      <Helmet>
        <title>Services — GovCon Inc.</title>
      </Helmet>

      {/* Hero */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Contracting Services that <span className="text-gov-blue">Win</span>.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            We don't just file paperwork. We build government contracting departments.
            From initial registration to GSA Schedule negotiation, our roadmap is designed for one thing: revenue.
          </p>
        </div>
      </section>

      {/* The 4 C's Process */}
      <section className="bg-white px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
           <div className="mb-8 text-center">
             <h2 className="text-2xl font-bold text-slate-900">The 4 C's Methodology</h2>
             <p className="text-slate-600">Our proprietary framework for government contracting success.</p>
           </div>
           <FourCStepper />
        </div>
      </section>

      {/* Packages */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Choose Your Roadmap</h2>
            <p className="text-slate-600">Comprehensive packages designed for every stage of growth.</p>
          </div>
          <ServicePackages />
        </div>
      </section>

      {/* Main Service Content */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => setActiveTab("gsa")}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
                  activeTab === "gsa" 
                    ? "bg-white text-gov-blue shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <Database size={16} />
                GSA Services
              </button>
              <button
                onClick={() => setActiveTab("professional")}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
                  activeTab === "professional" 
                    ? "bg-white text-gov-blue shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <Users size={16} />
                Professional Services
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "gsa" ? (
              <motion.div
                key="gsa"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                {/* GSA MAS Submission */}
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div>
                    <span className="text-gov-blue font-bold tracking-wide text-sm uppercase">The Holy Grail</span>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900">GSA MAS Submission</h2>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      Getting on the GSA Schedule is a rigorous 12-month process for most. We do it in 4-6 months.
                      Our "Holy Trinity" review process ensures your technical, pricing, and administrative volumes are
                      rejection-proof before they ever hit a Contracting Officer's desk.
                    </p>
                    <ul className="mt-6 space-y-3">
                      <li className="flex gap-3 text-slate-700">
                        <CheckCircle2 className="text-gov-green h-5 w-5 shrink-0" />
                        <span>Rejection-Proof "Holy Trinity" Review</span>
                      </li>
                      <li className="flex gap-3 text-slate-700">
                        <CheckCircle2 className="text-gov-green h-5 w-5 shrink-0" />
                        <span>Negotiation Strategy & Coaching</span>
                      </li>
                      <li className="flex gap-3 text-slate-700">
                        <CheckCircle2 className="text-gov-green h-5 w-5 shrink-0" />
                        <span>eOffer Preparation & SIP/FCP Upload</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <InteractiveGantt />
                  </div>
                </div>

                {/* FCP Baseline - Highlighted */}
                <div className="relative overflow-hidden rounded-2xl bg-gov-navy px-6 py-10 shadow-xl sm:px-12 sm:py-16">
                  <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gov-crimson text-white">
                      <AlertTriangle size={24} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">SIP is Dead. FCP is Here.</h2>
                    <p className="mt-4 text-lg text-slate-300">
                      The GSA has retired the Schedule Input Program (SIP) for a new web-based FAS Catalog Platform (FCP).
                      <strong> If you do not complete your FCP Baseline, your catalog will be removed from GSA Advantage.</strong>
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                      <Button variant="primary" className="bg-white text-gov-navy hover:bg-slate-100">
                        Secure My FCP Baseline
                      </Button>
                      <LinkButton href="https://catalog.gsa.gov" target="_blank" variant="secondary" className="bg-transparent text-white border-white hover:bg-white/10">
                        Visit Catalog Portal
                      </LinkButton>
                    </div>
                    <p className="mt-6 text-sm text-slate-400">
                      We guarantee a successful FCP upload within 7 days, including training on the new system.
                    </p>
                  </div>
                </div>

                {/* Mods & Oasis */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="p-8">
                    <div className="mb-4 h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <PenTool size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Mods & Management</h3>
                    <p className="mt-3 text-slate-600">
                      We manage GSA vehicles for over 80 customers. With the recent FCP changes, mass mods, and 
                      sales reporting requirements, compliance is a full-time job.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      <li>• Mass Modifications (Refresh Updates)</li>
                      <li>• Economic Price Adjustments (EPA)</li>
                      <li>• Add/Delete Products & SINs</li>
                      <li>• Quarterly Sales Reporting (IFF)</li>
                    </ul>
                  </Card>
                  
                  <Card className="p-8">
                     <div className="mb-4 h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                      <Target size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">OASIS+ & Other Vehicles</h3>
                    <p className="mt-3 text-slate-600">
                      Don't put all your eggs in the GSA MAS basket. We help you on-ramp to other Best-in-Class (BIC) vehicles.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      <li>• <strong>OASIS+:</strong> The new standard for services.</li>
                      <li>• <strong>NASA SEWP VI:</strong> The $20B+ IT vehicle.</li>
                      <li>• <strong>HCATS:</strong> Human Capital & Training.</li>
                    </ul>
                  </Card>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="professional"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {/* Registration Management */}
                <div className="flex flex-col md:flex-row gap-8 items-center">
                   <div className="flex-1">
                     <div className="h-12 w-12 rounded-xl bg-gov-crimson text-white flex items-center justify-center mb-4">
                       <Shield size={24} />
                     </div>
                     <h2 className="text-3xl font-bold text-slate-900">Registration Management</h2>
                     <p className="mt-4 text-lg text-slate-600">
                       You pay us, we handle the paperwork. It's that simple.
                     </p>
                     <p className="mt-4 text-slate-600">
                       Registration Management is key to identifying all applicable registrations for your business
                       (Federal, State, Local). We start locally and expand as you grow. If your address changes 
                       or a certification expires, we fix it before you even know it's an issue.
                     </p>
                   </div>
                   <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                     <h4 className="font-semibold text-slate-900 mb-4">What We Manage</h4>
                     <div className="grid grid-cols-2 gap-4">
                       {["SAM.gov", "SBA DSBS", "FEMA Portal", "State Vendor Portals", "WOSB/VOSB Certs", "8(a) Annual Review"].map(item => (
                         <div key={item} className="flex items-center gap-2 text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                           <div className="h-2 w-2 rounded-full bg-green-500"></div>
                           {item}
                         </div>
                       ))}
                     </div>
                   </div>
                </div>

                <div className="w-full h-px bg-slate-200 my-8"></div>

                {/* Capture Management */}
                <div className="grid gap-12 lg:grid-cols-2">
                   <div>
                     <h2 className="text-3xl font-bold text-slate-900">Capture Management</h2>
                     <div className="mt-4 inline-block bg-blue-50 text-gov-blue px-3 py-1 rounded-full text-sm font-semibold">
                       People &gt; Process &gt; Technology
                     </div>
                     <p className="mt-6 text-slate-600 leading-relaxed">
                       This isn't just another AI bid alert. We don't just look at a synopsis and forward it.
                       We review the Scope of Work (SOW), analyze the incumbent, and hand-pick bids you can actually win.
                     </p>
                     <p className="mt-4 text-slate-600">
                       Capture goes beyond what's posted today. We find the 5-year agreement expiring in 4 months
                       or the subcontracting opportunity with General Dynamics. We find the POCs, we mingle, 
                       and we act as your business development arm.
                     </p>
                   </div>
                   <div className="bg-gov-navy text-white p-8 rounded-2xl relative overflow-hidden">
                     <div className="relative z-10">
                       <h3 className="text-xl font-bold">The Difference</h3>
                       <div className="mt-6 space-y-6">
                         <div>
                           <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">Competitors</div>
                           <p className="text-slate-300">"Here are 50 bids that match the keyword 'Cleaning'."</p>
                         </div>
                         <div>
                           <div className="text-sm text-gov-crimson uppercase tracking-wider font-bold">GovCon Inc.</div>
                           <p className="text-white font-medium">
                             "Here are 3 bids. We called the Contracting Officer on Bid #2, and they are unhappy with the incumbent. 
                             Bid #1 is a set-aside you qualify for. Ignore Bid #3, it's wired for someone else."
                           </p>
                         </div>
                       </div>
                     </div>
                   </div>
                </div>

                <div className="w-full h-px bg-slate-200 my-8"></div>

                {/* Proposal Writing */}
                <div className="text-center max-w-3xl mx-auto">
                  <div className="mx-auto h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
                     <FileText size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Proposal Writing</h2>
                  <p className="mt-4 text-slate-600">
                    We offer full-service proposal writing following the Shipley method. From compliance matrices 
                    to "Pink Team" storyboards and "Red Team" reviews, we turn your technical expertise into 
                    a compliant, winning narrative.
                  </p>
                  <div className="mt-8">
                    <LinkButton href="/resources/writing-proposals" variant="secondary">
                      View Our Writing Methodology <ArrowRight size={16} className="ml-2" />
                    </LinkButton>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
