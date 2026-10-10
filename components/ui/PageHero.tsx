import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "../Breadcrumbs";
import { DEFAULT_PILLS, PillRow } from "./Pill";

type Props = {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  pills?: typeof DEFAULT_PILLS | null;
  /** Right-hand media slot (photo, stat card, illustration). */
  media?: ReactNode;
  actions?: ReactNode;
};

export function PageHero({ crumbs, eyebrow, title, intro, pills = DEFAULT_PILLS, media, actions }: Props) {
  return (
    <section className="container-x pb-12 pt-6 md:pb-16 md:pt-10">
      <Breadcrumbs items={crumbs} />
      <div className={`mt-8 grid items-center gap-10 ${media ? "lg:grid-cols-2" : ""}`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
          <h1 className="mt-3 text-[2.4rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/90">{intro}</div>
          {pills && <PillRow pills={pills} />}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {media && <div className="relative">{media}</div>}
      </div>
    </section>
  );
}
