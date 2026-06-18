"use client";

/**
 * Soft drifting color blobs behind content — premium hero backgrounds.
 * Parent must be `relative`.
 */
export function AnimatedGradient({
  colors = ["#818cf8", "#f472b6", "#fbbf24"],
  blur = 90,
  opacity = 0.5,
  className = "",
}: {
  colors?: string[];
  blur?: number;
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {colors.slice(0, 3).map((color, i) => (
        <div
          key={`${color}-${i}`}
          className={`mk-blob mk-blob-${i + 1}`}
          style={{ background: color, filter: `blur(${blur}px)`, opacity }}
        />
      ))}
    </div>
  );
}
