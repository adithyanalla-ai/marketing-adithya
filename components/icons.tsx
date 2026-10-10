import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({ width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p });

export const BoltIcon = (p: P) => <svg {...base(p)}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" fill="currentColor" stroke="none" /></svg>;
export const CalendarIcon = (p: P) => <svg {...base(p)}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>;
export const ArrowRightIcon = (p: P) => <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const PlayIcon = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="10" /><path d="m10 8.5 6 3.5-6 3.5v-7Z" fill="currentColor" stroke="none" /></svg>;
export const CheckIcon = (p: P) => <svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
export const CheckCircleIcon = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" /><path d="m7.5 12.5 3 3 6-6.5" stroke="#fff" /></svg>;
export const ChevronDownIcon = (p: P) => <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>;
export const MenuIcon = (p: P) => <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const CloseIcon = (p: P) => <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>;
export const ArrowUpIcon = (p: P) => <svg {...base(p)}><path d="M12 19V5M6 11l6-6 6 6" /></svg>;
export const ArrowDownIcon = (p: P) => <svg {...base(p)}><path d="M12 5v14M6 13l6 6 6-6" /></svg>;
export const UsersIcon = (p: P) => <svg {...base(p)}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" /></svg>;
export const TrendIcon = (p: P) => <svg {...base(p)}><path d="m3 17 6-6 4 4 8-8M15 7h6v6" /></svg>;
export const TagIcon = (p: P) => <svg {...base(p)}><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" /><circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" /></svg>;
export const CrownIcon = (p: P) => <svg {...base(p)}><path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8Z" fill="currentColor" stroke="none" /></svg>;
export const FormIcon = (p: P) => <svg {...base(p)}><rect x="4" y="3" width="16" height="18" rx="3" /><path d="M8 9h8M8 13h8M8 17h4" /></svg>;
export const MegaphoneIcon = (p: P) => <svg {...base(p)}><path d="M3 11v3a1 1 0 0 0 1 1h3l8 4V6L7 10H4a1 1 0 0 0-1 1ZM19 9a4 4 0 0 1 0 6" /></svg>;
export const InfinityIcon = (p: P) => <svg {...base(p)}><path d="M12 12c-2-3-3.5-4-5.5-4a4 4 0 0 0 0 8c2 0 3.5-1 5.5-4Zm0 0c2 3 3.5 4 5.5 4a4 4 0 0 0 0-8c-2 0-3.5 1-5.5 4Z" /></svg>;
export const CameraIcon = (p: P) => <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>;
export const ChatIcon = (p: P) => <svg {...base(p)}><path d="M21 12a8 8 0 0 1-11.7 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></svg>;

export function LogoMark(p: P) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" {...p}>
      <rect width="26" height="26" rx="7" fill="#1D5CFF" />
      <rect x="6" y="13" width="3.6" height="7" rx="1.2" fill="#fff" />
      <rect x="11.2" y="9" width="3.6" height="11" rx="1.2" fill="#fff" />
      <rect x="16.4" y="5.5" width="3.6" height="14.5" rx="1.2" fill="#fff" />
    </svg>
  );
}

export const ChevronRightIcon = (p: P) => <svg {...base(p)}><path d="m9 6 6 6-6 6" /></svg>;
export const ExternalIcon = (p: P) => <svg {...base(p)}><path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>;
export const FlameIcon = (p: P) => <svg {...base(p)}><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9Z" fill="currentColor" stroke="none" /></svg>;
export const RocketIcon = (p: P) => <svg {...base(p)}><path d="M5 19c0-3 1-4 3-4l1 1c0 2-1 3-4 3ZM9 15c0-5 4-10 11-11 0 7-5 11-10 11M14.5 9.5h.01" /><path d="M9 15 6 12c1-1 2-1.5 3.5-1.5M15 15v3.5c-1.5 1-2 2-3 2" /></svg>;
export const SparkleIcon = (p: P) => <svg {...base(p)}><path d="M12 2c.8 5.2 3.8 8.2 10 10-6.2 1.8-9.2 4.8-10 10-.8-5.2-3.8-8.2-10-10 6.2-1.8 9.2-4.8 10-10Z" fill="currentColor" stroke="none" /></svg>;
export const TargetIcon = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>;
export const GearIcon = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></svg>;
export const BarChartIcon = (p: P) => <svg {...base(p)}><rect x="4" y="12" width="4" height="8" rx="1" /><rect x="10" y="7" width="4" height="13" rx="1" /><rect x="16" y="3" width="4" height="17" rx="1" /></svg>;
export const DocIcon = (p: P) => <svg {...base(p)}><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>;
export const GraduationIcon = (p: P) => <svg {...base(p)}><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6" /></svg>;
export const BankIcon = (p: P) => <svg {...base(p)}><path d="M3 9 12 3l9 6M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 21h18M3 9h18" /></svg>;
export const MailIcon = (p: P) => <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>;
export const LinkedInIcon = (p: P) => <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13.5c0-1.5 1-2.5 2.5-2.5S17 12 17 13.5V17" /></svg>;
export const ClockIcon = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
export const BookIcon = (p: P) => <svg {...base(p)}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" /><path d="M8 7h7M8 11h5" /></svg>;
export const AwardIcon = (p: P) => <svg {...base(p)}><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" /></svg>;
export const LanguageIcon = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>;
export const BriefcaseIcon = (p: P) => <svg {...base(p)}><rect x="3" y="7" width="18" height="13" rx="3" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></svg>;
export const LayersIcon = (p: P) => <svg {...base(p)}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>;
export const PhoneIcon = (p: P) => <svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>;
export const CalculatorIcon = (p: P) => <svg {...base(p)}><rect x="5" y="3" width="14" height="18" rx="3" /><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" /></svg>;
export const WrenchIcon = (p: P) => <svg {...base(p)}><path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8-4-4 8-8-1.5-1.5Z" /><path d="m9 17-5 3 3-5" /></svg>;
