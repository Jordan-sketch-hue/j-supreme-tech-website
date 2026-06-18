"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Check, Loader2, MessageCircle, X } from "lucide-react";
import { SERVICES } from "@/lib/portfolio";
import {
  SERVICE_OFFERS,
  fromPrice,
  priceLabel,
  type Package,
  type ServiceOffer,
} from "@/lib/serviceOffers";

const WA = "https://wa.me/16582182282";

export function ServicesSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const active = openSlug ? SERVICES.find((s) => s.slug === openSlug) : null;
  const offer = openSlug ? SERVICE_OFFERS[openSlug] : undefined;

  return (
    <section id="services" className="section shell">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow no-rule justify-center">What We Build</span>
        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
          Eight services. One studio.
        </h2>
        <p className="mt-5 text-lg leading-8 text-ink-600">
          Not just websites — connected digital ecosystems, plus the social media
          and brand work to grow them. Tap any service to see packages, pay online,
          or book a call.
        </p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((s, i) => {
          const from = fromPrice(s.slug);
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => setOpenSlug(s.slug)}
              className="group flex flex-col bg-white p-7 text-left transition hover:bg-ink-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-ink-900 transition group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs text-ink-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">{s.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.points.map((pt) => (
                  <span
                    key={pt}
                    className="rounded-full bg-ink-100 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.06em] text-ink-600"
                  >
                    {pt}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink-700">
                  {from ?? "Custom"}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-900">
                  View &amp; pay
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          );
        })}

        {/* CTA tile */}
        <div className="flex flex-col justify-between bg-ink-950 p-7 text-white">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/50">
              Not sure yet?
            </span>
            <h3 className="mt-4 text-xl font-semibold">Book a free discovery call.</h3>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Tell us the goal. We&apos;ll map the right system and scope it with
              you — no obligation.
            </p>
          </div>
          <a href={WA} target="_blank" rel="noreferrer" className="btn btn-on-dark mt-6">
            <MessageCircle className="h-4 w-4" />
            Talk to us
          </a>
        </div>
      </div>

      {active && offer ? (
        <ServiceModal
          title={active.title}
          offer={offer}
          onClose={() => setOpenSlug(null)}
        />
      ) : null}
    </section>
  );
}

function ServiceModal({
  title,
  offer,
  onClose,
}: {
  title: string;
  offer: ServiceOffer;
  onClose: () => void;
}) {
  const initial = offer.packages.find((p) => p.popular) ?? offer.packages[0];
  const [selected, setSelected] = useState<Package>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  async function pay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payments/wipay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: offer.slug, pkg: selected.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.message || "Checkout unavailable.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout unavailable. Reach us on WhatsApp to pay.");
      setLoading(false);
    }
  }

  if (!mounted) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-ink-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-line bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.5)] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-line bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <span className="eyebrow no-rule">Choose a package</span>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">{title}</h3>
            <p className="mt-1.5 max-w-xl text-sm leading-6 text-ink-500">{offer.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-ink-600 transition hover:border-ink-900 hover:text-ink-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Packages */}
        <div className="grid gap-3 px-6 py-6 md:grid-cols-3">
          {offer.packages.map((p) => {
            const on = p.id === selected.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                className={`flex flex-col rounded-xl border p-4 text-left transition ${
                  on ? "border-ink-900 bg-ink-950 text-white" : "border-line bg-white text-ink-900 hover:border-ink-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{p.name}</span>
                  {p.popular ? (
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] ${
                        on ? "bg-white text-ink-900" : "bg-ink-900 text-white"
                      }`}
                    >
                      Popular
                    </span>
                  ) : null}
                </div>
                <span className="mt-2 font-display text-2xl font-semibold">
                  {priceLabel(p)}
                </span>
                {p.priceNote ? (
                  <span className={`mt-1 text-[0.7rem] ${on ? "text-white/60" : "text-ink-500"}`}>
                    {p.priceNote}
                  </span>
                ) : null}
                <ul className="mt-3 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs leading-5">
                      <Check className={`mt-0.5 h-3.5 w-3.5 flex-none ${on ? "text-white" : "text-ink-900"}`} />
                      <span className={on ? "text-white/85" : "text-ink-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="border-t border-line bg-ink-50 px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={pay}
              disabled={loading}
              className="btn btn-dark flex-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Starting secure checkout…
                </>
              ) : (
                <>
                  Pay {priceLabel(selected)}
                  {selected.period === "month" ? " (first month)" : ""} now
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <a href={WA} target="_blank" rel="noreferrer" className="btn btn-outline flex-1">
              <MessageCircle className="h-4 w-4" /> Book a free call
            </a>
            <a href={`/start?service=${encodeURIComponent(offer.slug)}`} className="btn btn-outline flex-1">
              Send an inquiry
            </a>
          </div>
          <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-500">
            Secure card payment via WiPay · Visa · Mastercard · after payment we collect your project details
          </p>
          {error ? (
            <p className="mt-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
