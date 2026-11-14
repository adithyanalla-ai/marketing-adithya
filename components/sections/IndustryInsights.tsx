import { SectionHeader } from "../ui/SectionHeader";

/**
 * Third-party industry figures only. These are NOT Adithya's client results (those live in content/site.ts STATS).
 * Every figure names its publisher, sample and link. Two are vendor-run surveys; the footnote says so.
 */
const INSIGHTS = [
  {
    value: "41%",
    text: "of marketers can prove the ROI of their AI use today, down from 49% a year earlier, even though 91% now use AI.",
    source: "Jasper, State of AI in Marketing 2026 (1,400 marketers)",
    href: "https://www.jasper.ai/state-of-ai-marketing-2026",
  },
  {
    value: "55%",
    text: "of marketing leaders rank measurement and performance insight as the most valuable AI capability in a platform, ahead of personalisation (43%) and workflow automation (42%).",
    source: "Adobe, State of Marketing in an AI-Driven World 2026 (150 leaders at $100M+ companies in the US, UK, Canada, France and Germany)",
    href: "https://business.adobe.com/resources/sdk/the-search-for-impact-in-an-era-of-speed.html",
  },
  {
    value: "7%",
    text: "of those leaders have AI embedded in their workflows and delivering measurable impact. Most are still experimenting or expanding.",
    source: "Adobe, same 2026 report",
    href: "https://business.adobe.com/resources/sdk/the-search-for-impact-in-an-era-of-speed.html",
  },
  {
    value: "74%",
    text: "of AI assistant users regularly ask for AI-driven recommendations, so being clearly described online now matters beyond classic search.",
    source: "Kantar, Marketing Trends 2026",
    href: "https://www.kantar.com/campaigns/marketing-trends",
  },
] as const;

export function IndustryInsights() {
  return (
    <section aria-labelledby="insights-h" className="container-x py-12">
      <SectionHeader
        align="center"
        eyebrow="Why measurement first"
        title="AI is everywhere. Proof of return is not."
        description="Industry research points to the same gap I focus on: using AI is easy, showing what it earns is hard."
        id="insights-h"
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INSIGHTS.map((i) => (
          <li key={i.value + i.source} className="card flex flex-col gap-3 px-6 py-6">
            <p className="font-display text-4xl font-extrabold tracking-tight text-brand">{i.value}</p>
            <p className="text-[15px] leading-relaxed text-ink">{i.text}</p>
            <p className="mt-auto text-xs leading-relaxed text-slate">
              <a href={i.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand">{i.source}</a>
            </p>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate">
        Industry figures, not my client results. The Jasper and Adobe surveys were run or commissioned by AI vendors and use self-reported answers, so read them as direction, not proof.
      </p>
    </section>
  );
}
