"use client";

import { useEffect, useState } from "react";

const BRAND = "#07810A";
const GOLD = "#C8A900";

export default function PwaUpdate() {
  const [waitingSW, setWaitingSW] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") return;

    // When the new SW calls skipWaiting and takes control, reload the page.
    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!reloading) { reloading = true; window.location.reload(); }
    });

    function watchInstalling(sw: ServiceWorker) {
      sw.addEventListener("statechange", () => {
        // "installed" + an existing controller = a new version waiting to take over.
        if (sw.state === "installed" && navigator.serviceWorker.controller) {
          setWaitingSW(sw);
        }
      });
    }

    async function init() {
      // Register /sw.js (or reuse an existing registration) for offline + update support.
      const reg = await navigator.serviceWorker.getRegistration("/sw.js")
        ?? await navigator.serviceWorker.register("/sw.js");

      if (reg.waiting) { setWaitingSW(reg.waiting); return; }
      if (reg.installing) watchInstalling(reg.installing);
      reg.addEventListener("updatefound", () => {
        if (reg.installing) watchInstalling(reg.installing);
      });
    }

    init().catch(() => {});

    // Poll for updates every 60 s so long-lived sessions catch deploys quickly.
    const timer = setInterval(() => {
      navigator.serviceWorker.getRegistration("/sw.js")
        .then((r) => r?.update())
        .catch(() => {});
    }, 60_000);

    return () => clearInterval(timer);
  }, []);

  if (!waitingSW) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#0f172a",
        color: "#fff",
        borderRadius: 14,
        padding: "12px 14px 12px 16px",
        boxShadow: "0 16px 48px -10px rgba(0,0,0,0.55)",
        fontSize: 13.5,
        fontWeight: 600,
        maxWidth: 310,
        border: `1px solid ${GOLD}55`,
      }}
    >
      <span style={{ flex: 1, lineHeight: 1.4, paddingRight: 2 }}>
        🔄 New version available
      </span>
      <button
        onClick={() => waitingSW.postMessage("SKIP_WAITING")}
        style={{
          background: `linear-gradient(90deg, #066808, ${BRAND})`,
          color: "#fff",
          border: "none",
          borderRadius: 9,
          padding: "7px 14px",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Update
      </button>
      <button
        onClick={() => setWaitingSW(null)}
        aria-label="Dismiss"
        style={{
          background: "none",
          border: "none",
          color: "#64748b",
          cursor: "pointer",
          fontSize: 17,
          lineHeight: 1,
          padding: "2px 4px",
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}
