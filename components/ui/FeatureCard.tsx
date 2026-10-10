import Link from "next/link";
import { ArrowRightIcon, FlameIcon, BoltIcon } from "../icons";
import { IconChip } from "./IconChip";
import type { IconName } from "./iconMap";

export type Badge = "Popular" | "High Impact";

export function BadgeChip({ badge }: { badge: Badge }) {
  const popular = badge === "Popular";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${popular ? "bg-[#E8EFFF] text-brand" : "bg-[#E3F6EA] text-[#166534]"}`}>
      {popular ? <FlameIcon width={13} height={13} /> : <BoltIcon width={13} height={13} />} {badge}
    </span>
  );
}

type Props = {
  icon: IconName;
  title: string;
  description: string;
  badge?: Badge;
  href?: string;
  linkText?: string;
  /** stack: icon above text (services grid). row: icon left of text (Key Areas of Work). */
  layout?: "stack" | "row";
  headingLevel?: "h2" | "h3";
};

export function FeatureCard({ icon, title, description, badge, href, linkText, layout = "stack", headingLevel: H = "h3" }: Props) {
  const link = href && linkText && (
    <Link href={href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
      {linkText} <ArrowRightIcon width={16} height={16} />
    </Link>
  );
  if (layout === "row") {
    return (
      <article className="card card-lift flex gap-5 p-6">
        <IconChip name={icon} size="lg" />
        <div>
          <H className="text-lg leading-snug">{title}</H>
          <p className="mt-2 text-[15px] leading-relaxed text-slate">{description}</p>
          {link}
        </div>
      </article>
    );
  }
  return (
    <article className="card card-lift flex h-full flex-col p-6">
      <div className="flex items-start justify-between">
        <IconChip name={icon} />
        {badge && <BadgeChip badge={badge} />}
      </div>
      <H className="mt-5 text-xl leading-snug">{title}</H>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate">{description}</p>
      {link}
    </article>
  );
}
