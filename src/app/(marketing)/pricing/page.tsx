import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ExternalLink, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { PageViewConversion } from "@/components/GoogleConversions";
import { CineWords } from "@/components/CineWords";
import { Marquee, Reveal, RevealGroup, RevealItem, ScrollProgress } from "@/components/motion-kit";
import { PayButton } from "@/components/PayButton";
import { SERVICES } from "@/lib/portfolio";
import { SERVICE_OFFERS, fromPrice, priceLabel } from "@/lib/serviceOffers";
import { SUITE_SYSTEMS, suiteLinks } from "@/lib/supremeSuite";

export const metadata: Metadata = {
  title: "Pricing — Real JMD Prices, Pay Online | J Supreme Tech",
  description:
    "Every J Supreme Tech service with real prices in JMD — websites, stores, CRMs, booking systems, mobile apps, social media and brand design. Pay securely by card and we start. SaaS systems from US$29/mo.",
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do payments work?",
    a: "Pay via PayPal or bank transfer (NCB / Scotiabank). Pick a package, complete payment, and you land on our intake form — most projects start the same day.",
  },
  {
    q: "What does “deposit to start” mean?",
    a: "Bespoke platforms (custom commerce, CRMs, operating systems) are scoped after your intake. The deposit books the build; the balance is billed in agreed milestones.",
  },
  {
    q: "What about the ready-made SaaS systems?",
    a: (
      <>
        Supreme Suite systems are subscriptions from US$29/mo with a 3-day free trial — no card to try.
        See{" "}
        <Link href="/products" className="font-semibold text-ink-900 underline underline-offset-2">
          Products
        </Link>{" "}
        for all 13.
      </>
    ),
  },
  {
    q: "How do your prices compare to the market?",
    a: (
      <>
        We benchmarked 13 system categories against 40+ competitors — fees, commissions and meters.
        Judge for yourself on the{" "}
        <Link href="/market" className="font-semibold text-ink-900 underline underline-offset-2">
          Market &amp; Competition
        </Link>{" "}
        page.
      </>
    ),
  },
  {
    q: "How fast do you deliver?",
    a: "Launch websites ship in about 7 days, Business sites in ~2 weeks. Bespoke platforms get a milestone timeline in the system plan before we build.",
  },
];

export default function PricingPage() {
  return (
    <main className="bg-white text-ink-900">
      <PageViewConversion />
      <ScrollProgress className="bg-ink-900" />

      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative py-16 text-center md:py-20">
          <Reveal>
            <span className="eyebrow no-rule justify-center">Pricing · JMD · Pay online</span>
          </Reveal>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-[3.2rem] md:leading-[1.05]">
            <CineWords text="Real prices." delay={0.15} />{" "}
            <span className="underline decoration-4 underline-offset-8">
              <CineWords text="No mystery quotes." delay={0.4} />
            </span>
          </h1>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
              Every service below has published packages in JMD — pay securely by card and we start.
              Bespoke platforms show a deposit-to-start; ready-made SaaS runs from US$29/mo.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/services" className="btn btn-dark">
                Browse packages by service <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/market" className="btn btn-outline">
                Compare us to the market
              </Link>
            </div>
          </Reveal>
          <p className="mt-5 flex items-center justify-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-500">
            <ShieldCheck className="h-3.5 w-3.5" /> PayPal or bank transfer · intake form right after payment
          </p>
        </div>
      </section>

      {/* ============ Per-service packages ============ */}
      <section className="section shell">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
            Custom builds — one-time packages
          </h2>
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-[0.65rem] text-ink-400">{SERVICES.length} services</span>
        </div>

        <RevealGroup className="space-y-6" amount={0.04}>
          {SERVICES.map((service) => {
            const offer = SERVICE_OFFERS[service.slug];
            if (!offer) return null;
            const Icon = service.icon;
            return (
              <RevealItem key={service.slug}>
                <article className="card card-hover overflow-hidden">
                  <div className="flex flex-wrap items-center gap-4 border-b border-line bg-ink-50/50 px-6 py-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-ink-950 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">{service.title}</h3>
                      <p className="truncate text-sm text-ink-500">{service.blurb}</p>
                    </div>
                    <span className="ml-auto hidden font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-500 sm:block">
                      {fromPrice(service.slug)}
                    </span>
                  </div>

                  <div className="grid gap-px bg-line md:grid-cols-3">
                    {offer.packages.map((pkg) => (
                      <div key={pkg.id} className={`flex flex-col p-6 ${pkg.popular ? "bg-ink-50/70" : "bg-white"}`}>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                            {pkg.name}
                          </p>
                          {pkg.popular ? (
                            <span className="rounded-full border border-ink-900 px-2 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.12em]">
                              Popular
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-900">
                          {priceLabel(pkg)}
                        </p>
                        {pkg.priceNote ? (
                          <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink-400">{pkg.priceNote}</p>
                        ) : null}
                        <ul className="mt-4 flex-1 space-y-1.5">
                          {pkg.features.slice(0, 4).map((f) => (
                            <li key={f} className="flex items-start gap-2 text-[0.8rem] leading-relaxed text-ink-600">
                              <BadgeCheck className="mt-0.5 h-3.5 w-3.5 flex-none text-ink-900" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5">
                          <PayButton
                            slug={service.slug}
                            pkg={pkg.id}
                            label={`Pay ${priceLabel(pkg)}`}
                            className={`btn w-full ${pkg.popular ? "btn-dark" : "btn-outline"}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <p className="mt-8 text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-500">
          Prefer to talk first?{" "}
          <Link href="/start" className="underline underline-offset-4 hover:text-ink-900">send an inquiry</Link>
          {" "}or{" "}
          <a href="https://wa.me/16582182282" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-ink-900">
            WhatsApp us
          </a>
        </p>
      </section>

      {/* ============ SaaS band ============ */}
      <section className="relative overflow-hidden border-y border-line bg-ink-950 py-16 text-white md:py-20">
        <div className="grid-bg-dark pointer-events-none absolute inset-0" />
        <div className="shell relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Reveal>
                <span className="eyebrow no-rule text-white/50">Don&apos;t want a project? Rent a system.</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  {SUITE_SYSTEMS.length} ready-made systems, from US$29/mo.
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                  Supreme Suite is our SaaS line — complete CRMs with a branded website and AI staff,
                  free for 3 days, white-labeled as yours. Watch every layout run live on the products page.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/products" className="btn btn-on-dark">
                    <Sparkles className="h-4 w-4" /> See all {SUITE_SYSTEMS.length} systems
                  </Link>
                  <a href={suiteLinks.trial()} target="_blank" rel="noreferrer" className="btn btn-ghost-dark">
                    <ExternalLink className="h-4 w-4" /> Start a free trial
                  </a>
                </div>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["US$29+", "entry subscription"],
                ["3 days", "free, no card"],
                ["3 surfaces", "CRM · site · AI staff"],
                ["13", "industries covered"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                  <p className="font-display text-2xl font-bold">{v}</p>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/50">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative mt-12 border-t border-white/10 pt-4">
          <Marquee speed={42} gap="3rem" pauseOnHover={false}>
            {SUITE_SYSTEMS.map((s) => (
              <span key={s.slug} className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/30">
                {s.shortName} · from US${s.fromUsd}/mo
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section shell">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Reveal>
              <span className="eyebrow no-rule justify-center">Straight answers</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Pricing questions, answered.
              </h2>
            </Reveal>
          </div>
          <RevealGroup className="mt-10 space-y-3" amount={0.1}>
            {FAQS.map((faq) => (
              <RevealItem key={faq.q}>
                <details className="card group p-0">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-display text-base font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-line font-mono text-xs text-ink-500 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="border-t border-line px-6 py-4 text-sm leading-relaxed text-ink-600">{faq.a}</div>
                </details>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-ink-950 bg-ink-950 p-7 text-white sm:flex-row">
            <div>
              <h3 className="font-display text-lg font-semibold tracking-tight">Not sure which package fits?</h3>
              <p className="mt-1 text-sm text-white/65">Tell us the goal — we&apos;ll recommend the smallest system that gets you there.</p>
            </div>
            <a href="https://wa.me/16582182282" target="_blank" rel="noreferrer" className="btn btn-on-dark flex-none">
              <MessageCircle className="h-4 w-4" /> WhatsApp the studio
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
