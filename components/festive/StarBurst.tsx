import type { CSSProperties } from "react";

/** Small decorative gold star used by the celebration theme. */
export function StarBurst({ size = 24, className = "", style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} style={style}>
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z" fill="#F4B73F" />
    </svg>
  );
}
