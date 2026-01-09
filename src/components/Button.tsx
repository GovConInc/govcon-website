import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "./cn";

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const Button = forwardRef<HTMLButtonElement, BtnProps>(function Button(
  { className, variant = "primary", ...props },
  ref
) {
  const base =
    "focus-ring inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition " +
    "disabled:opacity-60 disabled:cursor-not-allowed";
  const styles: Record<string, string> = {
    primary:
      "bg-gov-crimson text-white shadow-soft hover:brightness-110 active:brightness-95",
    secondary:
      "bg-white text-gov-navy border border-slate-200 shadow-soft hover:border-slate-300 active:bg-slate-50",
    ghost:
      "bg-transparent text-gov-navy hover:bg-slate-50 active:bg-slate-100",
  };
  return <button ref={ref} className={cn(base, styles[variant], className)} {...props} />;
});

type LinkBtnProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function LinkButton({ className, variant = "primary", ...props }: LinkBtnProps) {
  const base =
    "focus-ring inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition";
  const styles: Record<string, string> = {
    primary:
      "bg-gov-crimson text-white shadow-soft hover:brightness-110 active:brightness-95",
    secondary:
      "bg-white text-gov-navy border border-slate-200 shadow-soft hover:border-slate-300 active:bg-slate-50",
    ghost:
      "bg-transparent text-gov-navy hover:bg-slate-50 active:bg-slate-100",
  };
  return <a className={cn(base, styles[variant], className)} {...props} />;
}
