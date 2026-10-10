import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact Adithya Reddy | Book a Marketing Call",
  description: "Book a call with Adithya Reddy, a growth marketer in Hyderabad, India, to discuss lead generation, Meta ads or LLM automation.",
  path: "/contact/",
});

export default function Contact() {
  const external = SITE.bookingUrl.startsWith("http");
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs items={[{ name: "Contact", path: "/contact/" }]} />
      <h1 className="mt-6 text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-muted">Tell me what you are trying to achieve and where your numbers are today. I am based in Hyderabad and work with teams across India.</p>
      <ul className="mt-8 space-y-3">
        {external && <li><a className="btn btn-primary" href={SITE.bookingUrl}>Book a call</a></li>}
        {SITE.email && <li>Email: <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>}
        {SITE.linkedin && <li><a className="underline" rel="me noopener" href={SITE.linkedin}>Message on LinkedIn</a></li>}
        {!external && !SITE.email && !SITE.linkedin && (
          <li className="text-muted">{/* TODO(Adithya): set NEXT_PUBLIC_BOOKING_URL, NEXT_PUBLIC_CONTACT_EMAIL and NEXT_PUBLIC_LINKEDIN_URL */}Contact details are being added.</li>
        )}
      </ul>
      <section className="mt-12" aria-labelledby="nl-h">
        <h2 id="nl-h" className="text-2xl font-semibold">Get new articles by email</h2>
        <div className="mt-4"><NewsletterForm /></div>
      </section>
    </div>
  );
}
