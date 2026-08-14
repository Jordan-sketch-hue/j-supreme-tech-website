import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MessageCircle,
  Zap,
} from "lucide-react";
import { SOLUTIONS, SOLUTION_MAP, SPECTRUM_COLORS } from "@/lib/solutions";
import { SERVICE_OFFERS, type Package, priceLabel } from "@/lib/serviceOffers";
import { PayButton } from "@/components/PayButton";
import { Reveal, RevealGroup, RevealItem, ScrollProgress } from "@/components/motion-kit";
import { PageViewConversion } from "@/components/GoogleConversions";
import { SolutionHeroMedia } from "@/components/SolutionHeroMedia";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = SOLUTION_MAP[slug];
  if (!s) return {};
  return {
    title: `${s.title} — J Supreme Tech`,
    description: s.subhead,
  };
}

function PricingCard({
  pkg,
  offerSlug,
  accent,
}: {
  pkg: Package;
  offerSlug: string;
  accent: string;
}) {
  const isPopular = pkg.popular;
  const label = priceLabel({ amount: pkg.amount, period: pkg.period });
  const isDeposit = !!pkg.priceNote;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-7 transition-all ${
        isPopular
          ? "border-white/20 bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.4)]"
          : "border-white/8 bg-white/[0.02]"
      }`}
    >
      {isPopular && (
        <div
          className="absolute -top-px left-0 h-[2px] w-full rounded-t-2xl"
          style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }}
        />
      )}
      {isPopular && (
        <span
          className="mb-3 self-start rounded-full px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em]"
          style={{ background: `${accent}22`, color: accent }}
        >
          Most popular
        </span>
      )}
      <h3 className="font-display text-lg font-semibold text-white">{pkg.name}</h3>

      <div className="my-5 border-t border-white/8" />

      <p className="font-display text-3xl font-bold text-white">{label}</p>
      {pkg.priceNote && (
        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white/35">
          {pkg.priceNote}
        </p>
      )}

      <ul className="mt-6 flex-1 space-y-2.5">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
            <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-white/30" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-2">
        {isDeposit ? (
          <a
            href="https://wa.me/16582182282"
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.1em] text-black hover:bg-white/90"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Get a custom quote
          </a>
        ) : (
          <PayButton
            slug={offerSlug}
            pkg={pkg.id}
            label={label}
            planName={pkg.name}
          />
        )}
        <Link
          href="/#contact"
          className="flex w-full items-center justify-center gap-1 rounded-full border border-white/15 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-white/50 hover:border-white/30 hover:text-white/80"
        >
          Book a discovery call
        </Link>
      </div>
    </div>
  );
}

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-white/8">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-white">
            {item.q}
            <ChevronDown className="h-4 w-4 flex-none text-white/40 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 text-sm leading-relaxed text-white/55">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = SOLUTION_MAP[slug];
  if (!solution) notFound();

  const offer = SERVICE_OFFERS[solution.offerKey];
  const accent = SPECTRUM_COLORS[solution.accentIndex];
  const related = solution.relatedSlugs
    .map((s) => SOLUTION_MAP[s])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <main className="bg-[#080808] text-white">
      <PageViewConversion />
      <ScrollProgress className="[background:var(--sp-h)]" />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden border-b border-white/8">
        {/* ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 30% 0%, ${accent}14, transparent)`,
          }}
        />
        <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-30" />

        <div className="shell relative flex flex-col gap-12 py-20 md:py-28 lg:flex-row lg:items-center">
          {/* Left — text */}
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white">
              {solution.headline}
            </h1>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/55">
                {solution.subhead}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/16582182282"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white px-7 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.1em] text-black transition-all hover:-translate-y-px hover:bg-white/90"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Start on WhatsApp
                </a>
                <Link
                  href="/#contact"
                  className="rounded-full border border-white/20 px-7 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white/70 transition-all hover:-translate-y-px hover:border-white/50 hover:text-white"
                >
                  Book a discovery call
                </Link>
              </div>
            </Reveal>

            {/* Process steps */}
            <Reveal delay={0.28}>
              <div className="mt-12 flex flex-wrap items-center gap-2">
                {solution.processHighlights.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/50">
                      {step}
                    </span>
                    {i < solution.processHighlights.length - 1 && (
                      <ArrowRight className="h-3 w-3 flex-none text-white/20" />
                    )}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — live media */}
          <Reveal direction="left" delay={0.15} className="hidden w-full max-w-[440px] flex-none lg:block">
            <SolutionHeroMedia slug={slug} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ BENEFITS ═══════════════════ */}
      <section className="border-b border-white/8 py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <span className="eyebrow text-white/40">What you get</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Built for results, not just delivery.
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" amount={0.08}>
            {solution.benefits.map((b, i) => (
              <RevealItem key={b.title}>
                <div className="group relative rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all hover:border-white/15 hover:bg-white/[0.04]">
                  {/* accent top-left corner */}
                  <div
                    className="absolute left-0 top-0 h-[2px] w-12 rounded-tl-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: accent }}
                  />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: accent }}>
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold text-white">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{b.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════════════════ PRICING ═══════════════════ */}
      {offer && (
        <section className="border-b border-white/8 py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <span className="eyebrow text-white/40">Pricing</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Real prices. No hidden fees.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-3 max-w-xl text-base text-white/50">
                Every package includes a discovery call, delivery timeline, and post-launch support.
                Pay online via WiPay — or message us to arrange bank transfer.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {offer.packages.map((pkg) => (
                <Reveal key={pkg.name} direction="up">
                  <PricingCard pkg={pkg} offerSlug={offer.slug} accent={accent} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-6 text-center font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/30">
                All prices in JMD · Enterprise custom quotes available via WhatsApp
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="border-b border-white/8 py-20 md:py-28">
        <div className="shell">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span className="eyebrow text-white/40">FAQ</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Common questions.
              </h2>
            </Reveal>
            <div className="mt-10">
              <FAQ items={solution.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ RELATED SOLUTIONS ═══════════════════ */}
      {related.length > 0 && (
        <section className="border-b border-white/8 py-16">
          <div className="shell">
            <Reveal>
              <h3 className="font-display text-xl font-semibold text-white/70">
                Related solutions
              </h3>
            </Reveal>
            <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3" amount={0.1}>
              {related.map((r) => (
                <RevealItem key={r.slug}>
                  <Link
                    href={`/solutions/${r.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <span>
                      <span
                        className="block font-mono text-[0.58rem] uppercase tracking-[0.18em]"
                        style={{ color: SPECTRUM_COLORS[r.accentIndex] }}
                      >
                        {r.eyebrow}
                      </span>
                      <span className="mt-1 block font-display text-sm font-semibold text-white">
                        {r.title}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/25 transition-transform group-hover:translate-x-1 group-hover:text-white/60" />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-24 md:py-32">
        <div className="shell text-center">
          <Reveal>
            <div
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: `${accent}18`, border: `1px solid ${accent}40` }}
            >
              <Zap className="h-6 w-6" style={{ color: accent }} />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Ready to get started?
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/50">
              Message us on WhatsApp or book a free discovery call — we respond same day.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/16582182282"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.1em] text-black hover:bg-white/90 hover:-translate-y-px transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp (658) 218-2282
              </a>
              <Link
                href="/#contact"
                className="rounded-full border border-white/20 px-8 py-3.5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white/70 hover:border-white/50 hover:text-white transition-all"
              >
                Book a free call →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
