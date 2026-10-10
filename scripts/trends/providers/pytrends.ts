import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import type { Geo, RelatedQuery, TrendsProvider, Window } from "../types";

const run = promisify(execFile);
const FRAME: Record<Window, string> = { "7d": "now 7-d", "90d": "today 3-m" };

/** Unofficial fallback: needs python3 and `pip install pytrends`. Google may rate-limit (HTTP 429). */
export class PytrendsProvider implements TrendsProvider {
  name = "pytrends";
  async fetchRelated(seed: string, geo: Geo, window: Window): Promise<RelatedQuery[]> {
    const script = path.join(__dirname, "pytrends_fetch.py");
    const { stdout } = await run("python3", [script, seed, geo === "IN" ? "IN" : "", FRAME[window]], { timeout: 60000 });
    const j = JSON.parse(stdout) as { rising: { query: string; value: number }[]; top: { query: string; value: number }[] };
    const out: RelatedQuery[] = [];
    for (const kind of ["rising", "top"] as const) {
      for (const r of j[kind]) out.push({ seed, query: r.query, kind, value: r.value, breakout: kind === "rising" && r.value >= 5000, geo, window });
    }
    return out;
  }
}
