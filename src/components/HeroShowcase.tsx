"use client";

import { useState, useEffect } from "react";

const SLIDES = [
  { label: "Language Cradle", tag: "Education Platform", file: "thelanguagecradle-com-d.webp" },
  { label: "BP Couriers", tag: "Logistics App", file: "bpcouriers-online-d.webp" },
  { label: "The Cleanser JA", tag: "E-Commerce Store", file: "the-cleanser-ja-vercel-app-d.webp" },
  { label: "Solace Auto Imports", tag: "Automotive Gallery", file: "solace-auto-imports-vercel-app-d.webp" },
  { label: "RideLink Jamaica", tag: "Ride-Hail Platform", file: "ridelink-jamaica-vercel-app-d.webp" },
];

export function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 3400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col justify-end px-6 pb-10 pt-20">
      {/* Stacked browser frames */}
      <div className="relative h-72">
        {SLIDES.map((s, i) => {
          const rel = ((i - active) % SLIDES.length + SLIDES.length) % SLIDES.length;
          const isTop = rel === 0;
          const isMid = rel === 1;
          return (
            <div
              key={s.file}
              className="absolute inset-x-0 transition-all duration-500 ease-out"
              style={{
                transform: isTop
                  ? "translateY(0) scale(1)"
                  : isMid
                  ? "translateY(12px) scale(0.96)"
                  : "translateY(24px) scale(0.92)",
                opacity: isTop ? 1 : isMid ? 0.5 : 0,
                zIndex: isTop ? 3 : isMid ? 2 : 1,
              }}
            >
              <div className="overflow-hidden rounded-xl border border-white/14 bg-[#111] shadow-[0_28px_70px_rgba(0,0,0,0.7)]">
                <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#1a1a1a] px-3 py-2">
                  {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                    <span key={c} className="h-2 w-2 flex-none rounded-full" style={{ background: c }} />
                  ))}
                  <span className="ml-2 flex-1 truncate rounded bg-white/5 px-2 py-0.5 font-mono text-[0.48rem] text-white/25">
                    jsupremetech.online — live client work
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/showcase/${s.file}`}
                  alt={s.label}
                  className="block h-56 w-full object-cover object-top"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Label + dot nav */}
      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="font-mono text-[0.52rem] uppercase tracking-[0.22em] text-white/45">
            {SLIDES[active].tag}
          </p>
          <p className="mt-1 font-display text-[0.95rem] font-semibold text-white">
            {SLIDES[active].label}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
