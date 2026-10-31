import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const SEARCH = ["Googlebot", "Bingbot"];
const AI = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];
/** Link-preview bots obey robots.txt, so they must still be able to fetch the /og/ share images. */
const SOCIAL = ["Twitterbot", "facebookexternalhit", "LinkedInBot", "Slackbot", "WhatsApp"];

/** The dynamic share-image endpoint (/og/) is kept out of search and AI crawls. */
const PRIVATE = ["/api/", "/og/"];

/** AI search crawlers are allowed unless BLOCK_AI_CRAWLERS=1. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: SEARCH, allow: "/", disallow: PRIVATE },
      SITE.blockAiCrawlers ? { userAgent: AI, disallow: "/" } : { userAgent: AI, allow: "/", disallow: PRIVATE },
      { userAgent: SOCIAL, allow: ["/", "/og/"], disallow: ["/api/"] },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
