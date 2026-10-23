"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { BankTransferButton } from "@/components/BankTransferButton";

export function PayButton({
  slug,
  pkg,
  label,
  planName,
  className: _className,
}: {
  slug: string;
  pkg: string;
  label: string;
  planName?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState("");

  async function handlePay() {
    if (loading || redirecting) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payments/handypay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, pkg }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Payment unavailable. Try bank transfer or WhatsApp us.");
        setLoading(false);
        return;
      }
      setLoading(false);
      setRedirecting(true);
      setTimeout(() => { window.location.href = data.url; }, 600);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  const amountLabel = label.replace(/^Pay\s+/i, "");
  const plan = planName ?? pkg;

  return (
    <>
      {redirecting && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#0a0a0a",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none"
            style={{ animation: "spin 0.9s linear infinite" }}>
            <circle cx="26" cy="26" r="22" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
            <path d="M26 4a22 22 0 0 1 22 22" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <p style={{ color: "#fff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Redirecting to secure checkout
          </p>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>
            Powered by HandyPay
          </span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      <div
        style={{ pointerEvents: redirecting ? "none" : "auto", opacity: redirecting ? 0 : 1 }}
        className="w-full space-y-2"
      >
        {error && <p className="text-center text-xs text-red-600">{error}</p>}

        <p className="text-center font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-400">
          A small processing fee may be added by HandyPay at checkout.
        </p>

        <button
          type="button"
          onClick={handlePay}
          disabled={loading || redirecting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink-950 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-ink-800 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {loading ? "Preparing checkout\u2026" : `Pay ${amountLabel}`}
        </button>

        <BankTransferButton
          slug={slug}
          pkg={pkg}
          planName={plan}
          amountLabel={amountLabel}
        />
      </div>
    </>
  );
}