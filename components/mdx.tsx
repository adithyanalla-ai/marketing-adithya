import type { ReactNode } from "react";

export function Callout({ type = "note", children }: { type?: "note" | "warning" | "tip"; children: ReactNode }) {
  const styles = { note: "border-sky-300 bg-sky-50", warning: "border-amber-400 bg-amber-50", tip: "border-emerald-300 bg-emerald-50" };
  return (
    <aside role="note" className={`not-prose my-6 rounded-xl border-l-4 p-4 text-sm ${styles[type]}`}>
      {children}
    </aside>
  );
}

export function KeyTakeaways({ children }: { children: ReactNode }) {
  return (
    <section aria-label="Key takeaways" className="not-prose my-8 rounded-2xl border border-accent/30 bg-accent-soft p-6">
      <h2 className="text-lg font-semibold">Key takeaways</h2>
      <div className="mt-2 [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">{children}</div>
    </section>
  );
}

/** Simple accessible bar chart. Only pass real, cited numbers. */
export function BarChart({ data, unit = "", caption }: { data: { label: string; value: number }[]; unit?: string; caption: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <figure className="not-prose my-8">
      <figcaption className="mb-3 text-sm font-semibold">{caption}</figcaption>
      <ul className="space-y-2">
        {data.map((d) => (
          <li key={d.label} className="text-sm">
            <div className="flex justify-between"><span>{d.label}</span><span>{d.value}{unit}</span></div>
            <div className="mt-1 h-3 rounded bg-line"><div className="h-3 rounded bg-accent" style={{ width: `${(d.value / max) * 100}%` }} /></div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

import { CaseFacts, CaseName } from "./CaseFacts";

export const mdxComponents = { Callout, KeyTakeaways, BarChart, CaseFacts, CaseName };
