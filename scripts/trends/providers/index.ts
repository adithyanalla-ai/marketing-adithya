import type { TrendsProvider } from "../types";
import { SerpApiProvider } from "./serpapi";
import { DataForSeoProvider } from "./dataforseo";
import { PytrendsProvider } from "./pytrends";
import { MockProvider } from "./mock";

export const NO_PROVIDER_MESSAGE = [
  "No Google Trends provider is configured. Google Trends has no official API, so one of these is required:",
  "  - SERPAPI_KEY=...                           (SerpApi, default)",
  "  - DATAFORSEO_LOGIN=... DATAFORSEO_PASSWORD=...   (DataForSEO)",
  "  - TRENDS_PROVIDER=pytrends                  (unofficial; needs python3 and `pip install pytrends`)",
  "Or run with --dry-run to use mock data.",
].join("\n");

export function resolveProvider(opts: { dryRun?: boolean; override?: string }): TrendsProvider {
  if (opts.dryRun) return new MockProvider();
  const want = (opts.override || process.env.TRENDS_PROVIDER || "").toLowerCase();
  const { SERPAPI_KEY, DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD } = process.env;

  if (want === "pytrends") return new PytrendsProvider();
  if (want === "dataforseo" || (!want && !SERPAPI_KEY && DATAFORSEO_LOGIN && DATAFORSEO_PASSWORD)) {
    if (!DATAFORSEO_LOGIN || !DATAFORSEO_PASSWORD) throw new Error("TRENDS_PROVIDER=dataforseo needs DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD.");
    return new DataForSeoProvider(DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD);
  }
  if (want === "serpapi" || (!want && SERPAPI_KEY)) {
    if (!SERPAPI_KEY) throw new Error("TRENDS_PROVIDER=serpapi needs SERPAPI_KEY.");
    return new SerpApiProvider(SERPAPI_KEY);
  }
  throw new Error(want ? `Unknown TRENDS_PROVIDER "${want}".\n${NO_PROVIDER_MESSAGE}` : NO_PROVIDER_MESSAGE);
}
