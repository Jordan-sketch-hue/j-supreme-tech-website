"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
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
    }).catch(() => {
      // Visitor tracking should never block the customer experience.
    });

    return () => controller.abort();
  }, []);

  return null;
}
