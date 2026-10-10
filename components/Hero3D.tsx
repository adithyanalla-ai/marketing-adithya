"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Mounts the 3D scene only after the page is idle, on larger screens, and when motion is allowed. */
export function Hero3D() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const ok =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const start = () => setOn(true);
    if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 3000 });
    else setTimeout(start, 2000);
  }, []);
  return (
    <div className="hidden h-[360px] w-full md:block" aria-hidden="true">
      {on && <HeroScene />}
    </div>
  );
}
