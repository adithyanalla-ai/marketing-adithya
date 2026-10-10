/** Formspree form endpoint. It is a public endpoint (visible in the page source), not a secret. Submissions are viewed in the Formspree dashboard. */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvkzrrrl";

/** Single source of truth for contact details (phone, WhatsApp, LinkedIn). Email comes from the environment. */
const WA_TEXT = "Hi Adithya, I found your website and would like to discuss growth marketing";

export const CONTACT = {
  phoneDisplay: "+91 87125 69303",
  phoneTel: "tel:+918712569303",
  phoneSchema: "+91-8712569303",
  whatsappNumber: "918712569303",
  whatsappUrl: `https://wa.me/918712569303?text=${encodeURIComponent(WA_TEXT)}`,
  linkedinUrl: "https://www.linkedin.com/in/adithyareddy-ai",
  linkedinLabel: "linkedin.com/in/adithyareddy-ai",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  responseNote: "I read every message personally and reply by email.",
} as const;

/** Budget options shared by the form (client) and the API (server). */
export const BUDGETS = ["Not sure yet", "Under INR 50,000 per month", "INR 50,000 to 2,00,000 per month", "Above INR 2,00,000 per month", "One-off project"] as const;
