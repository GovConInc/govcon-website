import { useMemo, useState } from "react";
import Card from "./Card";
import { cn } from "./cn";

export type GanttTask = {
  id: string;
  label: string;
  startWeek: number;
  durationWeeks: number;
  detail: string;
};

export default function Gantt({
  title,
  weeks,
  tasks,
}: {
  title: string;
  weeks: number;
  tasks: GanttTask[];
}) {
  const cols = useMemo(() => Array.from({ length: weeks }, (_, i) => i + 1), [weeks]);
  const [active, setActive] = useState<string | null>(null);

  const a = active ? tasks.find((t) => t.id === active) : null;

  return (
    <Card className="p-6" hover={false}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-wide text-gov-blue">Interactive Timeline</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
        </div>
        <p className="text-sm text-slate-500">Click a bar to drill into details.</p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <div className="min-w-[740px]">
          <div className="grid" style={{ gridTemplateColumns: `220px repeat(${weeks}, minmax(24px, 1fr))` }}>
            <div className="px-3 py-2 text-xs font-semibold tracking-wide text-slate-500">Workstream</div>
            {cols.map((w) => (
              <div key={w} className="px-2 py-2 text-center text-xs font-semibold text-slate-500">
                W{w}
              </div>
            ))}

            {tasks.map((t) => {
              const is = t.id === active;
              return (
                <>
                  <div key={`${t.id}-lbl`} className="border-t border-slate-100 px-3 py-2 text-sm font-semibold text-slate-900">
                    {t.label}
                  </div>
                  <div key={`${t.id}-bar`} className="border-t border-slate-100" style={{ gridColumn: `2 / span ${weeks}` }}>
                    <div className="relative h-10">
                      <button
                        onClick={() => setActive(is ? null : t.id)}
                        className={cn(
                          "focus-ring absolute top-2 h-6 rounded-xl transition",
                          is ? "bg-gov-crimson/90" : "bg-gov-blue/85 hover:brightness-110"
                        )}
                        style={{
                          left: `${((t.startWeek - 1) / weeks) * 100}%`,
                          width: `${(t.durationWeeks / weeks) * 100}%`,
                        }}
                        aria-label={`Open details for ${t.label}`}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        {a ? (
          <>
            <p className="text-xs font-semibold tracking-wide text-slate-500">Selected</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{a.label}</p>
            <p className="mt-2 text-sm text-slate-600">{a.detail}</p>
          </>
        ) : (
          <p className="text-sm text-slate-600">Select a bar above to view details.</p>
        )}
      </div>
    </Card>
  );
}
