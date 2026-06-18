"use client";

import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT, ADS_ENABLED, AD_SLOTS, type AdSlotName } from "@/lib/ads";

/*
  A single Google AdSense display unit, styled to disappear into the J Supreme Tech
  black-and-white system: a hairline-framed block with a quiet mono "Advertisement"
  label (FCC/AdSense both expect ad labelling, and it keeps the page honest).

  Behaviour:
    • Renders nothing in production when AdSense isn't configured yet (safe pre-approval).
    • In dev with no client id, shows a labelled placeholder so layout is visible.
    • Respects the existing cookie banner: if the visitor declined, we request
      non-personalized ads instead of blocking revenue entirely.
    • Guards against React 19 strict-mode double-push (the classic "All ins elements
      already have ads" AdSense crash).
*/

declare global {
  interface Window {
    adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: number };
  }
}

export function AdSlot({
  slot,
  className = "",
  label = "Advertisement",
}: {
  slot: AdSlotName;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [filled, setFilled] = useState(false);

  const slotId = AD_SLOTS[slot];

  useEffect(() => {
    if (!ADS_ENABLED || !slotId || pushed.current) return;
    pushed.current = true;
    try {
      const consent = window.localStorage.getItem("cookieConsent");
      window.adsbygoogle = window.adsbygoogle || [];
      if (consent === "declined") {
        // Honour the decline: serve non-personalized (contextual) ads, don't block income.
        window.adsbygoogle.requestNonPersonalizedAds = 1;
      }
      window.adsbygoogle.push({});

      // Detect whether Google actually filled the unit so we can hide the chrome
      // (label + border) for unfilled/collapsed slots — no empty boxes on the page.
      const el = ref.current;
      const t = window.setTimeout(() => {
        if (el && el.getAttribute("data-ad-status") === "filled") setFilled(true);
      }, 1500);
      return () => window.clearTimeout(t);
    } catch {
      /* AdSense not ready / blocked — fail silent. */
    }
  }, [slotId]);

  // Dev-only placeholder so the editorial layout is reviewable before approval.
  if (!ADS_ENABLED) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <div
          className={`my-12 grid place-items-center rounded-2xl border border-dashed border-line bg-ink-50 py-10 text-center ${className}`}
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-400">
            Ad slot · {slot} (inactive — set NEXT_PUBLIC_ADSENSE_CLIENT)
          </span>
        </div>
      );
    }
    return null;
  }

  return (
    <aside
      className={`my-12 ${className}`}
      aria-label="Advertisement"
      // Keep the label/border only once an ad has rendered.
      style={{ display: slotId ? undefined : "none" }}
    >
      {filled ? (
        <div className="mb-1.5 text-center font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink-300">
          {label}
        </div>
      ) : null}
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
