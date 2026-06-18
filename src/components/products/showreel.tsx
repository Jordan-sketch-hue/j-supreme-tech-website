"use client";

/**
 * Hero showreel — a browser frame auto-cycling through the animated
 * system screens, with tab chips + per-tab progress and floating
 * notification chips around the frame.
 */
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { suiteSystem } from "@/lib/supremeSuite";
import { SHOWREEL_SLUGS, SystemScreen } from "./screens";

const HOLD_MS = 5200;

export function Showreel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SHOWREEL_SLUGS.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [index, paused]);

  const slug = SHOWREEL_SLUGS[index];
  const sys = suiteSystem(slug)!;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* floating chips */}
      <div className="float pointer-events-none absolute -left-5 top-10 z-20 hidden items-center gap-1.5 rounded-xl border border-line bg-white px-2.5 py-1.5 shadow-lg lg:flex">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-[9px] font-bold text-white">✓</span>
        <span>
          <span className="block text-[10px] font-bold leading-tight text-ink-900">Booking captured</span>
          <span className="block font-mono text-[8px] uppercase tracking-wide text-ink-400">by your AI staff</span>
        </span>
      </div>
      <div className="float-2 pointer-events-none absolute -right-4 bottom-16 z-20 hidden items-center gap-1.5 rounded-xl border border-line bg-white px-2.5 py-1.5 shadow-lg lg:flex">
        <span className="live-dot h-2 w-2 rounded-full" style={{ background: sys.accent }} />
        <span className="font-mono text-[9px] font-semibold uppercase tracking-wide text-ink-600">
          your logo · your colors
        </span>
      </div>

      <div className="browser">
        <div className="browser-bar">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-url">app.yourbrand.com — {sys.name}</span>
        </div>
        {/* key remount restarts every CSS animation per slide */}
        <div key={slug} className="pm-scene aspect-[16/10] bg-white">
          <SystemScreen slug={slug} />
        </div>
      </div>

      {/* tabs + progress */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
        {SHOWREEL_SLUGS.map((s, i) => {
          const t = suiteSystem(s)!;
          const active = i === index;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative overflow-hidden rounded-full border px-3 py-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                active ? "border-ink-900 text-ink-900" : "border-line text-ink-400 hover:border-ink-400 hover:text-ink-700"
              }`}
              aria-label={`Show ${t.name}`}
            >
              {active ? (
                <span
                  key={`${index}-${paused ? "p" : "r"}`}
                  className="pm-seg absolute inset-y-0 left-0 bg-ink-900/10"
                  style={{ "--pm-dur": `${HOLD_MS / 1000}s`, animationPlayState: paused ? "paused" : "running" } as CSSProperties}
                />
              ) : null}
              <span className="relative">{t.shortName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
