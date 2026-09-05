"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NewsletterForm } from "./forms";
import {
  recordVisit,
  shouldShowPopup,
  recordPopupDismissed,
  recordNewsletterSubscribed,
} from "@/lib/newsletterPopupSchedule";

/** Repeat-visit popup for the Communications Debrief. Doesn't show on visit 1
 *  or 2, then appears on prime-numbered visits (3, 5, 7, 11, 13...) — spacing
 *  out further the more times someone's passed on it — within a visit it
 *  still waits for a dwell delay or scroll depth so it never interrupts the
 *  moment someone lands. A dismiss buys a week of silence; subscribing stops
 *  it for good. A persistent CTA lives elsewhere (footer, blog, /newsletter)
 *  for everyone else. */
export function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Never interrupt auth or the dedicated newsletter pages.
    if (pathname?.startsWith("/login") || pathname?.startsWith("/signup") || pathname?.startsWith("/newsletter")) return;

    const visitCount = recordVisit();
    if (!shouldShowPopup(visitCount)) return;

    let shown = false;
    function trigger() {
      if (shown) return;
      shown = true;
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
    }
    function onScroll() {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      if (scrolled > 0.4) trigger();
    }

    const timer = window.setTimeout(trigger, 20000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  function close() {
    setOpen(false);
    recordPopupDismissed();
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Join the Communications Debrief"
      className="fixed inset-0 z-[120] flex items-end justify-center p-4 sm:items-center"
    >
      <button aria-label="Close" onClick={close} className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.5)]">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-600 transition hover:border-ink-900 hover:text-ink-900"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-28 overflow-hidden border-b border-line bg-ink-50">
          <svg viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
            <rect width="800" height="200" fill="#fafafa" />
            {Array.from({ length: 7 }).map((_, i) => {
              const y = 30 + i * 24;
              let d = `M 0 ${y}`;
              for (let x = 0; x <= 800; x += 20) d += ` L ${x} ${y + Math.sin(x * 0.02 + i) * (4 + i)}`;
              return <path key={i} d={d} fill="none" stroke={i === 3 ? "#141414" : "rgba(20,20,20,0.10)"} strokeWidth={i === 3 ? 1.8 : 1} />;
            })}
          </svg>
        </div>

        <div className="p-7 sm:p-9">
          <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ink-500">The Communications Debrief</span>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-900">
            Signal over noise — once a week.
          </h2>
          <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-600">
            Field notes from the studio on tech, marketing and the markets: what we shipped, the problems, the fixes. Join the list and get the first read.
          </p>
          <div className="mt-6">
            <NewsletterForm source="popup" cta="Join free" onSuccess={recordNewsletterSubscribed} />
          </div>
        </div>
      </div>
    </div>
  );
}
