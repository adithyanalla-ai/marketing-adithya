import type { Geo, RelatedQuery, TrendsProvider, Window } from "../types";

const INDIA = 2356;
const days = (w: Window) => (w === "7d" ? 7 : 90);
const iso = (d: Date) => d.toISOString().slice(0, 10);

type Row = { query: string; value: number };

/** DataForSEO Google Trends Explore (live). Field mapping follows their docs; verify against a live account. */
export class DataForSeoProvider implements TrendsProvider {
  name = "dataforseo";
  constructor(private login: string, private password: string) {}

  async fetchRelated(seed: string, geo: Geo, window: Window): Promise<RelatedQuery[]> {
    const to = new Date();
    const from = new Date(Date.now() - days(window) * 86400000);
    const body = [{
      keywords: [seed], type: "web", date_from: iso(from), date_to: iso(to),
      item_types: ["google_trends_queries_list"], ...(geo === "IN" ? { location_code: INDIA } : {}),
    }];
    const res = await fetch("https://api.dataforseo.com/v3/keywords_data/google_trends/explore/live", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${this.login}:${this.password}`).toString("base64"),
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`DataForSEO ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const json = (await res.json()) as {
      tasks?: { status_code: number; status_message: string; result?: { items?: { type: string; data?: { top?: Row[]; rising?: Row[] } }[] }[] }[];
    };
    const task = json.tasks?.[0];
    if (!task || task.status_code !== 20000) throw new Error(`DataForSEO: ${task?.status_message ?? "no task"}`);
    const out: RelatedQuery[] = [];
    for (const item of task.result?.[0]?.items ?? []) {
      if (item.type !== "google_trends_queries_list") continue;
      for (const kind of ["rising", "top"] as const) {
        for (const r of item.data?.[kind] ?? []) {
          out.push({ seed, query: r.query, kind, value: r.value, breakout: kind === "rising" && r.value >= 5000, geo, window });
        }
      }
    }
    return out;
  }
}
