import { SITE, abs } from "./site";
import type { Post, FaqItem } from "./blog";
import { canonical } from "./seo";

const sameAs = () => [SITE.linkedin, SITE.portfolio].filter(Boolean);

export const personLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.name,
  url: abs("/"),
  jobTitle: "Growth and Performance Marketer",
  image: abs("/adithya.jpg"),
  alumniOf: { "@type": "CollegeOrUniversity", name: "KL University" },
  knowsLanguage: ["English", "Telugu", "Hindi"],
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  knowsAbout: ["Lead generation", "Meta ads", "Performance marketing", "Marketing analytics", "Power BI", "LLM automation"],
  sameAs: sameAs(),
});

export const professionalServiceLd = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#service`,
  name: `${SITE.name} Marketing`,
  url: abs("/"),
  description: SITE.description,
  image: abs("/og/?title=Adithya%20Reddy"),
  founder: { "@id": `${SITE.url}/#person` },
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "AdministrativeArea", name: "Telangana" },
    { "@type": "Country", name: "India" },
  ],
  ...(SITE.email ? { email: SITE.email } : {}),
  sameAs: sameAs(),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: abs("/"),
  name: SITE.name,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE.url}/#person` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/blog/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: canonical(it.path),
  })),
});

export const blogPostingLd = (p: Post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: p.title,
  description: p.description,
  datePublished: p.date,
  dateModified: p.updated,
  mainEntityOfPage: canonical(`/blog/${p.slug}`),
  image: [abs(`/og/?title=${encodeURIComponent(p.title)}&label=Blog`)],
  author: { "@type": "Person", name: p.author, url: abs("/about/") },
  publisher: { "@id": `${SITE.url}/#person` },
  articleSection: p.category,
  keywords: [p.primaryKeyword, ...p.secondaryKeywords].filter(Boolean).join(", "),
  inLanguage: "en-IN",
  ...(p.sources.length ? { citation: p.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })) } : {}),
});

export const faqLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
});
