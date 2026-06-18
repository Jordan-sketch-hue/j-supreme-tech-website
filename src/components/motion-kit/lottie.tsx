"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * Plays .lottie / Lottie JSON animations (free library: lottiefiles.com).
 * `src` can be a /public path or a remote URL.
 */
export function Lottie({
  src,
  className,
  loop = true,
  autoplay = true,
  speed = 1,
}: {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}) {
  return (
    <DotLottieReact
      src={src}
      className={className}
      loop={loop}
      autoplay={autoplay}
      speed={speed}
    />
  );
}
