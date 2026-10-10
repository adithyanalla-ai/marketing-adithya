import Link from "next/link";
import { ChevronRightIcon } from "../icons";
import { IconChip } from "./IconChip";
import type { IconName } from "./iconMap";

export function CompactCard({ icon, title, text, href }: { icon: IconName; title: string; text: string; href?: string }) {
  const body = (
    <>
      <IconChip name={icon} />
      <div className="min-w-0 flex-1">
        <h3 className="text-base leading-snug">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate">{text}</p>
      </div>
      <ChevronRightIcon width={18} height={18} className="shrink-0 text-brand" />
    </>
  );
  const cls = "card card-lift flex items-center gap-4 p-5";
  return href ? <Link href={href} className={cls}>{body}</Link> : <div className={cls}>{body}</div>;
}
