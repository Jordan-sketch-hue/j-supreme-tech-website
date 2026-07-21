"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Building2, ChevronDown, ChevronUp } from "lucide-react";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
const OWNER_WA = "16582182282";

declare global { interface Window { paypal?: any } }

function BankTransferSuite({ systemSlug, tier, amountUsd, planName }: {
  systemSlug: string; tier: string; amountUsd: number; planName: string;
}) {
  const [open, setOpen] = useState(false);
  const msg = encodeURIComponent(
    `Hi! I want to subscribe to ${planName} (US$${amountUsd}/mo).\n\nPlease send me bank transfer details to get started.`
  );
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-full border border-line px-4 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink-600 transition hover:border-ink-900 hover:text-ink-900"
      >
        <span className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" /> Pay via Bank Transfer</span>
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {open && (
        <div className="mt-2 rounded-2xl border border-line p-3 space-y-2">
          <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400">
            NCB or Scotiabank — message Jordan for account details
          </p>
          <a
            href={`https://wa.me/${OWNER_WA}?text=${msg}`}
            target="_blank" rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink-950 py-2.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-ink-800"
          >
            Get bank details on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

export function SuitePayButton({ systemSlug, tier, amountUsd, planName }: {
  systemSlug: string; tier: string; amountUsd: number; planName: string;
}) {
  const [showPayPal, setShowPayPal] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "processing" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (!showPayPal || rendered.current || !containerRef.current) return;
    rendered.current = true;
    setStatus("loading");

    async function init() {
      if (!window.paypal) {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error("PayPal took too long to load. Try bank transfer or disable your VPN.")), 12000);
          const s = document.createElement("script");
          s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&disable-funding=paylater,credit`;
          s.onload = () => { clearTimeout(timeout); resolve(); };
          s.onerror = () => { clearTimeout(timeout); reject(new Error("PayPal SDK failed to load. Use bank transfer.")); };
          document.head.appendChild(s);
        });
      }
      if (!containerRef.current) return;

      window.paypal.Buttons({
        style: { layout: "vertical", color: "gold", shape: "pill", label: "pay" },
        async createOrder() {
          setStatus("processing");
          const res = await fetch("/api/payments/paypal/suite", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ systemSlug, tier }),
          });
          const data = await res.json();
          if (!res.ok || !data.paypalOrderId) throw new Error(data.message ?? "Could not create order.");
          (window as any).__ppSuiteCtx = data;
          setStatus("idle");
          return data.paypalOrderId;
        },
        async onApprove(data: { orderID: string }) {
          setStatus("processing");
          const ctx = (window as any).__ppSuiteCtx ?? {};
          const res = await fetch("/api/payments/paypal/suite/capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paypalOrderId: data.orderID, ...ctx }),
          });
          const result = await res.json();
          if (!res.ok || !result.ok) {
            setError(result.error ?? "Capture failed. Message us on WhatsApp.");
            setStatus("error");
            return;
          }
          setStatus("done");
        },
        onError(err: Error) {
          console.error("[paypal/suite]", err);
          setError("PayPal error. Try again or message us on WhatsApp.");
          setStatus("error");
        },
        onCancel() { setStatus("idle"); },
      }).render(containerRef.current);

      setStatus("idle");
    }

    init().catch((e) => { setError(e.message); setStatus("error"); });
  }, [showPayPal, systemSlug, tier]);

  if (status === "done") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-green-800">
        Payment received. Jordan will reach out within a few hours to set up your account.
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      {error && <p className="text-center text-xs text-red-600">{error}</p>}

      {PAYPAL_CLIENT_ID ? (
        !showPayPal ? (
          <button
            type="button"
            onClick={() => setShowPayPal(true)}
            className="flex w-full items-center justify-center rounded-full bg-ink-950 py-2.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-ink-800"
          >
            Pay first month with PayPal
          </button>
        ) : (
          <div className="rounded-2xl border border-line p-3">
            <p className="mb-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400">
              Pay US${amountUsd}/mo · first month via PayPal
            </p>
            {(status === "loading" || status === "processing") && (
              <div className="flex items-center justify-center gap-2 py-3 text-sm text-ink-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                {status === "loading" ? "Loading PayPal…" : "Processing…"}
              </div>
            )}
            <div ref={containerRef} className={status === "loading" || status === "processing" ? "hidden" : ""} />
          </div>
        )
      ) : null}

      <BankTransferSuite systemSlug={systemSlug} tier={tier} amountUsd={amountUsd} planName={planName} />
    </div>
  );
}
