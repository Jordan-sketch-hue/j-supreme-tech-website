"use client";

import { useState, useEffect } from "react";

const SLIDES = [
  { label: "Language Cradle", tag: "Education Platform", url: "thelanguagecradle.com" },
  { label: "Ferguson Law", tag: "Legal Website", url: "ferguson-law.vercel.app" },
  { label: "BP Couriers", tag: "Logistics App", url: "bpcouriers.online" },
  { label: "The Cleanser JA", tag: "E-Commerce Store", url: "the-cleanser-ja.vercel.app" },
  { label: "Solace Auto Imports", tag: "Automotive Gallery", url: "solace-auto-imports.vercel.app" },
];

function shotUrl(host: string) {
  return `/showcase/${host.replace(/[^a-z0-9]+/gi, "-")}-d.webp`;
}

export function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 3400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col justify-end px-6 pb-10 pt-20">
      {/* Stacked browser frames */}
      <div className="relative h-64">
        {SLIDES.map((s, i) => {
          const rel = ((i - active) % SLIDES.length + SLIDES.length) % SLIDES.length;
          const isTop = rel === 0;
          const isMid = rel === 1;
          return (
            <div
              key={s.url}
              className="absolute inset-x-0 transition-all duration-500 ease-out"
              style={{
                transform: isTop
                  ? "translateY(0) scale(1)"
                  : isMid
                  ? "translateY(10px) scale(0.96)"
                  : "translateY(20px) scale(0.92)",
                opacity: isTop ? 1 : isMid ? 0.45 : 0,
                zIndex: isTop ? 3 : isMid ? 2 : 1,
              }}
            >
              {/* Browser chrome */}
              <div className="overflow-hidden rounded-xl border border-white/12 bg-[#111] shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#1a1a1a] px-3 py-2">
                  {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                    <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
                  ))}
                  <span className="ml-2 flex-1 rounded-md bg-white/5 px-3 py-1 font-mono text-[0.5rem] text-white/35 truncate">
                    {s.url}
                  </span>
                </div>
                <img
                  src={shotUrl(s.url)}
                  alt={s.label}
                  className="block h-52 w-full object-cover object-top"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Label + dot nav */}
      <div className="mt-7 flex items-end justify-between">
        <div>
          <p className="font-mono text-[0.52rem] uppercase tracking-[0.22em] text-white/30">
            {SLIDES[active].tag}
          </p>
          <p className="mt-0.5 font-display text-[0.9rem] font-semibold text-white">
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
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
