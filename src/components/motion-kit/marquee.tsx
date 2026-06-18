"use client";

import type { CSSProperties, ReactNode } from "react";

/** Infinite horizontal marquee — logos, service names, testimonials. */
export function Marquee({
  children,
  speed = 30,
  gap = "2.5rem",
  reverse = false,
  pauseOnHover = true,
  className = "",
}: {
  children: ReactNode;
  /** Seconds per loop — lower is faster. */
  speed?: number;
  gap?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const style = { "--mk-gap": gap, "--mk-duration": `${speed}s` } as CSSProperties;
  const track = `mk-marquee-track${reverse ? " mk-reverse" : ""}`;
  return (
    <div
      className={`mk-marquee ${pauseOnHover ? "mk-marquee-pause" : ""} ${className}`}
      style={style}
    >
      <div className={track}>{children}</div>
      <div className={track} aria-hidden>
        {children}
      </div>
    </div>
  );
}
