"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Server renders the final value; on the client it counts up once when scrolled into view (static under reduced motion). */
export function StatCountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    if (!inView || reduced) return;
    const c = animate(0, value, { duration: 1.4, ease: "easeOut", onUpdate: (x) => setN(Math.round(x)) });
    return () => c.stop();
  }, [inView, reduced, value]);
  return <span ref={ref}>{(n ?? value).toLocaleString("en-IN")}{suffix}</span>;
}
