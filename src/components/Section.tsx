import type { ReactNode } from "react";

export default function Section({
  title,
  kicker,
  children,
  id,
  actions,
}: {
  title: string;
  kicker?: string;
  id?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {kicker ? (
              <p className="text-sm font-semibold tracking-wide text-gov-blue">{kicker}</p>
            ) : null}
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h2>
          </div>
          {actions ? <div className="mt-2 sm:mt-0">{actions}</div> : null}
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
