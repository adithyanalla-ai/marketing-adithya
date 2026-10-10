"use client";
import { useState } from "react";

const inr = (n: number) => (isFinite(n) ? "INR " + Math.round(n).toLocaleString("en-IN") : "–");

export function LeadCostCalculator() {
  const [spend, setSpend] = useState(50000);
  const [leads, setLeads] = useState(200);
  const [rate, setRate] = useState(10);
  const customers = (leads * rate) / 100;
  const field = "mt-1 min-h-11 w-full rounded-xl border border-card-line bg-white px-3";
  return (
    <div className="card p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-semibold">Ad spend (INR)<input type="number" min={0} className={field} value={spend} onChange={(e) => setSpend(+e.target.value)} /></label>
        <label className="text-sm font-semibold">Leads generated<input type="number" min={0} className={field} value={leads} onChange={(e) => setLeads(+e.target.value)} /></label>
        <label className="text-sm font-semibold">Lead-to-customer rate (%)<input type="number" min={0} max={100} className={field} value={rate} onChange={(e) => setRate(+e.target.value)} /></label>
      </div>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3" aria-live="polite">
        <div className="rounded-xl bg-[#EAF2FF] p-4"><dt className="text-xs font-bold uppercase text-slate">Cost per lead</dt><dd className="font-display text-2xl font-extrabold text-brand">{inr(spend / leads)}</dd></div>
        <div className="rounded-xl bg-[#EAF2FF] p-4"><dt className="text-xs font-bold uppercase text-slate">Customers</dt><dd className="font-display text-2xl font-extrabold text-brand">{customers.toFixed(1)}</dd></div>
        <div className="rounded-xl bg-[#EAF2FF] p-4"><dt className="text-xs font-bold uppercase text-slate">Cost per customer</dt><dd className="font-display text-2xl font-extrabold text-brand">{inr(spend / customers)}</dd></div>
      </dl>
      <p className="mt-4 text-xs text-slate">Default values are placeholders for illustration, not benchmarks.</p>
    </div>
  );
}
