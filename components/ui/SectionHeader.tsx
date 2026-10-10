import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** center: pill eyebrow, centred (home/services). split: left title, right-aligned description (About). */
  align?: "center" | "split";
  id?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({ eyebrow, title, description, align = "split", id, as: H = "h2" }: Props) {
  if (align === "center") {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <p className="inline-block rounded-full bg-[#E3EDFF] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-dark">{eyebrow}</p>
        <H id={id} className="mt-5 text-3xl leading-tight sm:text-[2.6rem]">{title}</H>
        {description && <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate">{description}</p>}
      </div>
    );
  }
  return (
    <div className="grid items-end gap-4 md:grid-cols-2 md:gap-12">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
        <H id={id} className="mt-2 text-3xl leading-tight sm:text-4xl">{title}</H>
      </div>
      {description && <p className="max-w-xl text-base leading-relaxed text-slate md:pb-1">{description}</p>}
    </div>
  );
}
