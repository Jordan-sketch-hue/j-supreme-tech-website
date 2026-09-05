"use client";

import { useState } from "react";
import { PayPalButton } from "@/components/PayPalButton";
import { BankTransferButton } from "@/components/BankTransferButton";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

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
  const [error, setError] = useState("");
  const [showPayPal, setShowPayPal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponLocked, setCouponLocked] = useState(false);

  const amountLabel = label.replace(/^Pay\s+/i, "");
  const plan = planName ?? pkg;

  return (
    <div className="w-full space-y-2">
      {error && <p className="text-center text-xs text-red-600">{error}</p>}

      {!showPayPal && (
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Discount code (optional)"
          className="w-full rounded-full border border-line bg-white px-4 py-2 text-center font-mono text-xs uppercase tracking-[0.08em] text-ink-700 outline-none placeholder:normal-case placeholder:text-ink-400 focus:border-ink-900"
        />
      )}

      {/* PayPal */}
      {PAYPAL_CLIENT_ID && (
        <>
          {!showPayPal ? (
            <button
              type="button"
              onClick={() => {
                setCouponLocked(true);
                setShowPayPal(true);
              }}
              className="flex w-full items-center justify-center rounded-full bg-ink-950 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-ink-800"
            >
              Pay with PayPal
            </button>
          ) : (
            <div className="rounded-2xl border border-line p-3">
              <p className="mb-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400">
                Pay securely with PayPal
              </p>
              <PayPalButton
                slug={slug}
                pkg={pkg}
                clientId={PAYPAL_CLIENT_ID}
                couponCode={couponLocked ? couponCode.trim() || undefined : undefined}
                onError={(msg) => setError(msg)}
              />
            </div>
          )}
        </>
      )}

      {/* Bank Transfer */}
      <BankTransferButton
        slug={slug}
        pkg={pkg}
        planName={plan}
        amountLabel={amountLabel}
      />
    </div>
  );
}
