import { MORE_STATS, STATS } from "@/content/site";
import { StatCountUp } from "./StatCountUp";

const items = [
  { n: STATS.qualifiedLeads.value, suffix: STATS.qualifiedLeads.suffix, label: STATS.qualifiedLeads.label },
  { n: STATS.conversionLift.value, suffix: STATS.conversionLift.suffix, label: STATS.conversionLift.label },
  { n: STATS.lowerCostPerLead.value, suffix: STATS.lowerCostPerLead.suffix, label: STATS.lowerCostPerLead.label },
  { text: STATS.revenueFacilitated.text, label: STATS.revenueFacilitated.label },
  { text: MORE_STATS.kpis.value, label: "KPIs tracked" },
  { text: MORE_STATS.hoursSaved.value, label: "hours saved per week" },
];

/** Real figures only (content/site.ts). Numbers are in the server HTML; count-up is progressive enhancement. */
export function StatsStrip() {
  return (
    <section aria-label="Results at a glance" className="container-x py-10">
      <dl className="card grid grid-cols-2 gap-y-8 px-6 py-8 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((i) => (
          <div key={i.label} className="flex flex-col-reverse text-center">
            <dt className="mt-1 text-sm font-semibold text-slate">{i.label}</dt>
            <dd className="font-display text-3xl font-extrabold tracking-tight text-brand">
              {"n" in i && i.n !== undefined ? <StatCountUp value={i.n} suffix={i.suffix} /> : i.text}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
