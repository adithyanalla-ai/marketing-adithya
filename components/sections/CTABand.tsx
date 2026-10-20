import { ArrowRightIcon, ExternalIcon } from "../icons";
import { BookCallButton } from "../BookCallButton";
import { IconChip } from "../ui/IconChip";
import { SITE } from "@/lib/site";

type Props = {
  eyebrow?: string;
  headline?: string;
  text?: string;
  /** Show the View Portfolio secondary button (About page). */
  portfolio?: boolean;
};

/** Appears at the bottom of every page. */
export function CTABand({ eyebrow = "Ready to grow?", headline = "Let's discuss a strategy for your business", text = "Tell me your goals and where your numbers are today, and we will work out what to fix first.", portfolio = false }: Props) {
  return (
    <section aria-labelledby="cta-band-h" className="container-x pb-16 pt-6">
      <div className="cta-band relative overflow-hidden rounded-[28px] border border-[#D6E3FF] bg-gradient-to-r from-[#E6EFFF] via-[#EEF4FF] to-[#F3F7FF] px-6 py-8 md:px-10">
        <div aria-hidden="true" className="dot-grid pointer-events-none absolute -left-4 bottom-0 h-24 w-40 opacity-40" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand/10 blur-2xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <span className="hidden sm:block"><IconChip name="calendar" size="lg" tone="white" /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>
              <h2 id="cta-band-h" className="mt-1 text-2xl leading-tight md:text-[1.7rem]">{headline}</h2>
              <p className="mt-1.5 max-w-xl text-[15px] text-slate">{text}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <BookCallButton>Book a Free Strategy Call <ArrowRightIcon width={18} height={18} /></BookCallButton>
            {portfolio && (
              <a href={SITE.portfolio} target="_blank" rel="noopener" className="btn btn-ghost">
                View Portfolio <ExternalIcon width={16} height={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
