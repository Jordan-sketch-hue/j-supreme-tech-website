"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Check, Lock, ShieldCheck, MessageCircle } from "lucide-react";

type Bank = { configured: boolean; rows: [string, string][]; whatsapp: string };
type Result = { ref: string; title: string; amount: number; bank: Bank };

function usd(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function EbookBuyBox({ slug, title, price }: { slug: string; title: string; price: number }) {
  const [stage, setStage] = useState<"idle" | "form" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (stage === "loading") return;
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email")?.toString().trim() ?? "";
    const name = fd.get("name")?.toString().trim() ?? "";
    if (!email) return;
    setStage("loading");
    setMessage("");
    try {
      const res = await fetch("/api/library/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, email, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStage("error");
        setMessage(data.error || "Something went wrong. Try again.");
        return;
      }
      setResult({ ref: data.ref, title: data.title, amount: data.amount, bank: data.bank });
      setStage("done");
    } catch {
      setStage("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (stage === "done" && result) {
    return (
      <div className="rounded-2xl border border-ink-950 bg-ink-950 p-6 text-white">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-ink-950"><Check className="h-4 w-4" /></span>
          <p className="text-sm font-semibold">Order placed — {usd(result.amount)}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Send a bank transfer with reference{" "}
          <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-white">{result.ref}</span>. We&apos;ll email your secure download link the moment payment clears. (Details are also in your inbox.)
        </p>

        {result.bank.configured ? (
          <dl className="mt-4 divide-y divide-white/10 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-1.5">
            {result.bank.rows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 py-2">
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/45">{label}</dt>
                <dd className="text-right text-sm font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <a href={`https://wa.me/${result.bank.whatsapp}?text=${encodeURIComponent(`Hi, I'd like the bank details for order ${result.ref} (${result.title}).`)}`} target="_blank" rel="noreferrer" className="btn btn-on-dark mt-4">
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
          <button onClick={() => setStage("form")} className="btn btn-dark">
            <Lock className="h-4 w-4" /> Buy the book
          </button>
        </div>
        <p className="mt-4 flex items-center gap-2 text-[0.72rem] text-ink-400">
          <ShieldCheck className="h-3.5 w-3.5" /> Secure delivery · pay by bank transfer · instant link once cleared
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-500">Checkout · {usd(price)}</p>
        <button type="button" onClick={() => setStage("idle")} className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400 hover:text-ink-900">Back</button>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">
        Enter your details — you&apos;ll get bank-transfer instructions and your secure download link once payment clears.
      </p>
      <div className="mt-4 space-y-2.5">
        <input name="name" type="text" placeholder="Your name" aria-label="Your name" className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:border-ink-900" />
        <input name="email" type="email" required placeholder="you@company.com" aria-label="Email address" className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:border-ink-900" />
      </div>
      <button type="submit" disabled={stage === "loading"} className="btn btn-dark mt-3 w-full disabled:opacity-60">
        {stage === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Place order — {usd(price)}</>}
      </button>
      {stage === "error" ? <p className="mt-2 text-xs text-ink-500">{message}</p> : null}
      <p className="mt-2.5 text-[0.7rem] text-ink-400">No card needed now. You pay by bank transfer; we deliver on confirmation.</p>
    </form>
  );
}
