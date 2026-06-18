/* Movie-title text: splits a string into words that rise out of a blur with
   a staggered cadence (cn-word in cinematic.css). Server-safe — no hooks. */
import type { CSSProperties } from "react";

export function CineWords({
  text,
  delay = 0,
  step = 0.07,
  className,
}: {
  text: string;
  /** Seconds before the first word lands. */
  delay?: number;
  /** Stagger between words, in seconds. */
  step?: number;
  className?: string;
}) {
  const words = text.split(" ").filter(Boolean);
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="cn-word" style={{ "--cn-d": `${delay + i * step}s` } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
