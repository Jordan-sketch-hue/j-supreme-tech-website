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

  const amountLabel = label.replace(/^Pay\s+/i, "");
  const plan = planName ?? pkg;

  return (
    <div className="w-full space-y-2">
      {error && <p className="text-center text-xs text-red-600">{error}</p>}

      {/* PayPal */}
      {PAYPAL_CLIENT_ID && (
        <>
          {!showPayPal ? (
            <button
              type="button"
              onClick={() => setShowPayPal(true)}
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
