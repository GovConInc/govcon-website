import type { Env } from "./_types";
import { json } from "./utils";

async function verifyTurnstile(secret: string, token: string, ip?: string) {
  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (ip) form.set("remoteip", ip);

  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });

  if (!r.ok) return false;
  const out = (await r.json()) as any;
  return Boolean(out.success);
}

export async function onRequestPost({ request, env, context }: { request: Request; env: Env; context: ExecutionContext }) {
  const ip = request.headers.get("CF-Connecting-IP") ?? undefined;

  let body: any = null;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const company = String(body?.company ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const turnstileToken = String(body?.turnstileToken ?? "").trim();

  if (!name || !email || !message) {
    return json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  if (env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) return json({ ok: false, error: "Turnstile required." }, { status: 400 });
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, turnstileToken, ip);
    if (!ok) return json({ ok: false, error: "Turnstile verification failed." }, { status: 400 });
  }

  const id = `${Date.now()}-${crypto.randomUUID()}`;
  const record = {
    id,
    ts: new Date().toISOString(),
    name,
    email,
    phone: phone || undefined,
    company: company || undefined,
    message,
    ip: ip || undefined,
    ua: request.headers.get("User-Agent") ?? undefined,
  };

  if (env.LEADS) {
    context.waitUntil(env.LEADS.put(id, JSON.stringify(record), { expirationTtl: 60 * 60 * 24 * 365 }));
  }

  if (env.CONTACT_FORWARD_WEBHOOK) {
    context.waitUntil(
      fetch(env.CONTACT_FORWARD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).catch(() => undefined)
    );
  }

  return json({ ok: true, id });
}
