import { ArrowRightIcon, BoltIcon, CalendarIcon, CheckCircleIcon, PlayIcon } from "../icons";
import { BookCallButton } from "../BookCallButton";
import { HERO } from "@/content/site";
import { Swoosh } from "./Swoosh";
import { HeroDashboardLazy } from "./HeroDashboardLazy";

/** Server component: all copy is in the initial HTML, so the H1 is the LCP element. */
export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-h1">

      <div className="container-x relative grid items-center gap-12 pb-16 pt-8 md:pt-14 lg:grid-cols-[minmax(0,11fr)_minmax(0,12fr)] lg:gap-8 lg:pb-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#D6E3FF] bg-white px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-brand shadow-sm">
            <BoltIcon width={14} height={14} /> {HERO.eyebrow}
          </p>
          <h1 id="hero-h1" className="mt-6 text-[2.35rem] leading-[1.08] text-ink sm:text-[3.1rem] lg:text-[2.9rem] xl:text-[3.15rem]">
            AI-powered growth marketing that turns enquiries into{" "}
            <span className="relative inline-block whitespace-nowrap text-brand">
              customers
              <Swoosh />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">{HERO.subtext}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <BookCallButton className="btn btn-primary">
              <CalendarIcon width={18} height={18} /> Book a Free Strategy Call <ArrowRightIcon width={18} height={18} />
            </BookCallButton>
            <a href="#process" className="btn btn-ghost">
              <PlayIcon width={18} height={18} className="text-brand" /> See How It Works
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-ink">
            {HERO.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircleIcon width={20} height={20} className="text-success" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <HeroDashboardLazy />
      </div>
    </section>
  );
}
