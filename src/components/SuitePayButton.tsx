"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Building2, ChevronDown, ChevronUp, ExternalLink, AlertCircle } from "lucide-react";

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
  const [status, setStatus] = useState<"idle" | "loading" | "processing" | "done" | "provision_failed" | "error">("idle");
  const [error, setError] = useState("");
  const [workspaceUrl, setWorkspaceUrl] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (!showPayPal || rendered.current || !containerRef.current) return;
    rendered.current = true;
    setStatus("loading");

    async function init() {
      if (!window.paypal) {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error("Checkout took too long to load. Try bank transfer or disable your VPN.")), 12000);
          const s = document.createElement("script");
          s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&disable-funding=paypal,paylater,credit,venmo`;
          s.onload = () => { clearTimeout(timeout); resolve(); };
          s.onerror = () => { clearTimeout(timeout); reject(new Error("Checkout failed to load. Use bank transfer instead.")); };
          document.head.appendChild(s);
        });
      }
      if (!containerRef.current) return;

      window.paypal.Buttons({ fundingSource: window.paypal.FUNDING.CARD,
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
            setError(result.error ?? "Payment failed. Message us on WhatsApp.");
            setStatus("error");
            return;
          }
          if (result.workspaceUrl) {
            // Provisioned — redirect straight into the workspace
            setWorkspaceUrl(result.workspaceUrl);
            setStatus("done");
            window.location.href = result.workspaceUrl;
          } else {
            // Payment confirmed but provisioning failed — manual follow-up
            setStatus("provision_failed");
          }
        },
        onError(err: Error) {
          console.error("[paypal/suite]", err);
          setError("Payment error. Try again or message us on WhatsApp.");
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
      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-center space-y-2">
        <p className="text-sm font-semibold text-green-800">Payment confirmed — opening your workspace…</p>
        {workspaceUrl && (
          <a href={workspaceUrl} className="inline-flex items-center gap-1.5 text-xs text-green-700 underline underline-offset-2">
            Click here if you are not redirected <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    );
  }

  if (status === "provision_failed") {
    const msg = encodeURIComponent(`Hi! I just paid for ${planName} but my workspace link was not received. Can you sort this out?`);
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-amber-800">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p className="text-sm font-semibold">Payment confirmed — workspace setup pending</p>
        </div>
        <p className="text-xs text-amber-700">Check your email for credentials. If nothing arrives in 5 minutes, message Jordan directly.</p>
        <a
          href={`https://wa.me/${OWNER_WA}?text=${msg}`}
          target="_blank" rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-ink-800"
        >
          Message Jordan on WhatsApp
        </a>
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
            Pay now — US${amountUsd}/mo
          </button>
        ) : (
          <div className="rounded-2xl border border-line p-3">
            <p className="mb-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400">
              Secure card checkout · first month only
            </p>
            {(status === "loading" || status === "processing") && (
              <div className="flex items-center justify-center gap-2 py-3 text-sm text-ink-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                {status === "loading" ? "Loading checkout…" : "Processing…"}
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


