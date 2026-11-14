/**
 * Seasonal themes, switched on and off by date in India time (no redeploy needed: pages refresh hourly via ISR).
 *  - "diwali": warm gold look with garland, diyas and mandala. Diwali 2026 is on 8 November.
 *  - "celebration": one shared festive look for the upcoming Christmas, New Year and Makar Sankranti windows.
 *    The greeting in the bar and footer changes per festival (see FESTIVALS).
 * Override with NEXT_PUBLIC_THEME=diwali | celebration (force on) or default (force off).
 * To add a festival, append to FESTIVALS. Windows must not overlap each other or the Diwali window.
 */
export type ThemeId = "default" | "diwali" | "celebration";

export const DIWALI = { from: "2026-10-01", until: "2026-11-15" } as const;

export type Festival = { id: string; name: string; greeting: string; cta: string; from: string; until: string };

/** Dates are inclusive, India time. Windows run from a few days before to just after the day itself. */
export const FESTIVALS: readonly Festival[] = [
  { id: "christmas", name: "Christmas", greeting: "Merry Christmas from Adithya Reddy!", cta: "Planning your new-year campaign? Let's talk", from: "2026-12-18", until: "2026-12-26" },
  { id: "new-year", name: "New Year", greeting: "Happy New Year from Adithya Reddy!", cta: "Set your 2027 growth plan. Let's talk", from: "2026-12-27", until: "2027-01-03" },
  { id: "sankranti", name: "Makar Sankranti", greeting: "Happy Sankranti and Pongal from Adithya Reddy!", cta: "Start the year with a clear lead plan. Let's talk", from: "2027-01-09", until: "2027-01-17" },
] as const;

const ymdIST = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);

/** The festival whose window contains `now`, or undefined. */
export function activeFestival(now: Date = new Date()): Festival | undefined {
  const d = ymdIST(now);
  return FESTIVALS.find((f) => d >= f.from && d <= f.until);
}

export function activeTheme(now: Date = new Date()): ThemeId {
  const force = process.env.NEXT_PUBLIC_THEME;
  if (force === "default") return "default";
  if (force === "diwali") return "diwali";
  if (force === "celebration") return "celebration";
  const d = ymdIST(now);
  if (d >= DIWALI.from && d <= DIWALI.until) return "diwali";
  return activeFestival(now) ? "celebration" : "default";
}

/** Greeting for the celebration theme. Falls back to a generic line when the theme is forced on outside a window. */
export function celebrationGreeting(now: Date = new Date()): Pick<Festival, "greeting" | "cta"> {
  const f = activeFestival(now);
  return f ?? { greeting: "Season's greetings from Adithya Reddy!", cta: "Planning your next campaign? Let's talk" };
}

export const isFestive = () => activeTheme() === "diwali";
export const isCelebration = () => activeTheme() === "celebration";
/** True for any seasonal look (used for layout offsets such as the announcement bar). */
export const hasFestiveBar = () => activeTheme() !== "default";
