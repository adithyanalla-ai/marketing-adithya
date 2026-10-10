import type { Geo, RelatedQuery, TrendsProvider, Window } from "../types";

const DATE: Record<Window, string> = { "7d": "now 7-d", "90d": "today 3-m" };

type SerpRow = { query: string; value?: string; extracted_value?: number };

export class SerpApiProvider implements TrendsProvider {
  name = "serpapi";
  constructor(private key: string) {}

  async fetchRelated(seed: string, geo: Geo, window: Window): Promise<RelatedQuery[]> {
    const params = new URLSearchParams({
      engine: "google_trends", q: seed, data_type: "RELATED_QUERIES", date: DATE[window], api_key: this.key,
    });
    if (geo === "IN") params.set("geo", "IN");
    const res = await fetch(`https://serpapi.com/search.json?${params}`);
    if (!res.ok) throw new Error(`SerpApi ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const json = (await res.json()) as { error?: string; related_queries?: { rising?: SerpRow[]; top?: SerpRow[] } };
    if (json.error && !json.related_queries) {
      if (/hasn't returned any results/i.test(json.error)) return [];
      throw new Error(`SerpApi: ${json.error}`);
    }
    const out: RelatedQuery[] = [];
    for (const kind of ["rising", "top"] as const) {
      for (const r of json.related_queries?.[kind] ?? []) {
        const breakout = /breakout/i.test(r.value ?? "");
        out.push({ seed, query: r.query, kind, value: breakout ? 5000 : r.extracted_value ?? 0, breakout, geo, window });
      }
    }
    return out;
  }
}
