import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, MessageCircle, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";
import { PageViewConversion } from "@/components/GoogleConversions";
import { CineWords } from "@/components/CineWords";
import {
  Magnetic,
  Marquee,
  Reveal,
  RevealGroup,
  RevealItem,
  ScrollProgress,
} from "@/components/motion-kit";
import { SystemScreen } from "@/components/products/screens";
import { Showreel } from "@/components/products/showreel";
import { ProductTour } from "@/components/products/tour";
import { FullStackDiagram, StatsBand, UseCases } from "@/components/products/sections";
import {
  SUITE_CATEGORIES,
  SUITE_SYSTEMS,
  suiteLinks,
} from "@/lib/supremeSuite";

export const metadata: Metadata = {
  title: "Products — Supreme Suite SaaS | J Supreme Tech",
  description:
    "13 ready-made business systems by J Supreme Tech — courier, movers, salon, school, restaurant, property, warehouse, tours, appointments, loyalty, dashboards, AI chatbot & voice agent. Watch every layout run live, then launch it under your brand free for 3 days.",
};

export default function ProductsPage() {
  return (
    <main className="bg-white text-ink-900">
      <PageViewConversion />
      <ScrollProgress className="bg-ink-900" />

      {/* ============ Hero + showreel ============ */}
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg absolute inset-0" />
        <div className="shell relative py-16 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div className="min-w-0">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-900 md:text-[3.4rem] md:leading-[1.05]">
                <CineWords text="Ready-made systems." delay={0.15} />{" "}
                <span className="underline decoration-4 underline-offset-8">
                  <CineWords text="Watch them run." delay={0.5} />
                </span>
              </h1>
              <Reveal delay={0.16}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
                  {SUITE_SYSTEMS.length} white-label business systems — each a full CRM, a branded
                  public website and AI staff. Every screen moving on this page is the{" "}
                  <span className="font-semibold text-ink-900">real layout of the software</span>.
                  Upload your logo, pick your colors, launch in minutes.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={suiteLinks.trial()} target="_blank" rel="noreferrer" className="btn btn-dark">
                    <Sparkles className="h-4 w-4" />
                    Start a free 3-day trial
                  </a>
                  <a href={suiteLinks.catalog} target="_blank" rel="noreferrer" className="btn btn-outline">
                    <ExternalLink className="h-4 w-4" />
                    Open the platform
                  </a>
                </div>
                <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-500">
                  No card needed · installable desktop app · self-checked live on{" "}
                  <a href={suiteLinks.status} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ink-900">
                    /status
                  </a>
                </p>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.15} className="min-w-0">
              <Showreel />
            </Reveal>
          </div>
        </div>

        {/* marquee of all systems */}
        <div className="relative border-t border-line bg-white/70 py-3 backdrop-blur-sm">
          <Marquee speed={34} gap="2.75rem">
            {SUITE_SYSTEMS.map((s) => (
              <span key={s.slug} className="flex items-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
                {s.name}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ============ Stats ============ */}
      <section className="shell -mt-px py-12 md:py-14">
        <Reveal>
          <StatsBand />
        </Reveal>
      </section>

      {/* ============ Product tour (the "video") ============ */}
      <section className="relative overflow-hidden border-y border-line bg-ink-950 py-16 md:py-24">
        <div className="grid-bg-dark pointer-events-none absolute inset-0" />
        <div className="shell relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow no-rule justify-center text-white/50">60-second tour</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Watch a sale happen — start to finish.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-3 text-base leading-relaxed text-white/60">
                From a stranger on your website to money in your account — six scenes, zero staff
                involved. This is the loop every Supreme Suite system runs all day.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="mx-auto mt-10 max-w-4xl">
              <ProductTour />
            </div>
          </Reveal>
          <p className="mt-6 text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/35">
            Prefer the real thing? Every system below has a live demo — one click, no signup.
          </p>
        </div>
      </section>

      {/* ============ Catalog by category — live mini screens ============ */}
      <section className="section shell">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow no-rule justify-center">The catalog</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {SUITE_SYSTEMS.length} systems — every preview below is live.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-3 text-base leading-relaxed text-ink-500">
              Not screenshots. Each card runs the actual layout of that system — pipelines moving,
              invoices getting paid, AI answering. Click Demo to drive the real product.
            </p>
          </Reveal>
        </div>

        <div className="space-y-16">
          {SUITE_CATEGORIES.map((category) => {
            const systems = SUITE_SYSTEMS.filter((s) => s.category === category);
            if (!systems.length) return null;
            return (
              <div key={category}>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
                    {category}
                  </h3>
                  <span className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[0.65rem] text-ink-400">{systems.length} systems</span>
                </div>

                <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" amount={0.08}>
                  {systems.map((s) => (
                    <RevealItem key={s.slug}>
                      <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
                        <span className="absolute inset-x-0 top-0 z-20 h-1" style={{ background: s.accent }} />
                        {s.badge ? (
                          <span className="absolute right-4 top-4 z-20 rounded-full border border-ink-900 bg-white px-2.5 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-900 shadow-sm">
                            {s.badge}
                          </span>
                        ) : null}

                        {/* live mini screen */}
                        <Link
                          href={`/products/${s.slug}`}
                          aria-label={`${s.name} details`}
                          className="relative block h-48 overflow-hidden border-b border-line bg-ink-100/60"
                          style={{ background: `linear-gradient(150deg, ${s.accent}12, #f4f4f4 70%)` }}
                        >
                          <div className="absolute inset-x-4 bottom-0 top-4 overflow-hidden rounded-t-lg border border-b-0 border-line bg-white shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-1">
                            <SystemScreen slug={s.slug} compact />
                          </div>
                        </Link>

                        <div className="flex flex-1 flex-col p-6">
                          <h4 className="font-display text-lg font-semibold tracking-tight text-ink-900">
                            {s.name}
                          </h4>
                          <p className="mt-1 text-sm text-ink-500">{s.tagline}</p>

                          <ul className="mt-4 flex-1 space-y-1.5">
                            {s.features.slice(0, 3).map((f) => (
                              <li key={f} className="flex items-start gap-2 text-[0.8rem] leading-relaxed text-ink-600">
                                <span className="mt-[0.55em] h-1 w-1 flex-none rounded-full bg-ink-900" />
                                {f}
                              </li>
                            ))}
                          </ul>

                          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                            <p className="text-xs text-ink-500">
                              from{" "}
                              <span className="font-display text-base font-bold text-ink-900">US${s.fromUsd}</span>
                              /mo
                            </p>
                            <div className="flex items-center gap-2">
                              <a
                                href={suiteLinks.demo(s.slug)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink-600 hover:text-ink-900"
                              >
                                <PlayCircle className="h-3.5 w-3.5" /> Demo
                              </a>
                              <Link
                                href={`/products/${s.slug}`}
                                className="inline-flex items-center gap-1 rounded-lg bg-ink-950 px-3 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ink-800"
                              >
                                Details <ArrowRight className="h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ Use cases ============ */}
      <section className="border-t border-line bg-ink-50/50 py-16 md:py-24">
        <div className="shell">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow no-rule justify-center">Use cases</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Three businesses. Three mornings. Same engine.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <UseCases />
          </Reveal>
        </div>
      </section>

      {/* ============ Full-stack anatomy ============ */}
      <section className="shell py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow no-rule justify-center">What you get</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Every system ships as a full stack.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-3 text-base leading-relaxed text-ink-500">
              One subscription, three surfaces — wired together so a booking on your site becomes a
              job in your CRM and a conversation your AI already handled.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <FullStackDiagram />
        </Reveal>

        {/* Trust + custom strip */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="card card-hover flex h-full items-start gap-4 p-6">
              <ShieldCheck className="mt-0.5 h-6 w-6 flex-none text-ink-900" />
              <div>
                <h3 className="font-display text-base font-semibold text-ink-900">
                  Every page, link and workflow — publicly verified
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">
                  Supreme Suite ships with a live self-check portal that runs every business workflow
                  in front of you. Don&apos;t take our word for it —{" "}
                  <a href={suiteLinks.status} target="_blank" rel="noreferrer" className="font-semibold text-ink-900 underline underline-offset-2">
                    run the system check yourself
                  </a>
                  .
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            {/* inline bg: the unlayered .card background wins over the bg-ink-950 utility */}
            <div className="card flex h-full items-start gap-4 p-6 text-white" style={{ background: "#0a0a0a", borderColor: "#0a0a0a" }}>
              <Sparkles className="mt-0.5 h-6 w-6 flex-none" />
              <div>
                <h3 className="font-display text-base font-semibold">Don&apos;t see your industry?</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/65">
                  The same engine powers fully custom builds — your pipeline, your fields, your
                  website. Most custom systems ship in days.
                </p>
                <Link href="/#contact" className="mt-3 inline-flex items-center gap-1 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] underline underline-offset-4">
                  Request a custom CRM <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="relative overflow-hidden border-t border-line bg-ink-950 py-20 text-white md:py-28">
        <div className="grid-bg-dark absolute inset-0" />
        <div className="shell relative text-center">
          <Reveal>
            <span className="eyebrow no-rule justify-center text-white/50">Free for 3 days · no card</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Your brand on it by Friday.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
              Pick a system, upload your logo, and walk into the weekend with a CRM, a website and
              AI staff already working. If it doesn&apos;t fit, walk away — nothing to cancel.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <a href={suiteLinks.trial()} target="_blank" rel="noreferrer" className="btn btn-on-dark">
                  <Sparkles className="h-4 w-4" />
                  Start my free trial
                </a>
              </Magnetic>
              <a href={suiteLinks.catalog} target="_blank" rel="noreferrer" className="btn btn-ghost-dark">
                <ExternalLink className="h-4 w-4" />
                Browse the platform
              </a>
              <a
                href="https://wa.me/16582182282"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/70 underline underline-offset-4 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
        <div className="relative mt-14 border-t border-white/10 pt-5">
          <Marquee speed={40} gap="3rem" pauseOnHover={false}>
            {SUITE_SYSTEMS.map((s) => (
              <span key={s.slug} className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/30">
                {s.shortName}
              </span>
            ))}
          </Marquee>
        </div>
      </section>
    </main>
  );
}
