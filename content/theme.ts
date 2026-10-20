/**
 * Seasonal theme. The Diwali look switches itself on and off by date (India time), so nothing needs removing later.
 * Override with NEXT_PUBLIC_THEME=diwali (force on) or NEXT_PUBLIC_THEME=default (force off).
 * Diwali 2026 is on 8 November; the window below runs from the Navratri run-up to just after Bhai Dooj.
 */
export type ThemeId = "default" | "diwali";

export const DIWALI = { from: "2026-10-01", until: "2026-11-15" } as const;

const ymdIST = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);

export function activeTheme(now: Date = new Date()): ThemeId {
  const force = process.env.NEXT_PUBLIC_THEME;
  if (force === "default") return "default";
  if (force === "diwali") return "diwali";
  const d = ymdIST(now);
  return d >= DIWALI.from && d <= DIWALI.until ? "diwali" : "default";
}

export const isFestive = () => activeTheme() === "diwali";
