import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { SITE } from "@/lib/site";
import { CONTACT } from "@/content/contact";
import { PageHero } from "@/components/ui/PageHero";
import { IconChip } from "@/components/ui/IconChip";
import { ContactForm } from "@/components/ContactForm";
import { TrackedLink } from "@/components/TrackedLink";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABand } from "@/components/sections/CTABand";
import { ChatIcon } from "@/components/icons";
import type { IconName } from "@/components/ui/iconMap";

export const metadata: Metadata = metaFromMap("/contact/", "Contact");

const FAQS = [
  { q: "What happens after I send a message?", a: "I read every message personally and reply by email. If it looks like a fit, we set up a short call to go through your goals and numbers." },
  { q: "What should I prepare for a call?", a: "Your main goal, what you currently spend and get from marketing, and any reports or dashboards you already have. Rough numbers are fine." },
  { q: "Do you only work with businesses in Hyderabad?", a: "No. I am based in Hyderabad, Telangana, and work with businesses and institutions across India, in person or remotely." },
  { q: "Is the budget field a commitment?", a: "No. It only helps me suggest a realistic approach. Choose 'Not sure yet' if you prefer." },
];

type Opt = { icon: IconName; title: string; text: string; href: string; event: "book_call_click" | "outbound_click"; external?: boolean };

export default function Contact() {
  const opts: Opt[] = [
    { icon: "phone", title: "Phone", text: CONTACT.phoneDisplay, href: CONTACT.phoneTel, event: "book_call_click" },
    ...(CONTACT.email ? [{ icon: "mail" as const, title: "Email", text: CONTACT.email, href: `mailto:${CONTACT.email}`, event: "outbound_click" as const }] : []),
    { icon: "linkedin", title: "LinkedIn", text: CONTACT.linkedinLabel, href: SITE.linkedin, event: "outbound_click", external: true },
    ...(SITE.bookingUrl.startsWith("http") ? [{ icon: "calendar" as const, title: "Book a call", text: "Pick a time that suits you", href: SITE.bookingUrl, event: "book_call_click" as const, external: true }] : []),
  ];

  return (
    <>
      <PageHero crumbs={[{ name: "Contact", path: "/contact/" }]} eyebrow="Get in touch" title="Contact"
        intro="Tell me what you are trying to achieve and where your numbers are today. I am based in Hyderabad, Telangana, and work with teams across India." />
      <section aria-label="Contact" className="container-x grid gap-6 pb-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <ContactForm />
        <div className="space-y-4">
          <h2 className="text-xl">Prefer to reach out directly?</h2>
          <TrackedLink event="book_call_click" label="whatsapp_panel" href={CONTACT.whatsappUrl} target="_blank" rel="noopener" className="btn btn-primary w-full">
            <ChatIcon width={18} height={18} /> Chat on WhatsApp
          </TrackedLink>
          <ul className="space-y-3">
            {opts.map((o) => (
              <li key={o.title}>
                <TrackedLink event={o.event} label={o.title.toLowerCase()} href={o.href} {...(o.external ? { target: "_blank", rel: "noopener" } : {})} className="card card-lift flex items-center gap-4 p-4">
                  <IconChip name={o.icon} />
                  <span><span className="block font-display font-extrabold">{o.title}</span><span className="text-sm text-slate">{o.text}</span></span>
                </TrackedLink>
              </li>
            ))}
          </ul>
          {/* Booking embed placeholder: replace with the scheduler iframe once a provider is chosen. */}
          <div className="card flex min-h-40 items-center justify-center border-dashed p-6 text-center text-sm text-slate">Booking calendar will appear here.</div>
          <p className="text-sm text-slate">{CONTACT.responseNote}</p>
        </div>
      </section>
      <FaqSection items={FAQS} />
      <CTABand />
    </>
  );
}
