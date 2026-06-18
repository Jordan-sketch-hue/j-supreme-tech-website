"use client";

import type { CSSProperties } from "react";

/**
 * Animated light that orbits the parent border.
 * Parent must be `relative` and have a border-radius.
 */
export function BorderBeam({
  color = "#111111",
  duration = 6,
  thickness = 1.5,
  className = "",
}: {
  color?: string;
  duration?: number;
  thickness?: number;
  className?: string;
}) {
  const style = {
    "--mk-beam-color": color,
    "--mk-beam-duration": `${duration}s`,
    padding: thickness,
  } as CSSProperties;
  return <span aria-hidden className={`mk-border-beam ${className}`} style={style} />;
}
