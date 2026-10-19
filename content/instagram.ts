import { CONTACT } from "./contact";

/** Instagram posts shown in the scrolling strip. Every post links to the profile. */
export const INSTAGRAM = {
  url: CONTACT.instagramUrl,
  handle: CONTACT.instagramHandle,
  posts: [
    {
      src: "/instagram/diwali-campaign-timeline.webp",
      alt: "Instagram post from adios.marketing: Your Diwali campaign is already late. A four-week timeline from Navratri through build momentum and scale offers to Diwali, with advice to push offers around Dhanteras and Diwali and follow up every lead.",
    },
    {
      src: "/instagram/meta-leads-qualified-vs-cheap.webp",
      alt: "Instagram post from adios.marketing: Meta's AI will find you more leads, not better ones. A short two-field form labelled cheap lead beside a longer form with budget and timeline questions labelled qualified lead, plus three steps: add a qualifying question, connect your CRM, track which leads became sales.",
    },
    {
      src: "/instagram/hashtags-alone-wont-get-found.webp",
      alt: "Instagram post from adios.marketing: Hashtags alone won't get you found. A phone mockup shows how Instagram reads the caption, the text on the image and the alt text, so posts should say what they are about in plain words.",
    },
    {
      src: "/instagram/search-didnt-die-it-multiplied.webp",
      alt: "Instagram post from adios.marketing: Search didn't die, it multiplied. Buyers discover brands across Google, TikTok, YouTube, Reddit and ChatGPT, with survey figures cited from GWI Core (2026), and the message that the new SEO is about being discoverable everywhere.",
    },
    {
      src: "/instagram/one-buyer-four-platforms.webp",
      alt: "Instagram post from adios.marketing: One buyer, four platforms, one decision. An illustrative buyer journey from discovering on TikTok, researching on Google and verifying on Reddit to asking ChatGPT before buying, ending with the message that trust drives decisions.",
    },
  ],
} as const;
