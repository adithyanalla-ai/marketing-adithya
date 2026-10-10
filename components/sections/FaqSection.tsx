import { JsonLd } from "../JsonLd";
import { faqLd } from "@/lib/jsonld";
import { SectionHeader } from "../ui/SectionHeader";
import type { Faq } from "@/content/services";

/** Visible, server-rendered accordion (native <details>) plus matching FAQPage JSON-LD. */
export function FaqSection({ items, eyebrow = "FAQ", title = "Frequently asked questions", description, id = "faq" }: { items: Faq[]; eyebrow?: string; title?: string; description?: string; id?: string }) {
  return (
    <section aria-labelledby={`${id}-h`} className="container-x py-12">
      <JsonLd data={faqLd(items.map((i) => ({ q: i.q, a: i.a })))} />
      <SectionHeader align="center" eyebrow={eyebrow} title={title} description={description} id={`${id}-h`} />
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {items.map((f) => (
          <details key={f.q} className="card group px-6 py-4 open:shadow-[0_16px_40px_rgba(29,92,255,0.12)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-extrabold marker:hidden">
              {f.q}
              <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-[#EAF2FF] text-brand transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-slate">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
