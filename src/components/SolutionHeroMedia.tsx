"use client";

import { useState, useEffect } from "react";

type MediaEntry =
  | { type: "video"; file: string; poster: string; label: string }
  | { type: "slides"; files: { file: string; label: string }[] };

const MEDIA_MAP: Record<string, MediaEntry> = {
  websites: {
    type: "slides",
    files: [
      { file: "/showcase/thelanguagecradle-com-d.webp", label: "The Language Cradle" },
      { file: "/showcase/bpcouriers-online-d.webp", label: "BP Couriers" },
      { file: "/showcase/ridelink-jamaica-vercel-app-d.webp", label: "RideLink Jamaica" },
    ],
  },
  "web-apps": {
    type: "slides",
    files: [
      { file: "/showcase/jsupremeconglomerate-online-d.webp", label: "J Supreme Conglomerate" },
      { file: "/showcase/the-cleanser-ja-vercel-app-d.webp", label: "The Cleanser JA" },
    ],
  },
  "mobile-apps": {
    type: "video",
    file: "/reels/bp-couriers-reel.mp4",
    poster: "/reels/posters/bp-couriers-reel.jpg",
    label: "BP Couriers App",
  },
  crms: {
    type: "slides",
    files: [
      { file: "/showcase/jsupremeconglomerate-online-d.webp", label: "J Supreme Conglomerate" },
      { file: "/showcase/bpcouriers-online-d.webp", label: "BP Couriers CRM" },
    ],
  },
  ecommerce: {
    type: "slides",
    files: [
      { file: "/showcase/the-cleanser-ja-vercel-app-d.webp", label: "The Cleanser JA" },
      { file: "/showcase/solace-auto-imports-vercel-app-d.webp", label: "Solace Auto Imports" },
    ],
  },
  "booking-systems": {
    type: "video",
    file: "/reels/aboo-tours-reel.mp4",
    poster: "/reels/posters/aboo-tours-reel.jpg",
    label: "Aboo Tours",
  },
  automation: {
    type: "slides",
    files: [
      { file: "/showcase/jsupremeconglomerate-online-d.webp", label: "J Supreme Conglomerate" },
      { file: "/showcase/bpcouriers-online-d.webp", label: "BP Couriers — Auto Dispatch" },
      { file: "/showcase/thelanguagecradle-com-d.webp", label: "Language Cradle — Auto CMS" },
    ],
  },
  "ai-systems": {
    type: "video",
    file: "/reels/language-cradle-reel.mp4",
    poster: "/reels/posters/language-cradle-reel.jpg",
    label: "Language Cradle AI",
  },
  "marketing-creative": {
    type: "video",
    file: "/reels/876-spotlight-reel.mp4",
    poster: "/reels/posters/876-spotlight-reel.jpg",
    label: "876 Luxury Detailing",
  },
};

const DEFAULT_SLIDES: MediaEntry = {
  type: "slides",
  files: [
    { file: "/showcase/thelanguagecradle-com-d.webp", label: "The Language Cradle" },
    { file: "/showcase/bpcouriers-online-d.webp", label: "BP Couriers" },
  ],
};

function BrowserShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#1a1a1a] px-3 py-2">
        {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
          <span key={c} className="h-2 w-2 flex-none rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-2 flex-1 rounded bg-white/5 px-2 py-0.5 font-mono text-[0.5rem] text-white/20 truncate">
          jsupremetech.online
        </span>
      </div>
      {children}
    </div>
  );
}

function SlideShow({ files }: { files: { file: string; label: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % files.length), 3600);
    return () => clearInterval(t);
  }, [files.length]);

  return (
    <div>
      <BrowserShell>
        <div className="relative h-52 overflow-hidden">
          {files.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.file}
              src={s.file}
              alt={s.label}
              className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))}
        </div>
      </BrowserShell>
      {files.length > 1 && (
        <div className="mt-4 flex items-center justify-between px-1">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/30">
            {files[active].label}
          </p>
          <div className="flex gap-1.5">
            {files.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? "w-5 bg-white" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VideoReel({ file, poster, label }: { file: string; poster: string; label: string }) {
  return (
    <div>
      <BrowserShell>
        <div className="relative h-52 overflow-hidden bg-black">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={file}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </BrowserShell>
      <p className="mt-4 px-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/30">
        {label} · live client work
      </p>
    </div>
  );
}

export function SolutionHeroMedia({ slug }: { slug: string }) {
  const entry = MEDIA_MAP[slug] ?? DEFAULT_SLIDES;

  return (
    <div className="w-full">
      {entry.type === "video" ? (
        <VideoReel file={entry.file} poster={entry.poster} label={entry.label} />
      ) : (
        <SlideShow files={entry.files} />
      )}
    </div>
  );
}
