import type { Metadata } from "next";
import { metaFromMap } from "@/lib/seo-map";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = metaFromMap("/services/", "Services");

const FAQS = [
  { q: "Which service should I start with?", a: "It depends on where your bottleneck is. If enquiries are weak, start with Meta ads or lead generation. If you have enquiries but poor follow-up, start with the lead pipeline. A first call is the quickest way to decide." },
  { q: "Where are you based and who do you work with?", a: "I am based in Hyderabad, Telangana, and work with businesses, institutions and campaigns across India, in person or remotely." },
  { q: "Can services be combined?", a: "Yes. They fit together: Meta ads bring leads, the pipeline scores and routes them, analytics shows what is working and LLM automation handles the reporting." },
  { q: "How do you measure success?", a: "We agree the metrics up front, usually cost per lead, lead quality and conversion, and report on them regularly." },
  { q: "Do you use AI in every project?", a: "Only where it helps. Automation and LLMs are used for repeatable work such as reporting and follow-up, with a person reviewing the output." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services/" }]}
        eyebrow="What I do"
        title="Services"
        intro="Data-driven marketing and automation solutions to help you generate, nurture and convert high-quality enquiries into measurable business growth. Based in Hyderabad, Telangana, working with clients across India."
      />
      <ServicesGrid showHeader={false} id="all-services" />
      <ProcessSteps />
      <FaqSection items={FAQS} />
      <CTABand />
    </>
  );
}
