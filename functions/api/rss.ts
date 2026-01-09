import type { Env } from "./_types";
import { json } from "./utils";

function decodeCdata(s: string) {
  return s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function extractItems(xml: string) {
  const items: Array<{ title: string; link: string; pubDate?: string }> = [];

  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const titleRegex = /<title>([\s\S]*?)<\/title>/i;
  const linkRegex = /<link>([\s\S]*?)<\/link>/i;
  const dateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/i;

  const matches = xml.match(itemRegex) ?? [];
  for (const raw of matches.slice(0, 12)) {
    const t = raw.match(titleRegex)?.[1]?.trim() ?? "";
    const l = raw.match(linkRegex)?.[1]?.trim() ?? "";
    if (!t || !l) continue;
    const d = raw.match(dateRegex)?.[1]?.trim();
    items.push({ title: decodeCdata(t), link: decodeCdata(l), pubDate: d ? decodeCdata(d) : undefined });
  }
  return items;
}

export async function onRequestGet({ request, env }: { request: Request; env: Env }) {
  const url = new URL(request.url);
  const rssUrl = (url.searchParams.get("url") ?? env.RSS_URL ?? "").trim();

  if (!rssUrl) return json({ url: "", items: [] });

  const res = await fetch(rssUrl, { headers: { "User-Agent": "GovConInc-RSS/1.0" } });
  if (!res.ok) return json({ url: rssUrl, items: [], error: `Fetch failed (${res.status})` }, { status: 200 });

  const xml = await res.text();
  const items = extractItems(xml);
  return json({ url: rssUrl, items });
}
