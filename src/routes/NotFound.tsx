import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <Helmet>
        <title>Not Found — GovCon Inc.</title>
      </Helmet>
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft">
        <p className="text-sm font-semibold tracking-wide text-gov-blue">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">
          The route exists in the menu plan, but the page content hasn’t been built out yet (or the link is wrong).
        </p>
        <Link
          to="/"
          className="focus-ring mt-6 inline-flex rounded-xl bg-gov-crimson px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
