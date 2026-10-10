"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroDashboard = dynamic(() => import("./HeroDashboard"), { ssr: false });

/** Reserves the illustration's space, then loads Framer Motion after the page is idle so it never competes with the H1. */
export function HeroDashboardLazy() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const start = () => (w.requestIdleCallback ? w.requestIdleCallback(() => setOn(true), { timeout: 1500 }) : setTimeout(() => setOn(true), 600));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }, []);
  return (
    <div className="relative mx-auto w-full max-w-[660px] aspect-[660/640] max-sm:aspect-auto max-sm:h-[500px]" aria-hidden="true">
      {on && <HeroDashboard />}
    </div>
  );
}
