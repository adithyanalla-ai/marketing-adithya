import { SITE, abs } from "./site";
import type { Post, FaqItem } from "./blog";
import { canonical } from "./seo";
import { CASE_STUDIES } from "../content/case-studies";
import { CONTACT } from "../content/contact";

const sameAs = () => [SITE.linkedin, SITE.portfolio, SITE.ssrn, SITE.hackerrank].filter(Boolean);

export const personLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.name,
  url: abs("/"),
  jobTitle: "Growth and Performance Marketer",
  telephone: SITE.telephone,
  image: abs("/adithya.jpg"),
  alumniOf: { "@type": "CollegeOrUniversity", name: "KL University" },
  knowsLanguage: ["English", "Telugu", "Hindi"],
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  knowsAbout: ["Growth marketing", "Lead generation", "Meta ads", "Performance marketing", "Marketing analytics", "Power BI", "LLM automation", "LangChain", "Claude API", "Admissions marketing", "Election campaign marketing"],
  // worksFor appears only when an employer has been made public (permission.clientNamePublic)
  ...(() => {
    const emp = CASE_STUDIES.find((c) => c.kind === "employer" && c.permission.clientNamePublic);
    return emp ? { worksFor: { "@type": "Organization", name: emp.clientName } } : {};
  })(),
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
  logo: abs("/brand/logo-full-640.webp"),
  founder: { "@id": `${SITE.url}/#person` },
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  serviceType: ["Growth marketing consulting", "AI lead generation", "Meta ads and performance marketing", "Marketing analytics and Power BI", "LLM reporting automation", "Admissions marketing", "Election campaign marketing"],
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "AdministrativeArea", name: "Telangana" },
    { "@type": "Country", name: "India" },
  ],
  telephone: SITE.telephone,
  ...(SITE.email ? { email: SITE.email } : {}),
  sameAs: sameAs(),
});

/** Ties marketing.adithyareddy.online to the portfolio at adithyareddy.online. */
export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#org`,
  name: "Adithya Reddy Marketing",
  url: abs("/"),
  logo: abs("/brand/logo-full-640.webp"),
  founder: { "@id": `${SITE.url}/#person` },
  sameAs: [...sameAs(), CONTACT.instagramUrl],
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

export const blogPostingLd = (p: Post, section: "blog" | "guides" = "blog") => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: p.title,
  description: p.description,
  datePublished: p.date,
  dateModified: p.updated,
  mainEntityOfPage: canonical(`/${section}/${p.slug}`),
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
