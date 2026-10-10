export type Geo = "IN" | "WW";
export type Window = "7d" | "90d";

export type RelatedQuery = {
  seed: string;
  query: string;
  kind: "rising" | "top";
  /** rising: percent growth (5000 for "Breakout"); top: relative interest 0-100 */
  value: number;
  breakout: boolean;
  geo: Geo;
  window: Window;
};

export interface TrendsProvider {
  name: string;
  fetchRelated(seed: string, geo: Geo, window: Window): Promise<RelatedQuery[]>;
}

export type Intent = "informational" | "commercial" | "transactional" | "navigational";

export type ScoredTopic = {
  rank: number;
  query: string;
  suggestedTitle: string;
  primaryKeyword: string;
  searchIntent: Intent;
  angle: string;
  service: { slug: string; name: string } | null;
  category: string;
  score: number;
  components: { velocity: number; interest: number; relevance: number; novelty: number };
  evidence: { seed: string; kind: string; geo: Geo; window: Window; value: number; breakout: boolean }[];
};

export type Source = { title: string; url: string };

export type Brief = {
  title: string;
  description: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  tags: string[];
  searchIntent: string;
  angle: string;
  outline: { heading: string; points: string[] }[];
  faqs: { q: string; a_hint: string }[];
  internalLinks: { text: string; path: string }[];
  originalValue: string;
  targetWords: number;
};
