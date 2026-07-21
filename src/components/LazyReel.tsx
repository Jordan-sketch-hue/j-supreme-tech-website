"use client";

import { useEffect, useRef, useState } from "react";

type LazyReelProps = {
  src: string;
  poster?: string;
  /** Classes for the wrapper — pass the aspect-ratio / rounding / overflow here. */
  className?: string;
};

/**
 * A reel that costs nothing until it's about to be seen.
 *
 * Why this exists: a plain `<video autoPlay>` forces the browser to download the
 * entire clip on mount — six of them at once saturates the connection and the
 * whole grid feels broken. Here the poster still paints immediately, and the
 * <video> (and therefore the network request) is only mounted once the card is
 * within ~300px of the viewport. Off-screen reels pause so they don't burn CPU.
 */
export function LazyReel({ src, poster, className }: LazyReelProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // `activated` latches true the first time we near the viewport → mount the <video>.
  const [activated, setActivated] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false); // first frame decoded → cross-fade poster out

  // Observe the wrapper; activate on approach, and track in/out of view for play/pause.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // No IntersectionObserver (very old browsers / SSR edge) → just load it.
    if (typeof IntersectionObserver === "undefined") {
      setActivated(true);
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActivated(true);
        setInView(entry.isIntersecting);
      },
      { rootMargin: "300px 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Play only while visible; pause when it scrolls away. Runs after the <video> mounts.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, activated]);

  return (
    <div ref={wrapRef} className={className}>
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      {activated && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setReady(true)}
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
