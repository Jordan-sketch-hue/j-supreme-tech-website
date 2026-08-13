"use client";

import { useEffect, useRef, useState } from "react";

type LazyReelProps = {
  src: string;
  poster?: string;
  /** Classes for the wrapper — pass the aspect-ratio / rounding / overflow here. */
  className?: string;
};

/**
 * A reel that costs nothing until you actually engage with it.
 *
 * - Default: only the poster still is painted — no <video>, no network, no decode.
 * - Desktop (hover-capable): the clip loads + plays on hover, pauses + resets on leave.
 *   So at most one reel ever decodes at a time → the grid stays buttery.
 * - Touch (no hover): falls back to play-when-centered via IntersectionObserver,
 *   since there's no hover on a phone.
 */
export function LazyReel({ src, poster, className }: LazyReelProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverCapable = useRef(false);
  const [activated, setActivated] = useState(false); // mount <video> (starts loading)
  const [playing, setPlaying] = useState(false); // desired play state
  const [ready, setReady] = useState(false); // first frame decoded → cross-fade poster out

  // Decide the interaction model once, and wire up the touch observer if needed.
  useEffect(() => {
    const hover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    hoverCapable.current = hover;

    const el = wrapRef.current;
    if (!el || hover) return; // hover devices drive play via pointer handlers below

    if (typeof IntersectionObserver === "undefined") {
      setActivated(true);
      setPlaying(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivated(true);
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      },
      { threshold: 0.5 }, // play once the card is meaningfully on screen
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reflect the desired play state onto the actual element (runs after it mounts).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing, activated]);

  const handleEnter = () => {
    if (!hoverCapable.current) return;
    setActivated(true);
    setPlaying(true);
  };

  const handleLeave = () => {
    if (!hoverCapable.current) return;
    setPlaying(false);
    setReady(false); // fade the poster back in for a clean re-hover
    const v = videoRef.current;
    if (v) {
      try {
        v.currentTime = 0;
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <div
      ref={wrapRef}
      className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
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
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Play affordance — hides while playing so the reel reads as interactive. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-2.5 left-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm transition-opacity duration-300 ${
          playing && ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="white" className="h-3.5 w-3.5 translate-x-[1px]">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </div>
  );
}
