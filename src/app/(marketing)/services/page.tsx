import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import type { CSSProperties } from "react";
import { PageViewConversion } from "@/components/GoogleConversions";
import { CineWords } from "@/components/CineWords";
import { ServicesSection } from "@/components/ServicesSection";
import { Marquee, Reveal, RevealGroup, RevealItem, ScrollProgress } from "@/components/motion-kit";
import { PROCESS } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Services — Packages, Real Prices, Pay Online | J Supreme Tech",
  description:
    "Eight services with published JMD packages — websites, e-commerce, CRMs, booking systems, mobile apps, automation, social media marketing and brand design. Pick a package, pay by card, we start.",
};

const STACK = [
  "Next.js 16",
  "Tailwind v4",
  "Supabase",
  "Vercel Edge",
  "PayPal & bank transfer",
  "AI chat & voice staff",
  "Expo (iOS + Android)",
  "Motion design system",
  "Resend email",
  "Analytics & conversion tracking",
];

export default function ServicesPage() {
  return (
    <main className="bg-white text-ink-900">
      <PageViewConversion />
      <ScrollProgress className="bg-ink-900" />

      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative py-16 md:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">Services · 8 systems of work</span>
            </Reveal>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-[3.4rem] md:leading-[1.05]">
              <CineWords text="Pick a package. Pay online." delay={0.15} />{" "}
              <span className="underline decoration-4 underline-offset-8">
                <CineWords text="We start." delay={0.55} />
              </span>
            </h1>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
                Not just software — connected systems, plus the marketing and brand work that
                grows them. Every card below opens real packages with real JMD prices.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                {["Published prices", "PayPal & bank transfer", "Same-day start", "One studio, no hand-offs"].map((chip) => (
                  <span key={chip} className="tag">{chip}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ Interactive services (packages + pay) ============ */}
      <ServicesSection />

      {/* ============ Delivery process — animated ============ */}
      <section className="border-y border-line bg-ink-50/50 py-16 md:py-20">
        <div className="shell">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow no-rule justify-center">How delivery runs</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Eight steps. Zero mystery.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-3 text-base leading-relaxed text-ink-500">
                The same workflow every time — watch it cycle. You always know which step your
                project is on.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {PROCESS.map((p, i) => (
                  <div
                    key={p.step}
                    className="pm-step bg-white p-6"
                    style={{ "--pm-d": `${i * 1.5}s`, "--pm-dur": `${PROCESS.length * 1.5}s` } as CSSProperties}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm font-bold text-ink-900">{p.step}</p>
                      <span className="relative flex h-2 w-2">
                        <span
                          className="pm-ping absolute inline-flex h-full w-full rounded-full border-2 border-ink-900"
                          style={{ "--pm-d": `${i * 1.5}s` } as CSSProperties}
                        />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-ink-900" />
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-ink-900">{p.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-500">{p.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Frontier stack band ============ */}
      <section className="relative overflow-hidden bg-ink-950 py-16 text-white md:py-20">
        <div className="grid-bg-dark pointer-events-none absolute inset-0" />
        <div className="shell relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Reveal>
                <span className="eyebrow no-rule text-white/50">Under the hood</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Frontier stack, boring reliability.
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                  Every build ships on the same modern rails we run ourselves — server-rendered
                  Next.js on Vercel&apos;s edge, Supabase data, AI staff for chat and voice, card
                  payments wired for Jamaica. Fast to ship because it&apos;s repeatable; calm to own
                  because it&apos;s proven.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/pricing" className="btn btn-on-dark">
                    See every price <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/products" className="btn btn-ghost-dark">
                    Ready-made systems instead
                  </Link>
                </div>
              </Reveal>
            </div>
            <RevealGroup className="grid grid-cols-2 gap-3" amount={0.15}>
              {STACK.slice(0, 6).map((t) => (
                <RevealItem key={t}>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/75">
                    {t}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
        <div className="relative mt-12 border-t border-white/10 pt-4">
          <Marquee speed={38} gap="3rem" pauseOnHover={false}>
            {STACK.map((t) => (
              <span key={t} className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/30">
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section shell text-center">
        <Reveal>
          <span className="eyebrow no-rule justify-center">
            <ShieldCheck className="mr-1 h-3.5 w-3.5" /> PayPal or bank transfer · intake right after payment
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Not sure which service fits? Say it in one sentence.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="https://wa.me/16582182282" target="_blank" rel="noreferrer" className="btn btn-dark">
              <MessageCircle className="h-4 w-4" /> WhatsApp the studio
            </a>
            <Link href="/contact" className="btn btn-outline">
              Send the project intake
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
