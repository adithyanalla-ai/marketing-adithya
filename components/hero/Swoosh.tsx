/** Hand-drawn underline. Animated with CSS (see .swoosh in globals.css), so no JS is needed for it. */
export function Swoosh() {
  return (
    <svg className="swoosh pointer-events-none absolute -bottom-[0.28em] left-0 w-full" viewBox="0 0 220 18" preserveAspectRatio="none" aria-hidden="true" height="14" fill="none">
      <path d="M3 12.5C38 5 92 3.5 148 6.2c27 1.3 49 3.2 69 4.6" pathLength={1} stroke="#1D5CFF" strokeWidth="5" strokeLinecap="round" />
      <path d="M30 16c34-4.2 74-5.4 118-3.2" pathLength={1} stroke="#1D5CFF" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
