"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    paypal?: any;
  }
}

interface PayPalButtonProps {
  slug: string;
  pkg: string;
  clientId: string;
  onSuccess?: (orderId: string, planName: string) => void;
  onError?: (msg: string) => void;
}

export function PayPalButton({ slug, pkg, clientId, onSuccess, onError }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "processing" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) return;

    function fail(msg: string) {
      setStatus("error");
      setErrorMsg(msg);
      onError?.(msg);
    }

    async function init() {
      // Load PayPal SDK if not already present.
      if (!window.paypal) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("PayPal SDK failed to load"));
          document.head.appendChild(script);
        });
      }

      if (!containerRef.current || rendered.current) return;
      rendered.current = true;

      window.paypal
        .Buttons({
          style: { layout: "vertical", color: "gold", shape: "pill", label: "pay" },

          async createOrder() {
            setStatus("processing");
            const res = await fetch("/api/payments/paypal", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slug, pkg }),
            });
            const data = await res.json();
            if (!res.ok || !data.paypalOrderId) {
              throw new Error(data.message ?? "Could not create order.");
            }
            // Stash context for capture step.
            (window as any).__ppCtx = data;
            setStatus("ready");
            return data.paypalOrderId;
          },

          async onApprove(data: { orderID: string }) {
            setStatus("processing");
            const ctx = (window as any).__ppCtx ?? {};
            const res = await fetch("/api/payments/paypal/capture", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paypalOrderId: data.orderID, ...ctx }),
            });
            const result = await res.json();
            if (!res.ok || !result.ok) {
              fail(result.error ?? "Payment capture failed. Please contact us on WhatsApp.");
              return;
            }
            onSuccess?.(result.orderId, result.planName ?? pkg);
            const qs = `pay=success&ref=${encodeURIComponent(result.orderId)}&service=${encodeURIComponent(slug)}&pkg=${encodeURIComponent(pkg)}&plan=${encodeURIComponent(result.planName ?? "")}`;
            window.location.href = `/start?${qs}`;
          },

          onError(err: Error) {
            console.error("[paypal] SDK error:", err);
            fail("PayPal encountered an error. Try again or message us on WhatsApp.");
          },

          onCancel() {
            setStatus("ready");
          },
        })
        .render(containerRef.current);

      setStatus("ready");
    }

    init().catch((e) => fail(e.message ?? "Failed to load PayPal."));
  }, [clientId, slug, pkg, onError, onSuccess]);

  return (
    <div className="w-full">
      {status === "loading" && (
        <div className="flex items-center justify-center gap-2 py-3 text-sm text-ink-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading PayPal…
        </div>
      )}
      {status === "processing" && (
        <div className="flex items-center justify-center gap-2 py-3 text-sm text-ink-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Processing…
        </div>
      )}
      {status === "error" && (
        <p className="mt-1 text-center text-xs text-red-600">{errorMsg}</p>
      )}
      <div ref={containerRef} className={status === "loading" || status === "processing" ? "hidden" : ""} />
    </div>
  );
}
