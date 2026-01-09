{
type: "file_update",
fileName: "src/components/Navbar.tsx",
fileContent: `import { useMemo, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LinkButton } from "./Button";
import { BRAND, LINKS } from "../lib/constants";
import { cn } from "./cn";
import { Menu, X, ChevronDown } from "lucide-react";

type NavItem = { label: string; to: string; children?: NavItem[] };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setResourceOpen(false);
  }, [location]);

  const primary: NavItem[] = useMemo(
    () => [
      { label: "Home", to: "/" },
      { 
        label: "Resources", 
        to: "/resources",
        children: [
          { label: "SAM, DSBS & FEMA", to: "/resources/sam-dsbs-fema" },
          { label: "GSA Contract Vehicles", to: "/resources/gsa-vehicles" },
          { label: "Understand Opportunities", to: "/resources/understand-opportunities" },
          { label: "Find Bid Opportunities", to: "/resources/find-bid-opportunities" },
          { label: "Writing Proposals", to: "/resources/writing-proposals" },
        ]
      },
      { label: "Services", to: "/services" },
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gov-navy font-black text-white">
            G
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">{BRAND.name}</div>
            <div className="text-xs text-slate-500">{BRAND.tagline}</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {primary.map((x) => {
            if (x.children) {
              return (
                <div key={x.label} className="group relative">
                  <button
                    className={cn(
                      "flex items-center gap-1 text-sm font-semibold transition hover:text-gov-blue",
                      location.pathname.startsWith("/resources") ? "text-gov-crimson" : "text-slate-700"
                    )}
                  >
                    {x.label}
                    <ChevronDown size={14} />
                  </button>
                  <div className="invisible absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="mt-2 rounded-xl border border-slate-200 bg-white p-2 shadow-lg ring-1 ring-slate-200">
                      {x.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) =>
                            cn(
                              "block rounded-lg px-4 py-2 text-sm font-semibold transition hover:bg-slate-50",
                              isActive ? "text-gov-crimson bg-slate-50" : "text-slate-700"
                            )
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
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
            );
          })}
        </nav>

        <div className="hidden md:block">
          <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" variant="secondary">
            Book a Readiness Call
          </LinkButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="focus-ring rounded-xl border border-slate-200 p-2 md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
            <div className="grid gap-2">
              {primary.map((x) => {
                 if (x.children) {
                   return (
                     <div key={x.label} className="rounded-xl border border-slate-200 bg-white">
                       <button
                         onClick={() => setResourceOpen(!resourceOpen)}
                         className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700"
                       >
                         {x.label}
                         <ChevronDown size={16} className={cn("transition", resourceOpen ? "rotate-180" : "")} />
                       </button>
                       {resourceOpen ? (
                         <div className="border-t border-slate-100 bg-slate-50 px-4 py-2">
                           {x.children.map(child => (
                             <NavLink
                               key={child.to}
                               to={child.to}
                               className={({ isActive }) =>
                                 cn(
                                   "block py-2 text-sm font-medium transition",
                                   isActive ? "text-gov-crimson" : "text-slate-600 hover:text-gov-blue"
                                 )
                               }
                             >
                               {child.label}
                             </NavLink>
                           ))}
                         </div>
                       ) : null}
                     </div>
                   );
                 }
                 return (
                  <NavLink
                    key={x.to}
                    to={x.to}
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
                );
              })}
              <LinkButton href={LINKS.booking} target="_blank" rel="noreferrer" className="mt-2">
                Book a Readiness Call
              </LinkButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}`
}
