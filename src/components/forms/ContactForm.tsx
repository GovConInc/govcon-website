import { useState } from "react";
import { submitContact } from "../../lib/api";
import Card from "../Card";
import { Button } from "../Button";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setOk(null);
    try {
      const r = await submitContact({ name, company, email, phone, message });
      setOk(r.id ? `Submitted. Ref: ${r.id}` : "Submitted.");
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (e: any) {
      setErr(e?.message ?? "Submit failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6" hover={false}>
      <p className="text-sm font-semibold tracking-wide text-gov-blue">Send a message</p>
      <p className="mt-1 text-sm text-slate-600">This posts to a Cloudflare Pages Function (no paid form service needed).</p>

      <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="focus-ring rounded-xl border border-slate-200 px-4 py-2 text-sm"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="focus-ring rounded-xl border border-slate-200 px-4 py-2 text-sm"
            placeholder="Company (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="focus-ring rounded-xl border border-slate-200 px-4 py-2 text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <input
            className="focus-ring rounded-xl border border-slate-200 px-4 py-2 text-sm"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <textarea
          className="focus-ring min-h-[120px] rounded-xl border border-slate-200 px-4 py-2 text-sm"
          placeholder="Tell us what you’re trying to win, and what’s blocking you."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button disabled={loading}>{loading ? "Sending…" : "Submit"}</Button>
          {ok ? <span className="text-sm font-semibold text-green-700">{ok}</span> : null}
          {err ? <span className="text-sm font-semibold text-red-700">{err}</span> : null}
        </div>
      </form>
    </Card>
  );
}
