import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { IconChip } from "@/components/ui/IconChip";
import { ContactForm } from "@/components/ContactForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABand } from "@/components/sections/CTABand";
import type { IconName } from "@/components/ui/iconMap";

export const metadata: Metadata = metaFromMap("/contact/", "Contact");

const FAQS = [
  { q: "What happens after I send a message?", a: "I read every message personally and reply by email. If it looks like a fit, we set up a short call to go through your goals and numbers." },
  { q: "What should I prepare for a call?", a: "Your main goal, what you currently spend and get from marketing, and any reports or dashboards you already have. Rough numbers are fine." },
  { q: "Do you only work with businesses in Hyderabad?", a: "No. I am based in Hyderabad, Telangana, and work with businesses and institutions across India, in person or remotely." },
  { q: "Is the budget field a commitment?", a: "No. It only helps me suggest a realistic approach. Choose 'Not sure yet' if you prefer." },
];

type Opt = { icon: IconName; title: string; text: string; href?: string; external?: boolean };

export default function Contact() {
  const opts: Opt[] = [
    SITE.email ? { icon: "mail", title: "Email", text: SITE.email, href: `mailto:${SITE.email}` } : null,
    SITE.whatsapp ? { icon: "chat", title: "WhatsApp", text: "Message me on WhatsApp", href: SITE.whatsapp, external: true } : null,
    SITE.linkedin ? { icon: "linkedin", title: "LinkedIn", text: "Connect on LinkedIn", href: SITE.linkedin, external: true } : null,
    SITE.bookingUrl.startsWith("http") ? { icon: "calendar", title: "Book a call", text: "Pick a time that suits you", href: SITE.bookingUrl, external: true } : null,
  ].filter(Boolean) as Opt[];

  return (
    <>
      <PageHero crumbs={[{ name: "Contact", path: "/contact/" }]} eyebrow="Get in touch" title="Contact"
        intro="Tell me what you are trying to achieve and where your numbers are today. I am based in Hyderabad, Telangana, and work with teams across India." />
      <section aria-label="Contact" className="container-x grid gap-6 pb-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <ContactForm />
        <div className="space-y-4">
          <h2 className="text-xl">Prefer to reach out directly?</h2>
          {opts.length === 0 && <p className="text-slate">Direct contact details are being added. The form on this page reaches me.</p>}
          <ul className="space-y-3">
            {opts.map((o) => (
              <li key={o.title}>
                <a href={o.href} {...(o.external ? { target: "_blank", rel: "noopener" } : {})} className="card card-lift flex items-center gap-4 p-4">
                  <IconChip name={o.icon} />
                  <span><span className="block font-display font-extrabold">{o.title}</span><span className="text-sm text-slate">{o.text}</span></span>
                </a>
              </li>
            ))}
          </ul>
          {/* Booking embed placeholder: replace with the scheduler iframe once a provider is chosen. */}
          <div className="card flex min-h-40 items-center justify-center border-dashed p-6 text-center text-sm text-slate">Booking calendar will appear here.</div>
          <p className="text-sm text-slate">I read every message personally and reply by email.</p>
        </div>
      </section>
      <FaqSection items={FAQS} />
      <CTABand />
    </>
  );
}
