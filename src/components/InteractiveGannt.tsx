{
type: "file_create",
fileName: "src/components/InteractiveGantt.tsx",
fileContent: `import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "./cn";

const tasks = [
  { id: 1, name: "Kickoff Consultation", duration: 2, start: 1, type: "Advisor", risk: "Low" },
  { id: 2, name: "Document Preparation", duration: 6, start: 3, type: "Processing", risk: "High" },
  { id: 3, name: "eOffer Preparation", duration: 5, start: 8, type: "Processing", risk: "Medium" },
  { id: 4, name: "GSA 'Holy Trinity' Review", duration: 2, start: 14, type: "Advisor", risk: "High" },
  { id: 5, name: "Price & Technical Review", duration: 5, start: 16, type: "Advisor", risk: "High" },
  { id: 6, name: "Final Review & Sign-off", duration: 3, start: 21, type: "Advisor", risk: "Medium" },
  { id: 7, name: "GSA Submission", duration: 1, start: 25, type: "Advisor", risk: "Low" },
];

export default function InteractiveGantt() {
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">GSA MAS Submission Timeline</h3>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-gov-blue"></div> Advisor</span>
          <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-slate-400"></div> Processing</span>
        </div>
      </div>
      
      <div className="relative min-w-[600px]">
        {/* Days Header */}
        <div className="flex border-b border-slate-100 pb-2">
          <div className="w-1/3 shrink-0 font-semibold text-slate-500 text-xs uppercase tracking-wider">Task Phase</div>
          <div className="flex w-2/3">
             {Array.from({ length: 30 }).map((_, i) => (
               <div key={i} className="flex-1 text-center text-[10px] text-slate-300">
                 {i % 5 === 0 ? \`Day \${i}\` : ""}
               </div>
             ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-3 pt-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-center group relative"
              onMouseEnter={() => setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              <div className="w-1/3 shrink-0 pr-4">
                <div className="text-sm font-semibold text-slate-700">{task.name}</div>
                <div className="text-xs text-slate-500">{task.duration} Days • {task.risk} Risk</div>
              </div>
              <div className="relative flex w-2/3 h-8 bg-slate-50 rounded-lg">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: \`\${(task.duration / 30) * 100}%\` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={cn(
                    "absolute h-6 top-1 rounded-md shadow-sm border border-white/20",
                    task.type === "Advisor" ? "bg-gov-blue" : "bg-slate-400"
                  )}
                  style={{ left: \`\${(task.start / 30) * 100}%\` }}
                >
                  {hoveredTask === task.id && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white shadow-xl z-10">
                      {task.type} Team
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`
}
