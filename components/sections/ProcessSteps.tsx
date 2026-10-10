import { SectionHeader } from "../ui/SectionHeader";
import { FunnelGraphic } from "../hero/FunnelGraphic";

const STEPS = [
  { n: "01", title: "Understand", text: "We start with your goals, audience and current numbers, so we know what to fix first." },
  { n: "02", title: "Plan and build", text: "Design the funnel: campaigns, landing pages, lead capture and tracking." },
  { n: "03", title: "Launch and test", text: "Run campaigns with structured A/B tests and measure cost per lead and quality." },
  { n: "04", title: "Automate and report", text: "Automate follow-up and reporting, then review results and decide what to scale." },
];

/** "How I work". Anchor target (#process) for the hero's "See How It Works" button. */
export function ProcessSteps({ title = "From first enquiry to loyal customer", headingId = "process-h" }: { title?: string; headingId?: string }) {
  return (
    <section id="process" aria-labelledby={headingId} className="container-x py-14">
      <SectionHeader align="center" eyebrow="How I work" title={title} description="A simple four-step process, repeated and refined as the data comes in." id={headingId} />
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <FunnelGraphic className="mx-auto w-full max-w-[360px]" />
        <ol className="grid gap-4 sm:grid-cols-2">
          {STEPS.map((s) => (
            <li key={s.n} className="card card-lift p-6">
              <span className="font-display text-sm font-extrabold text-brand">{s.n}</span>
              <h3 className="mt-2 text-lg">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-slate">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
