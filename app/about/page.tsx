import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { personLd } from "@/lib/jsonld";
import { CtaBanner } from "@/components/CtaBanner";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About Adithya Reddy | Marketer in Hyderabad",
  description: "Adithya Reddy is a growth and performance marketer in Hyderabad, India, combining paid media, analytics and LLM automation.",
  path: "/about/",
});

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={personLd()} />
      <Breadcrumbs items={[{ name: "About", path: "/about/" }]} />
      <h1 className="mt-6 text-4xl font-semibold">About Adithya Reddy</h1>
      <div className="prose mt-6">
        <p>
          I am a growth and performance marketer based in Hyderabad, Telangana. I work across lead generation,
          Meta ads, marketing analytics in Power BI, and LLM automation with LangChain and the Claude API.
        </p>
        <h2>What I focus on</h2>
        <ul>
          <li>Segmented and scored lead pipelines</li>
          <li>Meta ads A/B testing, which reduced cost per lead by 20%</li>
          <li>LLM-based reporting automation, which cut client report delivery from 3 days to 4 hours</li>
        </ul>
        {/* TODO(Adithya): add employers, roles, education and certifications from your resume. */}
        <h2>Connect</h2>
        <p>
          {SITE.linkedin && <><a href={SITE.linkedin} rel="me noopener">LinkedIn</a> · </>}
          <a href={SITE.portfolio} rel="me noopener">Portfolio</a>
        </p>
      </div>
      <div className="mt-12"><CtaBanner /></div>
    </div>
  );
}
