"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircleIcon, ChatIcon } from "./icons";
import { BUDGETS, CONTACT } from "@/content/contact";
import { track } from "@/lib/analytics";


type Errors = Record<string, string>;

export function ContactForm() {
  const openedAt = useRef(Date.now());
  const busy = useRef(false); // blocks double submits even before React re-renders
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [first, setFirst] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    busy.current = true;
    setState("busy");
    try {
      // Loaded on first use so zod stays out of the initial page JavaScript. A failed chunk load is handled like any other error.
      const { submitContact, DRY_RUN } = await import("@/lib/contact-submit");
      const result = await submitContact(
        { name: f.name ?? "", email: f.email ?? "", company: f.company ?? "", budget: f.budget ?? "", message: f.message ?? "", gotcha: f._gotcha ?? "", openedAt: openedAt.current },
        { dryRun: DRY_RUN },
      );
      if (result.status === "invalid") { setErrors(result.errors); setState("idle"); return; }
      setErrors({});
      if (result.status === "error") { setState("err"); return; }
      setFirst((f.name ?? "").trim().split(/\s+/)[0]);
      setState("ok");
      if (result.status === "ok") track("form_submit", { form: "contact" }); // spam is shown success but never counted
    } catch {
      setState("err");
    } finally {
      busy.current = false;
    }
  }

  // Warm the submit module as soon as the visitor starts using the form.
  const warm = () => { void import("@/lib/contact-submit").catch(() => {}); };

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
    <form onSubmit={submit} onFocusCapture={warm} noValidate className="card space-y-5 p-6 md:p-8" aria-label="Contact form">
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
      {/* Honeypot: off-screen (not display:none), hidden from people and assistive tech, filled by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Leave this empty<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label></div>
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
