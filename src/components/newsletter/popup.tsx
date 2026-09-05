"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Mail, Globe2 } from "lucide-react";
import { NewsletterForm, type SubscribeCoupon } from "./forms";
import { ScratchCoupon } from "./ScratchCoupon";
import {
  recordVisit,
  shouldShowPopup,
  recordPopupDismissed,
  recordNewsletterSubscribed,
} from "@/lib/newsletterPopupSchedule";

// Fill these in once each community channel is live — the row hides itself
// entirely (not one broken link) until at least one URL is set here.
const SOCIAL_LINKS: { label: string; href: string }[] = [
  // { label: "Discord", href: "https://discord.gg/..." },
  // { label: "Telegram", href: "https://t.me/..." },
  // { label: "Facebook", href: "https://facebook.com/..." },
  // { label: "Instagram", href: "https://instagram.com/..." },
];

/** Repeat-visit popup for In Today's World:.
 *  Doesn't show on visit 1 or 2, then appears on prime-numbered visits
 *  (3, 5, 7, 11, 13...) — spacing out further the more times someone's
 *  passed on it — within a visit it still waits for a dwell delay or scroll
 *  depth so it never interrupts the moment someone lands. A dismiss buys a
 *  week of silence; subscribing stops it for good and unlocks a scratch-off
 *  discount for their next checkout. */
export function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState<SubscribeCoupon | null>(null);

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

  function onSubscribed(c: SubscribeCoupon | null) {
    recordNewsletterSubscribed();
    setCoupon(c);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Join In Today's World:"
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

        {/* Header — the spectrum bar, the house standard refracted */}
        <div className="relative h-2 w-full flex-none" style={{ background: "var(--sp-h)" }} />

        <div className="p-7 sm:p-9">
          {coupon ? (
            <>
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ink-500">
                You&apos;re in
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-900">
                In Today&apos;s World: is on its way.
              </h2>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-600">
                It lands every weekday morning — the same format, in your inbox, with every issue
                also readable on the site.{" "}
                <a href="/blog/in-todays-world" className="underline hover:text-ink-900">
                  Browse the archive →
                </a>
              </p>

              <div className="mt-6 border-t border-line pt-6">
                <ScratchCoupon coupon={coupon} />
              </div>

              {SOCIAL_LINKS.length > 0 && (
                <div className="mt-6 border-t border-line pt-5 text-center">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-400">
                    Join the community
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {SOCIAL_LINKS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-full border border-line px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-600 transition hover:border-ink-900 hover:text-ink-900"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ink-500">
                In Today&apos;s World:
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink-900">
                Signal over noise.
              </h2>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-600">
                Technology, AI, marketing, finance, Caribbean and Jamaica coverage — one clean
                dispatch every weekday morning. Join and unlock a discount on your next checkout.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-[0.72rem] text-ink-400">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Every weekday morning
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe2 className="h-3.5 w-3.5" /> Also readable on the site
                </span>
              </div>
              <div className="mt-6">
                <NewsletterForm source="popup" cta="Join free" onSuccess={onSubscribed} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
