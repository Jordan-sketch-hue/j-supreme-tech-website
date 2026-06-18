"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Lenis buttery smooth scrolling. Wrap a page (or the root layout body)
 * to upgrade native scroll. Lower lerp = smoother / floatier.
 */
export function SmoothScroll({
  children,
  lerp = 0.12,
}: {
  children: ReactNode;
  lerp?: number;
}) {
  return (
    <ReactLenis root options={{ lerp }}>
      {children}
    </ReactLenis>
  );
}
