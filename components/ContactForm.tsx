"use client";
import { useRef, useState } from "react";
import { CheckCircleIcon } from "./icons";

const BUDGETS = ["Not sure yet", "Under INR 50,000 per month", "INR 50,000 to 2,00,000 per month", "Above INR 2,00,000 per month", "One-off project"];
type Errors = Record<string, string>;

export function ContactForm() {
  const started = useRef(Date.now());
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const local: Errors = {};
    if (f.name.trim().length < 2) local.name = "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) local.email = "Please enter a valid email address.";
    if (f.message.trim().length < 10) local.message = "Please tell me a little more (at least 10 characters).";
    setErrors(local);
    if (Object.keys(local).length) return;
    setState("busy");
    try {
      const res = await fetch("/api/contact/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...f, t: started.current }) });
      const j = await res.json();
      setMsg(j.message ?? "");
      if (j.errors) setErrors(j.errors);
      setState(res.ok ? "ok" : "err");
    } catch {
      setMsg("Something went wrong. Please try again.");
      setState("err");
    }
  }

  if (state === "ok") {
    return (
      <div role="status" className="card flex flex-col items-center p-10 text-center">
        <CheckCircleIcon width={48} height={48} className="text-success" />
        <h2 className="mt-4 text-2xl">Message sent</h2>
        <p className="mt-2 text-slate">{msg}</p>
      </div>
    );
  }

  const field = "mt-1.5 min-h-12 w-full rounded-xl border border-[#D6E0F5] bg-white px-4 text-base";
  const err = (k: string) => errors[k] && <p id={`${k}-err`} role="alert" className="mt-1 text-sm font-semibold text-red-600">{errors[k]}</p>;
  const a11y = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });
  return (
    <form onSubmit={submit} noValidate className="card space-y-5 p-6 md:p-8" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="c-name" className="text-sm font-bold">Name *</label><input id="c-name" name="name" autoComplete="name" className={field} {...a11y("name")} />{err("name")}</div>
        <div><label htmlFor="c-email" className="text-sm font-bold">Email *</label><input id="c-email" name="email" type="email" autoComplete="email" className={field} {...a11y("email")} />{err("email")}</div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="c-company" className="text-sm font-bold">Company</label><input id="c-company" name="company" autoComplete="organization" className={field} /></div>
        <div>
          <label htmlFor="c-budget" className="text-sm font-bold">Budget range</label>
          <select id="c-budget" name="budget" className={field} defaultValue="Not sure yet">{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>
        </div>
      </div>
      <div><label htmlFor="c-message" className="text-sm font-bold">How can I help? *</label><textarea id="c-message" name="message" rows={5} className={`${field} py-3`} {...a11y("message")} />{err("message")}</div>
      {/* Honeypot: hidden from people, filled by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button type="submit" disabled={state === "busy"} className="btn btn-primary w-full sm:w-auto">{state === "busy" ? "Sending…" : "Send message"}</button>
      {state === "err" && <p role="alert" className="text-sm font-semibold text-red-600">{msg}</p>}
    </form>
  );
}
