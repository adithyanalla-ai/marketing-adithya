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
