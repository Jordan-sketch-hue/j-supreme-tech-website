"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const STORAGE_KEY = "jst_itw_seen_v1";

export function SignalDropPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setVisible(false);
  }

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "signal-drop-popup" }),
      });
      if (res.ok) {
        setStatus("done");
        setTimeout(dismiss, 2000);
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  }

  if (!visible) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#090909] shadow-2xl"
        style={{ animation: "itw-rise 0.4s cubic-bezier(.22,1,.36,1) both" }}
      >
        {/* spectrum top bar */}
        <div className="h-[3px] w-full" style={{ background: "var(--sp-h)" }} />

        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="p-7 pt-8">
          {/* Logo mark */}
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white font-mono text-[0.6rem] font-bold text-black">
              JST
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-white/30">
              Intelligence
            </span>
          </div>

          {status === "done" ? (
            <div className="py-4 text-center">
              <p className="font-display text-2xl font-semibold text-white">
                You're in. 📡
              </p>
              <p className="mt-2 text-sm text-white/50">
                First drop hits your inbox tomorrow morning.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-semibold leading-tight text-white">
                In Today's World:
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Daily tech, AI, markets & Caribbean coverage —
                weekday mornings. Signal over noise.
              </p>

              <form onSubmit={subscribe} className="mt-5 space-y-3">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-white/25 focus:border-white/25 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg py-3 font-mono text-sm font-bold uppercase tracking-[0.1em] text-black transition"
                  style={{ background: "var(--sp-h)" }}
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe Free →"}
                </button>
              </form>

              <button
                onClick={dismiss}
                className="mt-3 w-full font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/20 transition hover:text-white/40"
              >
                No thanks
              </button>
            </>
          )}
        </div>

        {/* spectrum bottom accent */}
        <div className="h-[2px] w-full" style={{ background: "var(--sp-h)" }} />
      </div>

      <style>{`
        @keyframes itw-rise {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}

