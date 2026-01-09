import { useEffect, useState } from "react";
import Card from "./Card";
import { fetchRss } from "../lib/api";
import type { RSSItem } from "../lib/types";

export default function RSSFeed() {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetchRss();
        setItems(r.items ?? []);
      } catch (e: any) {
        setErr(e?.message ?? "RSS failed.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card className="p-6" hover={false}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wide text-gov-blue">GovCon Feed</p>
          <p className="mt-1 text-sm text-slate-600">Pulled server-side (avoids browser CORS headaches).</p>
        </div>
        <span className="text-xs text-slate-500">{loading ? "Loading…" : `${items.length} items`}</span>
      </div>

      {err ? (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">{err}</div>
      ) : null}

      <div className="mt-4 grid gap-3">
        {items.slice(0, 6).map((x) => (
          <a
            key={x.link}
            href={x.link}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <p className="text-sm font-semibold text-slate-900">{x.title}</p>
            <p className="mt-1 text-xs text-slate-500">{x.pubDate ?? ""}</p>
          </a>
        ))}
      </div>
    </Card>
  );
}
