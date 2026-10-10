import type { Geo, RelatedQuery, TrendsProvider, Window } from "../types";

/** Deterministic MOCK data for dry runs. These numbers are not real Google Trends data. */
const DATA: Record<string, { rising: [string, number][]; top: [string, number][] }> = {
  "growth marketing": { rising: [["growth marketing framework", 250], ["growth marketing vs performance marketing", 120]], top: [["growth marketing strategy", 100], ["growth marketing course", 62]] },
  "lead generation": { rising: [["ai lead generation tools", 450], ["lead scoring model template", 180]], top: [["lead generation strategies", 100], ["lead generation companies", 70]] },
  "AI marketing automation": { rising: [["ai marketing automation workflow", 5000], ["marketing automation with claude", 350]], top: [["ai marketing automation tools", 100], ["marketing automation software", 80]] },
  "Meta ads": { rising: [["meta ads a/b testing", 300], ["meta ads cost per lead benchmark", 150], ["meta ads manager login", 400]], top: [["meta ads manager", 100], ["meta ads for lead generation", 58]] },
  "performance marketing": { rising: [["performance marketing agency hyderabad", 220], ["performance marketing metrics", 140]], top: [["performance marketing strategy", 100], ["performance marketing jobs", 75]] },
  "Power BI dashboards": { rising: [["power bi marketing dashboard template", 260], ["power bi dashboard for ad spend", 110]], top: [["power bi dashboard examples", 100], ["power bi dashboard design", 64]] },
  "LLM automation": { rising: [["llm automation for marketing reports", 380], ["llm agents for marketing", 190]], top: [["llm automation tools", 100], ["llm workflow automation", 60]] },
  LangChain: { rising: [["langchain marketing use cases", 210], ["langchain agent tutorial", 130]], top: [["langchain tutorial", 100], ["langchain vs llamaindex", 55]] },
  "Claude API": { rising: [["claude api web search tool", 500], ["claude api for marketing automation", 240]], top: [["claude api pricing", 100], ["claude api python", 66]] },
  "admissions marketing": { rising: [["college admissions marketing strategy india", 170], ["admission enquiry lead follow up", 90]], top: [["admissions marketing ideas", 100], ["education marketing", 70]] },
  "election campaign marketing": { rising: [["election campaign digital marketing india", 280], ["voter outreach strategy", 100]], top: [["political campaign marketing", 100], ["election campaign strategy", 77]] },
  "marketing analytics": { rising: [["marketing analytics dashboard kpis", 200], ["marketing attribution models explained", 120]], top: [["marketing analytics tools", 100], ["marketing analytics course", 68]] },
};

export class MockProvider implements TrendsProvider {
  name = "mock";
  async fetchRelated(seed: string, geo: Geo, window: Window): Promise<RelatedQuery[]> {
    const d = DATA[seed] ?? { rising: [], top: [] };
    const g = geo === "WW" ? 0.8 : 1;
    const w = window === "7d" ? 1.5 : 1;
    const out: RelatedQuery[] = [];
    for (const [query, v] of d.rising) {
      const value = v >= 5000 ? 5000 : Math.round(v * g * w);
      out.push({ seed, query, kind: "rising", value, breakout: v >= 5000, geo, window });
    }
    for (const [query, v] of d.top) out.push({ seed, query, kind: "top", value: Math.round(v * g), breakout: false, geo, window });
    return out;
  }
}
