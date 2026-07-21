"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { Loader2, Check, Lock, ShieldCheck, MessageCircle, Building2, ChevronDown, ChevronUp } from "lucide-react";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
const OWNER_WA = "16582182282";

type Bank = { configured: boolean; rows: [string, string][]; whatsapp: string };
type OrderResult = { ref: string; title: string; amount: number; bank: Bank };

function usd(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

/* ─── PayPal button ─── */
declare global { interface Window { paypal?: any } }

function PayPalEbookButton({ slug, email, name, onSuccess, onError }: {
  slug: string; email: string; name: string;
  onSuccess: (ref: string) => void;
  onError: (msg: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "processing">("loading");

  useEffect(() => {
    if (rendered.current) return;
    async function init() {
      if (!window.paypal) {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error("PayPal took too long to load. Switch to bank transfer or try without a VPN.")), 12000);
          const s = document.createElement("script");
          s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&disable-funding=paylater,credit`;
          s.onload = () => { clearTimeout(timeout); resolve(); };
          s.onerror = () => { clearTimeout(timeout); reject(new Error("PayPal SDK failed to load. Switch to bank transfer.")); };
          document.head.appendChild(s);
        });
      }
      if (!containerRef.current || rendered.current) return;
      rendered.current = true;

      window.paypal.Buttons({
        style: { layout: "vertical", color: "gold", shape: "pill", label: "pay" },
        async createOrder() {
          setStatus("processing");
          const res = await fetch("/api/payments/paypal/ebook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, email, name }),
          });
          const data = await res.json();
          if (!res.ok || !data.paypalOrderId) throw new Error(data.message ?? "Could not create order.");
          (window as any).__ppEbookCtx = data;
          setStatus("ready");
          return data.paypalOrderId;
        },
        async onApprove(data: { orderID: string }) {
          setStatus("processing");
          const ctx = (window as any).__ppEbookCtx ?? {};
          const res = await fetch("/api/payments/paypal/ebook/capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paypalOrderId: data.orderID, ...ctx }),
          });
          const result = await res.json();
          if (!res.ok || !result.ok) {
            onError(result.error ?? "Capture failed. Message us on WhatsApp.");
            return;
          }
          onSuccess(result.orderRef);
        },
        onError(err: Error) {
          console.error("[paypal/ebook]", err);
          onError("PayPal error. Try again or message us on WhatsApp.");
        },
        onCancel() { setStatus("ready"); },
      }).render(containerRef.current);
      setStatus("ready");
    }
    init().catch((e) => onError(e.message ?? "Failed to load PayPal."));
  }, [slug, email, name, onSuccess, onError]);

  return (
    <div className="w-full">
      {(status === "loading" || status === "processing") && (
        <div className="flex items-center justify-center gap-2 py-3 text-sm text-ink-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          {status === "loading" ? "Loading PayPal…" : "Processing…"}
        </div>
      )}
      <div ref={containerRef} className={status !== "ready" ? "hidden" : ""} />
    </div>
  );
}

/* ─── Bank transfer panel ─── */
function BankTransferPanel({ slug, amount, initialEmail, initialName, onPlaced }: {
  slug: string; amount: number; initialEmail: string; initialName: string;
  onPlaced: (result: OrderResult) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);

  useEffect(() => { setEmail(initialEmail); }, [initialEmail]);
  useEffect(() => { setName(initialName); }, [initialName]);
  const [err, setErr] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/library/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, email, name }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error || "Something went wrong."); setLoading(false); return; }
      onPlaced({ ref: data.ref, title: data.title, amount: data.amount, bank: data.bank });
    } catch {
      setErr("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-full border border-line px-4 py-2.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink-600 transition hover:border-ink-900 hover:text-ink-900"
      >
        <span className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" /> Pay via Bank Transfer</span>
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      {open && (
        <form onSubmit={submit} className="mt-2 space-y-2.5 rounded-2xl border border-line p-4">
          <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400">
            Enter your email — we'll send bank details and your download link once payment clears
          </p>
          <input type="text" placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:border-ink-900" />
          <input type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:border-ink-900" />
          <button type="submit" disabled={loading} className="btn btn-dark w-full disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Place order — {usd(amount)}</>}
          </button>
          {err && <p className="text-center text-xs text-red-600">{err}</p>}
        </form>
      )}
    </div>
  );
}

/* ─── Main export ─── */
export function EbookBuyBox({ slug, title, price }: { slug: string; title: string; price: number }) {
  const [stage, setStage] = useState<"idle" | "checkout" | "done_paypal" | "done_bank">("idle");
  const [orderRef, setOrderRef] = useState("");
  const [bankResult, setBankResult] = useState<OrderResult | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailEntered, setEmailEntered] = useState(false);
  const [ppError, setPpError] = useState("");

  if (stage === "done_paypal") {
    return (
      <div className="rounded-2xl border border-ink-950 bg-ink-950 p-6 text-white">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-ink-950">
            <Check className="h-4 w-4" />
          </span>
          <p className="text-sm font-semibold">Payment confirmed — check your inbox</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Your secure download link for <strong className="text-white">{title}</strong> has been emailed to{" "}
          <strong className="text-white">{email}</strong>. Reference:{" "}
          <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-white">{orderRef}</span>
        </p>
        <a
          href={`https://wa.me/${OWNER_WA}?text=${encodeURIComponent(`Hi! I paid for ${title} (ref: ${orderRef}) via PayPal but didn't get my download link.`)}`}
          target="_blank" rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/50 hover:text-white transition"
        >
          <MessageCircle className="h-3.5 w-3.5" /> Didn't get the email? Message us
        </a>
      </div>
    );
  }

  if (stage === "done_bank" && bankResult) {
    return (
      <div className="rounded-2xl border border-ink-950 bg-ink-950 p-6 text-white">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-ink-950">
            <Check className="h-4 w-4" />
          </span>
          <p className="text-sm font-semibold">Order placed — {usd(bankResult.amount)}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Transfer to the account below using reference{" "}
          <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-white">{bankResult.ref}</span>. Your download link will be emailed once payment clears.
        </p>
        {bankResult.bank.configured ? (
          <dl className="mt-4 divide-y divide-white/10 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-1.5">
            {bankResult.bank.rows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 py-2">
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/45">{label}</dt>
                <dd className="text-right text-sm font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <a href={`https://wa.me/${bankResult.bank.whatsapp}?text=${encodeURIComponent(`Hi, bank details for order ${bankResult.ref} (${bankResult.title}).`)}`}
            target="_blank" rel="noreferrer" className="btn btn-on-dark mt-4">
            <MessageCircle className="h-4 w-4" /> Get bank details on WhatsApp
          </a>
        )}
      </div>
    );
  }

  if (stage === "idle") {
    return (
      <div className="rounded-2xl border border-line bg-white p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="font-display text-3xl font-semibold tracking-tight text-ink-900">{usd(price)}</div>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-400">One-time · lifetime access</p>
          </div>
          <button onClick={() => setStage("checkout")} className="btn btn-dark">
            <Lock className="h-4 w-4" /> Buy the book
          </button>
        </div>
        <p className="mt-4 flex items-center gap-2 text-[0.72rem] text-ink-400">
          <ShieldCheck className="h-3.5 w-3.5" /> PayPal (instant delivery) or bank transfer
        </p>
      </div>
    );
  }

  /* checkout stage */
  return (
    <div className="space-y-4 rounded-2xl border border-line bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
          Checkout · {usd(price)}
        </p>
        <button type="button" onClick={() => { setStage("idle"); setEmailEntered(false); setPpError(""); }}
          className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400 hover:text-ink-900">
          Back
        </button>
      </div>

      {!emailEntered ? (
        <form onSubmit={(e) => { e.preventDefault(); if (email) setEmailEntered(true); }} className="space-y-2.5">
          <p className="text-sm leading-relaxed text-ink-600">
            Your download link goes to this email — enter it before choosing a payment method.
          </p>
          <input type="text" placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:border-ink-900" />
          <input type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:border-ink-900" />
          <button type="submit" className="btn btn-dark w-full">Continue to payment</button>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-ink-50 px-4 py-2">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink-500">Delivering to</span>
            <span className="text-sm font-semibold text-ink-900">{email}</span>
            <button type="button" onClick={() => setEmailEntered(false)}
              className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-400 hover:text-ink-900">change</button>
          </div>

          {ppError && <p className="text-center text-xs text-red-600">{ppError}</p>}

          {PAYPAL_CLIENT_ID && (
            <div className="rounded-2xl border border-line p-3">
              <p className="mb-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400">
                Pay with PayPal — instant delivery
              </p>
              <PayPalEbookButton
                slug={slug} email={email} name={name}
                onSuccess={(ref) => { setOrderRef(ref); setStage("done_paypal"); }}
                onError={(msg) => setPpError(msg)}
              />
            </div>
          )}

          <BankTransferPanel
            slug={slug} amount={price} initialEmail={email} initialName={name}
            onPlaced={(result) => { setBankResult(result); setStage("done_bank"); }}
          />
        </div>
      )}
    </div>
  );
}
