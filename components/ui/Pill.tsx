import { Icon, type IconName } from "./iconMap";

export function Pill({ icon, children, tint = "text-brand" }: { icon: IconName; children: string; tint?: string }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-card-line bg-white px-4 py-2 text-sm font-semibold shadow-sm">
      <Icon name={icon} width={18} height={18} className={tint} /> {children}
    </li>
  );
}

export const DEFAULT_PILLS: { icon: IconName; label: string; tint: string }[] = [
  { icon: "barchart", label: "Data-driven", tint: "text-brand" },
  { icon: "rocket", label: "Performance-focused", tint: "text-brand" },
  { icon: "sparkle", label: "AI-enabled", tint: "text-chip-violet" },
];

export function PillRow({ pills = DEFAULT_PILLS }: { pills?: typeof DEFAULT_PILLS }) {
  return <ul className="mt-7 flex flex-wrap gap-3">{pills.map((p) => <Pill key={p.label} icon={p.icon} tint={p.tint}>{p.label}</Pill>)}</ul>;
}
