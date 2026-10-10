import type { Metadata } from "next";
import { buildMetadata } from "./seo";
import { entryFor } from "../content/seo/keyword-map";

/** Metadata for a static page, taken from content/seo/keyword-map.ts. */
export function metaFromMap(url: string, ogLabel?: string): Metadata {
  const e = entryFor(url);
  if (!e || !e.title || !e.description) throw new Error(`keyword-map: missing title/description for ${url}`);
  return buildMetadata({ title: e.title, description: e.description, path: url, ogLabel });
}
