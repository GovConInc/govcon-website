import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { LinkButton } from "./Button";
import { BRAND, LINKS } from "../lib/constants";
import { cn } from "./cn";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; to: string };

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const primary: NavItem[] = useMemo(
    () => [
      { label: "Home / Contract Search", to: "/" },
      { label: "Resources", to: "/resources" },
      { label: "Services", to: "/services" },
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
    ],
    []
  );

  const resources: NavItem[] = [
    { label: "SAM Registration, DSBS & FEMA", to: "/resources/sam-dsbs-fema" },
    { label: "GSA Contract Vehicles", to: "/resources/gsa-vehicles" },
    { label: "Understand Opportunities", to: "/resources/understand-opportunities" },
    { label: "Find Bid Opportunities", to: "/resources/find-bid-opportunities" },
    { label: "Writing Proposals", to: "/resources/writing-proposals" },
  ];

  const services: NavItem[] = [
    { label: "GSA MAS Submission", to: "/services/gsa-mas-submission" },
    { label: "Contract Management", to: "/services/contract-management" },
    { label: "Oasis+ & Other Vehicles", to: "/services/oasis-and-others" },
    { label: "FCP Baseline Upload", to: "/services/fcp-baseline-upload" },
    { label: "Registration Management", to: "/services/registration-management" },
    { label: "Capture Management", to: "/services/capture-management" },
    { label: "Proposal Writing", to: "/services/proposal-writing" },
    { label: "Process Improvement", to: "/services/process-improvement" },
  ];

  const programs: NavItem[] = [
    { label: "Kickoff", to: "/programs/kickoff" },
    { label: "Prime", to: "/programs/prime" },
    { label: "VIP", to: "/programs/vip" },
  ];

  const allMobile = [...primary, ...resources, ...services, ...programs];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gov-navy text-white flex items-center justify-center font-black">
            G
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">{BRAND.name}</div>
            <div className="text-xs text-slate-500">{BRAND.tagline}</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {primary.map((x) => (
            <NavLink
              key={x.to}
              to={x.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-semibold transition hover:text-gov-blue",
                  isActive ? "text-gov-crimson" : "text-slate-700"
                )
              }
              end={x.to === "/"}
            >
              {x.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary">
            Book a Readiness Call
          </LinkButton>
        </div>

        <button
          className="focus-ring md:hidden rounded-xl border border-slate-200 p-2"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
            <div className="grid gap-2">
              {allMobile.map((x) => (
                <NavLink
                  key={x.to}
                  to={x.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                      isActive ? "border-gov-blue bg-slate-50 text-gov-crimson" : "border-slate-200 bg-white hover:bg-slate-50"
                    )
                  }
                  end={x.to === "/"}
                >
                  {x.label}
                </NavLink>
              ))}
              <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" className="mt-2">
                Book a Readiness Call
              </LinkButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
