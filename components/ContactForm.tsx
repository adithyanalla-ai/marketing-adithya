"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircleIcon, ChatIcon } from "./icons";
import { BUDGETS, CONTACT } from "@/content/contact";
import { track } from "@/lib/analytics";

type Errors = Record<string, string>;

export function ContactForm() {
  const started = useRef(Date.now());
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [first, setFirst] = useState("");

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
      const j = (await res.json().catch(() => ({}))) as { errors?: Errors };
      if (j.errors) setErrors(j.errors);
      if (res.ok) {
        setFirst(f.name.trim().split(/\s+/)[0]);
        setState("ok");
        track("form_submit", { form: "contact" });
      } else setState("err");
    } catch {
      setState("err"); // visitors never see provider or network details
    }
  }

  if (state === "ok") {
    return (
      <div role="status" className="card flex flex-col items-center p-10 text-center">
        <CheckCircleIcon width={48} height={48} className="text-success" />
        <h2 className="mt-4 text-2xl">Thanks, {first}. Your message is in.</h2>
        <p className="mt-2 text-slate">I&apos;ll reply by email soon.</p>
        <p className="mt-6 text-sm text-slate">Need a faster route?</p>
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener" onClick={() => track("book_call_click", { label: "whatsapp_after_submit" })} className="btn btn-primary mt-2">
          <ChatIcon width={18} height={18} /> Chat on WhatsApp
        </a>
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
      <button type="submit" disabled={state === "busy"} aria-busy={state === "busy"} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">{state === "busy" ? "Sending…" : "Send message"}</button>
      {state === "err" && (
        <p role="alert" className="text-sm font-semibold text-red-600">
          Sorry, your message could not be sent. Please call <a className="underline" href={CONTACT.phoneTel}>{CONTACT.phoneDisplay}</a> or <a className="underline" href={CONTACT.whatsappUrl} target="_blank" rel="noopener">message me on WhatsApp</a>.
        </p>
      )}
      <p className="text-sm text-slate">Your details are used only to reply to your enquiry. See the <Link className="font-semibold text-brand underline" href="/privacy/">privacy policy</Link>.</p>
    </form>
  );
}
