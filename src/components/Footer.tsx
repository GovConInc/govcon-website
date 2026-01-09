import { Link } from "react-router-dom";
import { BRAND, LINKS } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gov-navy text-white flex items-center justify-center font-black">
                G
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{BRAND.name}</div>
                <div className="text-xs text-slate-500">{BRAND.location}</div>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-sm text-slate-600">
              We help companies win government business through compliance, capture, proposal execution,
              and contract vehicle management — built into a repeatable operating system.
            </p>

            <div className="mt-5 text-sm text-slate-700">
              <div>
                <span className="font-semibold">Phone:</span> {BRAND.phone}
              </div>
              <div className="mt-1">
                <span className="font-semibold">Email:</span> {BRAND.email}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Company</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <Link className="hover:text-gov-blue" to="/about">About</Link>
              <Link className="hover:text-gov-blue" to="/services">Services</Link>
              <Link className="hover:text-gov-blue" to="/resources">Resources</Link>
              <a className="hover:text-gov-blue" href={LINKS.booking} target="_blank" rel="noreferrer">Book a Call</a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Legal</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <a className="hover:text-gov-blue" href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
              <a className="hover:text-gov-blue" href="#" onClick={(e) => e.preventDefault()}>Terms</a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          <div>Built for Cloudflare Pages (free) with serverless APIs for search + forms.</div>
        </div>
      </div>
    </footer>
  );
}
