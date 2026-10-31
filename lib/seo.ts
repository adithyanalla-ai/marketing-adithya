import type { Metadata } from "next";
import { SITE, abs } from "./site";

type Opts = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  ogLabel?: string;
};

export function ogUrl(title: string, label = "Adithya Reddy"): string {
  return abs(`/og/?title=${encodeURIComponent(title)}&label=${encodeURIComponent(label)}`);
}

/**
 * Pages whose content overlaps a page on the main site (www.adithyareddy.online). Their canonical
 * points there so the two sites don't compete for the same queries. Everything else on this
 * site (services, case studies, guides, tools, blog) stays self-canonical.
 * Keys are this site's paths (trailing slash); values are absolute www URLs.
 */
export const CROSS_DOMAIN_CANONICAL: Record<string, string> = {
  "/": `${SITE.portfolio}/marketing`,
  "/hyderabad-growth-marketing-consultant/": `${SITE.portfolio}/marketing`,
  "/about/": `${SITE.portfolio}/about`,
};

/** Canonical URLs always end with a slash to match `trailingSlash: true`. */
export function canonical(path: string): string {
  const p = path === "/" ? "/" : path.replace(/\/?$/, "/");
  return abs(p);
}

export function buildMetadata(o: Opts): Metadata {
  const self = canonical(o.path);
  const cross = CROSS_DOMAIN_CANONICAL[new URL(self).pathname];
  const url = cross ?? self;
  const image = ogUrl(o.title, o.ogLabel);
  return {
    title: { absolute: o.title },
    description: o.description,
    alternates: cross ? { canonical: cross } : { canonical: url, languages: { "en-IN": url, "x-default": url } },
    openGraph: {
      type: o.type ?? "website",
      url,
      title: o.title,
      description: o.description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: image, width: 1200, height: 630, alt: o.title }],
      ...(o.type === "article"
        ? { publishedTime: o.publishedTime, modifiedTime: o.modifiedTime, authors: [SITE.name], tags: o.tags }
        : {}),
    },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, images: [image] },
  };
}
