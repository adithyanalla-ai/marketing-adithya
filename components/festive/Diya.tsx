import type { CSSProperties } from "react";

/** Decorative diya (oil lamp) with a gently flickering flame. */
export function Diya({ size = 48, className = "", style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={Math.round(size * 0.9)} viewBox="0 0 60 54" aria-hidden="true" className={className} style={style} fill="none">
      <defs>
        <radialGradient id="diya-glow" cx="50%" cy="40%" r="50%"><stop offset="0" stopColor="#FFD36B" stopOpacity=".75" /><stop offset="1" stopColor="#FFD36B" stopOpacity="0" /></radialGradient>
        <linearGradient id="diya-bowl" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#F4B73F" /><stop offset="1" stopColor="#B7791F" /></linearGradient>
        <linearGradient id="diya-flame" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#FFF3B0" /><stop offset=".55" stopColor="#FFB020" /><stop offset="1" stopColor="#F26B1D" /></linearGradient>
      </defs>
      <circle cx="30" cy="16" r="16" fill="url(#diya-glow)" />
      <path className="diya-flame" d="M30 3c4 5 6 8 6 12a6 6 0 0 1-12 0c0-3 2-5 3-8 1 2 2 3 3 3-1-3-1-5 0-7Z" fill="url(#diya-flame)" />
      <path d="M6 26h48c0 12-10 22-24 22S6 38 6 26Z" fill="url(#diya-bowl)" />
      <path d="M6 26h48" stroke="#8A5A00" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17 34c4 5 10 7 13 7s9-2 13-7" stroke="#FFE3A0" strokeOpacity=".7" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="30" cy="44" r="1.6" fill="#FFE3A0" fillOpacity=".8" />
    </svg>
  );
}
