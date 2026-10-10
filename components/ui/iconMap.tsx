import type { ComponentType, SVGProps } from "react";
import * as I from "../icons";

type Ic = ComponentType<SVGProps<SVGSVGElement>>;

/** Content files refer to icons by name so data stays serialisable. */
export const ICONS = {
  users: I.UsersIcon, megaphone: I.MegaphoneIcon, graduation: I.GraduationIcon, bank: I.BankIcon,
  barchart: I.BarChartIcon, doc: I.DocIcon, flame: I.FlameIcon, bolt: I.BoltIcon, rocket: I.RocketIcon,
  sparkle: I.SparkleIcon, target: I.TargetIcon, gear: I.GearIcon, trend: I.TrendIcon, tag: I.TagIcon,
  mail: I.MailIcon, linkedin: I.LinkedInIcon, clock: I.ClockIcon, book: I.BookIcon, award: I.AwardIcon,
  language: I.LanguageIcon, briefcase: I.BriefcaseIcon, layers: I.LayersIcon, chat: I.ChatIcon,
  calculator: I.CalculatorIcon, wrench: I.WrenchIcon, calendar: I.CalendarIcon, check: I.CheckIcon, crown: I.CrownIcon,
} satisfies Record<string, Ic>;

export type IconName = keyof typeof ICONS;

export function Icon({ name, ...p }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const C = ICONS[name];
  return <C {...p} />;
}
