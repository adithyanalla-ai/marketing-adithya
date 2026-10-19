"use client";
import Image from "next/image";
import { useState } from "react";
import { CameraIcon } from "../icons";
import { track } from "@/lib/analytics";
import { INSTAGRAM } from "@/content/instagram";

/**
 * Auto-scrolling strip of Instagram posts. Every post opens the Instagram profile in a new tab.
 * Pauses on hover and keyboard focus, has a pause button (WCAG 2.2.2), and is a normal swipeable row under reduced motion.
 */
export function InstagramMarquee() {
  const [hover, setHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const { posts, url, handle } = INSTAGRAM;
  const running = !(hover || paused);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className="rounded-full border border-card-line bg-white px-4 py-2 text-sm font-semibold hover:border-brand">
          {paused ? "Play scrolling" : "Pause scrolling"}
        </button>
      </div>
      <div
        role="region"
        aria-label={`Instagram posts from ${handle}`}
        className="ig-viewport relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocusCapture={() => setHover(true)}
        onBlurCapture={() => setHover(false)}
      >
        <ul className="ig-track flex w-max" style={{ animationPlayState: running ? "running" : "paused" }}>
          {[...posts, ...posts].map((p, i) => {
            const dup = i >= posts.length;
            return (
              <li key={`${p.src}-${i}`} className={`w-[220px] shrink-0 pr-5 sm:w-[260px] lg:w-[280px] ${dup ? "ig-dup" : ""}`} aria-hidden={dup || undefined}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={dup ? -1 : 0}
                  onClick={() => track("outbound_click", { label: `instagram_post_${(i % posts.length) + 1}` })}
                  className="card card-lift group relative block overflow-hidden !rounded-2xl"
                >
                  <Image src={p.src} alt={dup ? "" : p.alt} width={1080} height={1350} sizes="(min-width: 1024px) 280px, (min-width: 640px) 260px, 220px" className="h-auto w-full" />
                  {!dup && <span className="sr-only"> Opens {handle} on Instagram in a new tab.</span>}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-3 pt-10 text-sm font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <CameraIcon width={16} height={16} /> View on Instagram
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
