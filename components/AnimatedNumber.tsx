"use client";
import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Eases between values when inputs change. Static under reduced motion. */
export function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (reduced || !isFinite(value) || !isFinite(prev.current)) { setShown(value); prev.current = value; return; }
    const c = animate(prev.current, value, { duration: 0.5, ease: "easeOut", onUpdate: setShown });
    prev.current = value;
    return () => c.stop();
  }, [value, reduced]);
  return <>{format(shown)}</>;
}
