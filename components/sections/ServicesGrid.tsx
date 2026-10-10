import { SERVICES } from "@/content/services";
import { FeatureCard } from "../ui/FeatureCard";
import { SectionHeader } from "../ui/SectionHeader";

export function ServicesGrid({ headingLevel = "h2", id = "services", showHeader = true }: { headingLevel?: "h1" | "h2"; id?: string; showHeader?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`container-x ${showHeader ? "py-14" : "pb-14 pt-2"}`}>
      {showHeader && (
        <SectionHeader align="center" as={headingLevel} id={`${id}-h`} eyebrow="Services" title="Turn More Enquiries Into Customers"
          description="Data-driven marketing and automation solutions to help you generate, nurture and convert high-quality enquiries into measurable business growth." />
      )}
      <ul className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${showHeader ? "mt-12" : ""}`}>
        {SERVICES.map((s) => (
          <li key={s.slug}>
            <FeatureCard headingLevel={showHeader ? "h3" : "h2"} icon={s.icon} title={s.name} description={s.cardText} badge={s.badge}
              href={`/services/${s.slug}/`} linkText={`Learn more about ${s.label}`} />
          </li>
        ))}
      </ul>
    </section>
  );
}
