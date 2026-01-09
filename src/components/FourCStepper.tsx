import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./cn";
import { ShieldCheck, Target, Link2, Briefcase } from "lucide-react";

// The 4 C's Data derived from your internal spreadsheets
const steps = [
  {
    id: "compliance",
    label: "Compliance",
    icon: ShieldCheck,
    color: "bg-emerald-600",
    description: "The Foundation. We ensure you are legal, registered, and set aside-ready.",
    tasks: [
      { name: "Kickoff Consultation", type: "Strategy" },
      { name: "SAM.gov Registration", type: "Processing" },
      { name: "DSBS & FEMA Profiles", type: "Processing" },
      { name: "SBA Certification Check", type: "Strategy" }
    ]
  },
  {
    id: "capture",
    label: "Capture",
    icon: Target,
    color: "bg-gov-blue",
    description: "The Hunt. Identifying the right opportunities before they hit the street.",
    tasks: [
      { name: "Capability Statement Design", type: "Marketing" },
      { name: "Pipeline Construction", type: "Strategy" },
      { name: "Competitor Analysis", type: "Data" },
      { name: "Agency Forecasting", type: "Strategy" }
    ]
  },
  {
    id: "connect",
    label: "Connect",
    icon: Link2,
    color: "bg-indigo-600",
    description: "The Pitch. Putting your solution in front of the decision makers.",
    tasks: [
      { name: "Proposal Development", type: "Writing" },
      { name: "Past Performance Formatting", type: "Writing" },
      { name: "Marketing Outreach", type: "Marketing" },
      { name: "Contracting Officer Intros", type: "Sales" }
    ]
  },
  {
    id: "consulting",
    label: "Consulting",
    icon: Briefcase,
    color: "bg-gov-crimson",
    description: "The Growth. Scaling your operations and managing complex vehicles.",
    tasks: [
      { name: "GSA Schedule Management", type: "Admin" },
      { name: "Project Liftoff Support", type: "Ops" },
      { name: "Quarterly Reviews", type: "Strategy" },
      { name: "Compliance Audits", type: "Legal" }
    ]
  }
];

export default function FourCStepper() {
  const [activeStep, setActiveStep] = useState("compliance");

  const activeData = steps.find(s => s.id === activeStep);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-soft overflow-hidden">
      {/* Step Navigation */}
      <div className="flex border-b border-slate-200 divide-x divide-slate-200 overflow-x-auto scrollbar-hide">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-4 px-4 min-w-[140px] transition-all duration-300 relative",
                isActive ? "bg-slate-50 text-slate-900" : "bg-white text-slate-500 hover:text-slate-700"
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                isActive ? step.color + " text-white" : "bg-slate-100 text-slate-400"
              )}>
                <step.icon size={16} />
              </div>
              <span className="font-bold text-sm">{step.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className={cn("absolute bottom-0 left-0 w-full h-1", step.color)}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Left: Description */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{activeData?.label}</h3>
              <p className="text-lg text-slate-600 mb-6">{activeData?.description}</p>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                <span className={cn("h-2 w-2 rounded-full", activeData?.color)}></span>
                Phase Priority: High
              </div>
            </div>

            {/* Right: Tasks List */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                Core Deliverables
              </h4>
              <div className="space-y-3">
                {activeData?.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <span className="font-medium text-slate-800 text-sm">{task.name}</span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-500">
                      {task.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
