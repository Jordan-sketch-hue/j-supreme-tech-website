"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

/** Direct WiPay checkout for a known service package. Amount is resolved server-side. */
export function PayButton({
  slug,
  pkg,
  label,
  className,
}: {
  slug: string;
  pkg: string;
  label: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function go() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payments/wipay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, pkg }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.message || "Checkout unavailable.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout unavailable. Reach us on WhatsApp.");
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" onClick={go} disabled={loading} className={className}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Starting…
          </>
        ) : (
          <>
            {label}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {error ? <p className="mt-2 text-center text-xs text-red-600">{error}</p> : null}
    </>
  );
}
