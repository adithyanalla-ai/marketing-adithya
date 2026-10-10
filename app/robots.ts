import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const SEARCH = ["Googlebot", "Bingbot"];
const AI = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

/** AI search crawlers are allowed unless BLOCK_AI_CRAWLERS=1. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: SEARCH, allow: "/", disallow: ["/api/"] },
      SITE.blockAiCrawlers ? { userAgent: AI, disallow: "/" } : { userAgent: AI, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
