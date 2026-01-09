import type { ReactNode } from "react";
import { cn } from "./cn";

export default function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-soft",
        hover ? "transition hover:-translate-y-0.5 hover:border-slate-300" : "",
        className
      )}
    >
      {children}
    </div>
  );
}
