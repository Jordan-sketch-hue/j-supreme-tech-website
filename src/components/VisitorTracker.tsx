"use client";

import { useEffect } from "react";
import { track, captureUTM } from "@/lib/track";

export function VisitorTracker() {
  useEffect(() => {
    // Capture UTM params on landing (stores to sessionStorage)
    captureUTM();

    // Rich analytics event
    track("page_view", {
      referrer: document.referrer || null,
      title: document.title,
    });

    // Legacy security event — keep for threat detection
    const controller = new AbortController();
    fetch("/api/security/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        project: "j-supreme-tech-website",
        path: window.location.pathname + window.location.search,
        url: window.location.href,
        referrer: document.referrer,
      }),
      keepalive: true,
      signal: controller.signal,
    }).catch(() => {});

    return () => controller.abort();
  }, []);

  return null;
}
