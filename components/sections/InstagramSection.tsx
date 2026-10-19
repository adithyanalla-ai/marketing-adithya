import { CameraIcon } from "../icons";
import { SectionHeader } from "../ui/SectionHeader";
import { InstagramMarquee } from "./InstagramMarquee";
import { INSTAGRAM } from "@/content/instagram";

export function InstagramSection() {
  return (
    <section aria-labelledby="ig-h" className="py-12">
      <div className="container-x">
        <SectionHeader align="center" eyebrow="Instagram" id="ig-h" title={`Follow ${INSTAGRAM.handle}`}
          description="Short, practical posts on marketing, lead generation and AI. Tap any post to open the profile on Instagram." />
        <div className="mt-8"><InstagramMarquee /></div>
        <p className="mt-8 text-center">
          <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <CameraIcon width={18} height={18} /> Follow on Instagram
          </a>
        </p>
      </div>
    </section>
  );
}
