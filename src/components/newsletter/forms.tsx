"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { track } from "@/lib/track";

type State = "idle" | "loading" | "done" | "error";

export type SubscribeCoupon = {
  code: string;
  discountPercent: number;
  expiresAt: string;
  alreadyRedeemed: boolean;
};

function useSubscribe(source: string, onSuccess?: (coupon: SubscribeCoupon | null) => void) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState<SubscribeCoupon | null>(null);

  async function submit(email: string, extra?: { name?: string; topics?: string[] }) {
    if (state === "loading") return;
    setState("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, ...extra }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setMessage(data.error || "Something went wrong. Try again.");
        return;
      }
      setState("done");
      setMessage(data.message || "You're in.");
      setCoupon(data.coupon ?? null);
      track("newsletter_signup", { source });
      onSuccess?.(data.coupon ?? null);
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
    }
  }

  return { state, message, coupon, submit };
}

/* ---------------- Inline / dark hero form ---------------- */
export function NewsletterForm({
  source = "inline",
  dark = false,
  placeholder = "you@company.com",
  cta = "Subscribe",
  onSuccess,
}: {
  source?: string;
  dark?: boolean;
  placeholder?: string;
  cta?: string;
  onSuccess?: (coupon: SubscribeCoupon | null) => void;
}) {
  const { state, message, submit } = useSubscribe(source, onSuccess);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
    if (email) submit(email);
  }

  if (state === "done") {
    return (
      <div className={`flex items-center gap-2.5 ${dark ? "text-white" : "text-ink-900"}`}>
        <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ${dark ? "bg-white text-ink-950" : "bg-ink-900 text-white"}`}>
          <Check className="h-4 w-4" />
        </span>
        <p className="text-sm">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className={`flex flex-col gap-2.5 sm:flex-row ${dark ? "" : ""}`}>
        <input
          name="email"
          type="email"
          required
          placeholder={placeholder}
          aria-label="Email address"
          className={`min-w-0 flex-1 rounded-full border px-5 py-3 text-sm outline-none transition ${
            dark
              ? "border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-white/60"
              : "border-line bg-white text-ink-900 placeholder:text-ink-400 focus:border-ink-900"
          }`}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={`btn flex-none ${dark ? "btn-on-dark" : "btn-dark"} disabled:opacity-60`}
        >
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{cta} <ArrowRight className="h-4 w-4" /></>}
        </button>
      </div>
      {message && state === "error" ? (
        <p className={`mt-2 text-xs ${dark ? "text-white/70" : "text-ink-500"}`}>{message}</p>
      ) : (
        <p className={`mt-2.5 text-[0.7rem] ${dark ? "text-white/45" : "text-ink-400"}`}>
          Double opt-in. No spam, unsubscribe anytime.
        </p>
      )}
    </form>
  );
}

/* ---------------- Compact footer form ---------------- */
export function NewsletterCompact() {
  const { state, message, submit } = useSubscribe("footer");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
    if (email) submit(email);
  }

  if (state === "done") {
    return <p className="flex items-center gap-2 text-sm text-white/80"><Check className="h-4 w-4" /> {message}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        name="email"
        type="email"
        required
        placeholder="Email for the Debrief"
        aria-label="Email address"
        className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/60"
      />
      <button type="submit" disabled={state === "loading"} className="btn btn-on-dark flex-none disabled:opacity-60">
        {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
      </button>
      {state === "error" ? <span className="sr-only">{message}</span> : null}
    </form>
  );
}

/* ---------------- Big card (blog hub / library) ---------------- */
export function NewsletterCard({ source = "card" }: { source?: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink-950 bg-ink-950 p-8 text-white sm:p-12">
      <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative max-w-xl">
        <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/55">The Communications Debrief</span>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Get the signal in your inbox.
        </h2>
        <p className="mt-3 text-[0.97rem] leading-relaxed text-white/65">
          Field notes on building software, marketing systems and the markets — what we shipped, the problems and the fixes. One clean dispatch, no noise.
        </p>
        <div className="mt-7">
          <NewsletterForm source={source} dark cta="Join the Debrief" />
        </div>
      </div>
    </div>
  );
}
