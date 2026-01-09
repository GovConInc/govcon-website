import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "./cn";
import { AlertCircle } from "lucide-react";

const tasks = [
  { id: 1, name: "Kickoff Consultation", days: "Days 1-2", start: 0, width: 6, type: "Advisor", risk: "Low", desc: "Strategy alignment & scheduling." },
  { id: 2, name: "Document Prep", days: "Days 3-8", start: 6, width: 18, type: "Processing", risk: "High", desc: "Gathering tax docs, financials, and project history." },
  { id: 3, name: "eOffer Preparation", days: "Days 9-13", start: 24, width: 15, type: "Processing", risk: "Medium", desc: "Building the digital offer package." },
  { id: 4, name: "Holy Trinity Review", days: "Days 14-15", start: 39, width: 6, type: "Advisor", risk: "High", desc: "Critical review of Admin, Technical, and Pricing volumes." },
  { id: 5, name: "Price & Tech Review", days: "Days 16-20", start: 45, width: 15, type: "Advisor", risk: "High", desc: "Ensuring profitability and technical compliance." },
  { id: 6, name: "Final Polish", days: "Days 23-28", start: 66, width: 18, type: "Advisor", risk: "Medium", desc: "White glove check for errors." },
  { id: 7, name: "GSA Submission", days: "Day 33", start: 90, width: 10, type: "Advisor", risk: "Low", desc: "Official submission to the Contracting Officer." },
];

export default function InteractiveGantt() {
  const [activeTask, setActiveTask] = useState<number | null>(null);

  return (
    <div className="w-full select-none">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">MAS Submission Roadmap</h3>
          <p className="text-sm text-slate-500">Typical 30-45 Day Timeline</p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gov-blue"></span>
            Advisor (Strategy)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            Processing (Admin)
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        {/* Timeline Bar Background */}
        <div className="absolute top-8 left-0 h-1.5 w-full rounded-full bg-slate-100"></div>

        {/* Tasks */}
        <div className="relative grid grid-cols-10 gap-0.5 h-32">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="relative flex flex-col items-center justify-end pb-2 group"
              style={{ gridColumn: `span ${Math.ceil(task.width / 10)}` }} // Approximate scaling
              onMouseEnter={() => setActiveTask(task.id)}
              onMouseLeave={() => setActiveTask(null)}
            >
              {/* Timeline Node */}
              <motion.div
                className={cn(
                  "absolute top-7 z-10 h-4 w-4 rounded-full border-2 bg-white transition-colors duration-300",
                  activeTask === task.id 
                    ? task.type === "Advisor" ? "border-gov-blue bg-gov-blue scale-125" : "border-emerald-500 bg-emerald-500 scale-125"
                    : task.type === "Advisor" ? "border-gov-blue" : "border-emerald-500"
                )}
                layoutId={`node-${task.id}`}
              />

              {/* Label */}
              <div className={cn(
                "absolute -top-6 w-32 text-center text-[10px] font-bold uppercase tracking-wider transition-colors",
                activeTask === task.id ? "text-slate-900" : "text-slate-400"
              )}>
                {task.days}
              </div>

              {/* Card (Visible on Hover) */}
              <div 
                 className={cn(
                   "absolute top-14 w-48 rounded-lg border bg-white p-3 shadow-xl transition-all duration-300 z-20 pointer-events-none",
                   activeTask === task.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
                   task.type === "Advisor" ? "border-gov-blue/20" : "border-emerald-500/20"
                 )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    "text-xs font-bold px-1.5 py-0.5 rounded",
                    task.type === "Advisor" ? "bg-blue-50 text-gov-blue" : "bg-emerald-50 text-emerald-600"
                  )}>
                    {task.type}
                  </span>
                  {task.risk === "High" && <AlertCircle className="h-3 w-3 text-red-500" />}
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{task.name}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{task.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
