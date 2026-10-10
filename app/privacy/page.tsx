import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { CONTACT } from "@/content/contact";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = metaFromMap("/privacy/", "Privacy");

const UPDATED = "10 October 2026";

export default function Privacy() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy", path: "/privacy/" }]} eyebrow="Legal" title="Privacy policy" pills={null}
        intro={`How marketing.adithyareddy.online handles your information. Last updated ${UPDATED}.`} />
      <section className="container-x pb-12">
        <div className="prose prose-slate">
          <h2>Who is responsible</h2>
          <p>This site is run by Adithya Reddy, a marketing consultant in Hyderabad, Telangana, India. You can reach me at {CONTACT.phoneDisplay}{CONTACT.email ? ` or ${CONTACT.email}` : ""}.</p>

          <h2>Information I collect</h2>
          <ul>
            <li><strong>Contact form:</strong> your name, email address, company (optional), budget range and the message you write.</li>
            <li><strong>Technical data:</strong> your IP address is used briefly to limit repeated form submissions, and standard server logs are kept by the hosting provider.</li>
            <li><strong>Analytics:</strong> if Google Analytics is switched on, it records pages viewed and events such as form submissions and clicks on contact buttons.</li>
          </ul>

          <h2>How I use it</h2>
          <p>Your form details are used only to reply to your enquiry. I do not sell them or use them to build advertising profiles.</p>

          <h2>Notifications and who receives your details</h2>
          <p>When you send the form, I am notified by <strong>WhatsApp</strong> message and by <strong>email</strong>, so I do not miss your enquiry. That means your details pass through these services:</p>
          <ul>
            <li><strong>WhatsApp (Meta)</strong> or another WhatsApp messaging provider, which delivers the notification to me. The WhatsApp notice contains a shortened version of your message.</li>
            <li><strong>Resend</strong>, which delivers the email containing your full message.</li>
            <li><strong>Vercel</strong>, which hosts the website.</li>
            <li><strong>Google Analytics</strong>, if enabled, for the analytics described above.</li>
          </ul>

          <h2>Cookies</h2>
          <p>The site itself does not use advertising cookies. If Google Analytics is enabled, it may set analytics cookies in your browser to count visits and events. You can block or delete cookies in your browser settings.</p>

          <h2>How long I keep your details</h2>
          <p>I keep enquiries only as long as needed to reply and for ordinary business records. You can ask me to delete yours at any time.</p>

          <h2>Your choices</h2>
          <p>You can ask to see, correct or delete the information I hold about you, or to stop being contacted, by writing to me using the details above.</p>

          <h2>Children</h2>
          <p>This site is aimed at businesses and is not intended for children.</p>

          <h2>Changes</h2>
          <p>If this policy changes, the date at the top of the page will change.</p>
        </div>
      </section>
      <CTABand />
    </>
  );
}
