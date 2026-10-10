"use client";
import { useState } from "react";
import { AnimatedNumber } from "./AnimatedNumber";

const inr = (n: number) => (isFinite(n) ? "INR " + Math.round(n).toLocaleString("en-IN") : "–");

export function LeadCostCalculator() {
  const [spend, setSpend] = useState(50000);
  const [leads, setLeads] = useState(200);
  const [rate, setRate] = useState(10);
  const customers = (leads * rate) / 100;
  const field = "mt-1.5 min-h-12 w-full rounded-xl border border-[#D6E0F5] bg-white px-4 text-base";
  const out = "rounded-2xl bg-[#EAF2FF] p-5";
  return (
    <div className="card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="text-sm font-bold">Ad spend (INR)<input type="number" min={0} className={field} value={spend} onChange={(e) => setSpend(+e.target.value)} /></label>
        <label className="text-sm font-bold">Leads generated<input type="number" min={0} className={field} value={leads} onChange={(e) => setLeads(+e.target.value)} /></label>
        <label className="text-sm font-bold">Lead-to-customer rate (%)<input type="number" min={0} max={100} className={field} value={rate} onChange={(e) => setRate(+e.target.value)} /></label>
      </div>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3" aria-live="polite">
        <div className={out}><dt className="text-xs font-bold uppercase tracking-wide text-slate">Cost per lead</dt><dd className="mt-1 font-display text-2xl font-extrabold text-brand"><AnimatedNumber value={spend / leads} format={inr} /></dd></div>
        <div className={out}><dt className="text-xs font-bold uppercase tracking-wide text-slate">Customers</dt><dd className="mt-1 font-display text-2xl font-extrabold text-brand"><AnimatedNumber value={customers} format={(n) => n.toFixed(1)} /></dd></div>
        <div className={out}><dt className="text-xs font-bold uppercase tracking-wide text-slate">Cost per customer</dt><dd className="mt-1 font-display text-2xl font-extrabold text-brand"><AnimatedNumber value={spend / customers} format={inr} /></dd></div>
      </dl>
      <p className="mt-5 inline-block rounded-lg bg-[#FEF3C7] px-3 py-1.5 text-xs font-bold text-[#92400E]">Illustrative estimate: based only on the numbers you enter. Starting values are placeholders, not benchmarks.</p>
    </div>
  );
}
