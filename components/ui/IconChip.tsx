import { Icon, type IconName } from "./iconMap";

const TONES = {
  blue: "bg-[#EAF2FF] text-brand",
  green: "bg-[#E8F7EE] text-success",
  white: "bg-white text-brand shadow-sm",
} as const;

export function IconChip({ name, size = "md", tone = "blue" }: { name: IconName; size?: "sm" | "md" | "lg"; tone?: keyof typeof TONES }) {
  const dim = { sm: "size-9 rounded-[10px]", md: "size-12 rounded-xl", lg: "size-16 rounded-2xl" }[size];
  const ic = { sm: 18, md: 24, lg: 30 }[size];
  return (
    <span className={`grid shrink-0 place-items-center ${dim} ${TONES[tone]}`} aria-hidden="true">
      <Icon name={name} width={ic} height={ic} />
    </span>
  );
}
