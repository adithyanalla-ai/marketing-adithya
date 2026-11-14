/** Checks the seasonal-theme window (India time) and the env overrides. Usage: npm run theme:test */
import { activeFestival, activeTheme, celebrationGreeting, DIWALI, FESTIVALS } from "../content/theme";

let failed = 0;
const check = (name: string, ok: boolean) => { if (!ok) failed++; console.log(`${ok ? "ok  " : "FAIL"} ${name}`); };
const at = (iso: string) => new Date(iso);

delete process.env.NEXT_PUBLIC_THEME;
check(`before ${DIWALI.from} -> default`, activeTheme(at("2026-09-30T12:00:00+05:30")) === "default");
check(`on ${DIWALI.from} 00:05 IST -> diwali`, activeTheme(at("2026-10-01T00:05:00+05:30")) === "diwali");
check("Diwali day (8 Nov) -> diwali", activeTheme(at("2026-11-08T12:00:00+05:30")) === "diwali");
check(`last day ${DIWALI.until} 23:55 IST -> diwali`, activeTheme(at("2026-11-15T23:55:00+05:30")) === "diwali");
check("16 Nov 00:05 IST -> default (expired on its own)", activeTheme(at("2026-11-16T00:05:00+05:30")) === "default");
check("UTC evening of the last day still counts as the next IST day", activeTheme(at("2026-11-15T19:00:00Z")) === "default");
process.env.NEXT_PUBLIC_THEME = "default";
check("NEXT_PUBLIC_THEME=default forces off inside the window", activeTheme(at("2026-11-08T12:00:00+05:30")) === "default");
process.env.NEXT_PUBLIC_THEME = "diwali";
check("NEXT_PUBLIC_THEME=diwali forces on outside the window", activeTheme(at("2027-03-01T12:00:00+05:30")) === "diwali");

delete process.env.NEXT_PUBLIC_THEME;
check("20 Nov -> default (gap after Diwali)", activeTheme(at("2026-11-20T12:00:00+05:30")) === "default");
check("17 Dec -> default (day before Christmas window)", activeTheme(at("2026-12-17T12:00:00+05:30")) === "default");
check("25 Dec -> celebration (Christmas)", activeTheme(at("2026-12-25T12:00:00+05:30")) === "celebration" && activeFestival(at("2026-12-25T12:00:00+05:30"))?.id === "christmas");
check("27 Dec -> celebration (New Year greeting)", activeFestival(at("2026-12-27T00:05:00+05:30"))?.id === "new-year");
check("1 Jan -> celebration (New Year)", activeTheme(at("2027-01-01T12:00:00+05:30")) === "celebration");
check("4 Jan -> default", activeTheme(at("2027-01-04T00:05:00+05:30")) === "default");
check("14 Jan -> celebration (Sankranti)", activeFestival(at("2027-01-14T12:00:00+05:30"))?.id === "sankranti");
check("18 Jan -> default", activeTheme(at("2027-01-18T00:05:00+05:30")) === "default");
check("Diwali window wins over celebration", activeTheme(at("2026-11-08T12:00:00+05:30")) === "diwali");
check("Greeting names the festival", celebrationGreeting(at("2026-12-25T12:00:00+05:30")).greeting.includes("Christmas"));
check("Windows do not overlap each other or Diwali", (() => {
  const w = [{ from: DIWALI.from, until: DIWALI.until }, ...FESTIVALS].sort((a, b) => a.from.localeCompare(b.from));
  return w.every((x, i) => i === 0 || w[i - 1].until < x.from);
})());
process.env.NEXT_PUBLIC_THEME = "celebration";
check("NEXT_PUBLIC_THEME=celebration forces on", activeTheme(at("2027-03-01T12:00:00+05:30")) === "celebration");
console.log(failed ? `\n${failed} failed` : "\nAll theme tests passed");
process.exit(failed ? 1 : 0);
