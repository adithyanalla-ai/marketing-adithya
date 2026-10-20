/** Checks the seasonal-theme window (India time) and the env overrides. Usage: npm run theme:test */
import { activeTheme, DIWALI } from "../content/theme";

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
console.log(failed ? `\n${failed} failed` : "\nAll theme tests passed");
process.exit(failed ? 1 : 0);
