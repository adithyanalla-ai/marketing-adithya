import { IconChip } from "./IconChip";
import type { IconName } from "./iconMap";

export type StatRow = { icon: IconName; value?: string; title?: string; label: string };

/** Floating glass-white card of icon rows (About hero, service heroes, case studies). Only real figures belong here. */
export function StatCard({ rows, className = "", note }: { rows: StatRow[]; className?: string; note?: string }) {
  return (
    <div className={`rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_20px_50px_rgba(29,92,255,0.14)] backdrop-blur ${className}`}>
      <ul className="divide-y divide-card-line">
        {rows.map((r) => (
          <li key={r.label + (r.value ?? r.title)} className="flex items-center gap-4 px-3 py-4">
            <IconChip name={r.icon} size="md" />
            <div>
              {r.value && <p className={`font-display font-extrabold leading-tight ${r.value.length > 9 ? "whitespace-nowrap text-[1.02rem]" : "text-xl"}`}>{r.value}</p>}
              {r.title && <p className="font-display text-base font-extrabold leading-tight">{r.title}</p>}
              <p className="text-[13px] leading-snug text-slate">{r.label}</p>
            </div>
          </li>
        ))}
      </ul>
      {note && <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate/80">{note}</p>}
    </div>
  );
}
