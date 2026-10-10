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

/** Canonical URLs always end with a slash to match `trailingSlash: true`. */
export function canonical(path: string): string {
  const p = path === "/" ? "/" : path.replace(/\/?$/, "/");
  return abs(p);
}

export function buildMetadata(o: Opts): Metadata {
  const url = canonical(o.path);
  const image = ogUrl(o.title, o.ogLabel);
  return {
    title: { absolute: o.title },
    description: o.description,
    alternates: { canonical: url, languages: { "en-IN": url, "x-default": url } },
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
