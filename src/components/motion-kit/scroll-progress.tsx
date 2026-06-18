"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin page-scroll progress bar fixed to the top of the viewport. */
export function ScrollProgress({
  className = "bg-zinc-900",
  height = 3,
}: {
  /** Pass a bg-* class to color the bar. */
  className?: string;
  height?: number;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className={`fixed inset-x-0 top-0 z-50 origin-left ${className}`}
      style={{ scaleX, height }}
    />
  );
}
