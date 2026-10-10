export const SITE = {
  name: "Adithya Reddy",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://marketing.adithyareddy.online").replace(/\/$/, ""),
  title: "Adithya Reddy | Growth & Performance Marketing, Hyderabad",
  description:
    "Adithya Reddy is a growth and performance marketer in Hyderabad, India, working on lead generation, Meta ads, marketing analytics and LLM automation.",
  locale: "en_IN",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  portfolio: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://adithyareddy.online",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "/contact/",
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
  gscVerification: process.env.GOOGLE_SITE_VERIFICATION || "",
  bingVerification: process.env.BING_SITE_VERIFICATION || "",
  address: { locality: "Hyderabad", region: "Telangana", country: "IN" },
  areaServed: ["Hyderabad", "Telangana", "India"],
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function abs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
