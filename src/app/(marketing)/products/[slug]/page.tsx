import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  Globe,
  PlayCircle,
  Sparkles,
  Timer,
} from "lucide-react";
import { PageViewConversion } from "@/components/GoogleConversions";
import { SystemScreen } from "@/components/products/screens";
import { SuitePayButton } from "@/components/SuitePayButton";
import {
  LEGACY_PRODUCT_MAP,
  SUITE_SYSTEMS,
  suiteLinks,
  suiteSystem,
  suiteTiers,
} from "@/lib/supremeSuite";

export function generateStaticParams() {
  return SUITE_SYSTEMS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sys = suiteSystem(slug);
  return {
    title: sys ? `${sys.name} — Supreme Suite | J Supreme Tech` : "Product",
    description: sys?.blurb,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Old placeholder-catalog URLs keep working — they land on the nearest real system.
  const legacy = LEGACY_PRODUCT_MAP[slug];
  if (legacy) redirect(`/products/${legacy}`);

  const sys = suiteSystem(slug);
  if (!sys) notFound();

  const tiers = suiteTiers(sys.fromUsd);

  return (
    <main className="bg-white text-ink-900">
      <PageViewConversion />

      {/* Hero */}
      <section
        className="border-b border-line py-14 md:py-18"
        style={{ background: `linear-gradient(160deg, ${sys.accent}0d, transparent 65%)` }}
      >
        <div className="shell">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-500 hover:text-ink-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All products
          </Link>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl font-display text-xl font-bold"
                  style={{ background: `${sys.accent}16`, color: sys.accent }}
                >
                  {sys.shortName[0]}
                </span>
                {sys.badge ? (
                  <span className="rounded-full border border-ink-900 px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em]">
                    {sys.badge}
                  </span>
                ) : null}
              </div>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">{sys.name}</h1>
              <p className="mt-2 font-display text-lg" style={{ color: sys.accent }}>
                {sys.tagline}
              </p>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-600">{sys.blurb}</p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href={suiteLinks.trial(sys.slug)} target="_blank" rel="noreferrer" className="btn btn-dark">
                  <Sparkles className="h-4 w-4" /> Start 3-day free trial
                </a>
                <a href={suiteLinks.demo(sys.slug)} target="_blank" rel="noreferrer" className="btn btn-outline">
                  <PlayCircle className="h-4 w-4" /> Launch live demo
                </a>
                <a
                  href={suiteLinks.exampleSite(sys.slug)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-600 hover:text-ink-900"
                >
                  <Globe className="h-4 w-4" /> Example website
                </a>
              </div>
              <p className="mt-3 flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-500">
                <Timer className="h-3 w-3" /> Full product · demo data included · no card required
              </p>
            </div>

            {/* Live layout + what's inside */}
            <div className="space-y-5">
            <div className="browser">
              <div className="browser-bar">
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-url">app.yourbrand.com — {sys.shortName}</span>
              </div>
              <div className="aspect-[16/10] bg-white">
                <SystemScreen slug={sys.slug} />
              </div>
            </div>
            <div className="card p-6">
              <p className="eyebrow no-rule">Everything included</p>
              <ul className="mt-4 space-y-3">
                {sys.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                    <BadgeCheck className="mt-0.5 h-4 w-4 flex-none" style={{ color: sys.accent }} />
                    {f}
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                  <BadgeCheck className="mt-0.5 h-4 w-4 flex-none" style={{ color: sys.accent }} />
                  Branded public website with booking form + AI chat
                </li>
                <li className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                  <BadgeCheck className="mt-0.5 h-4 w-4 flex-none" style={{ color: sys.accent }} />
                  White-label branding + installable desktop app
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section shell">
        <div className="text-center">
          <span className="eyebrow no-rule justify-center">Pricing</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            Free for 3 days. Then simple tiers.
          </h2>
        </div>
        <div className="mx-auto mt-9 grid max-w-4xl gap-5 md:grid-cols-3">
          {tiers.map((t, i) => (
            <div key={t.tier} className={`card p-6 ${i === 1 ? "border-ink-900 shadow-xl" : ""}`}>
              <p className="font-display text-base font-semibold">{t.tier}</p>
              <p className="mt-1 text-xs text-ink-500">{t.blurb}</p>
              <p className="mt-4 font-display text-3xl font-bold">
                US${t.monthly}
                <span className="text-sm font-normal text-ink-500">/mo</span>
              </p>
              <div className="mt-5">
                <SuitePayButton
                  systemSlug={sys.slug}
                  tier={t.tier}
                  amountUsd={t.monthly}
                  planName={`${sys.name} ${t.tier}`}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-500">
          JMD billing available for Jamaican businesses · cancel anytime · your data exports freely
        </p>
        <div className="mt-9 text-center">
          <a href={suiteLinks.trial(sys.slug)} target="_blank" rel="noreferrer" className="btn btn-dark">
            Try {sys.shortName} free <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* More products */}
      <section className="border-t border-line bg-ink-50/60 py-12">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
              More from Supreme Suite
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-900 underline underline-offset-4"
            >
              View all {SUITE_SYSTEMS.length} systems <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {SUITE_SYSTEMS.filter((s) => s.slug !== sys.slug)
              .slice(0, 8)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/products/${s.slug}`}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
                >
                  {s.shortName}
                </Link>
              ))}
            <a
              href={suiteLinks.catalog}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-ink-950 px-3.5 py-1.5 text-xs font-medium text-white"
            >
              Open the platform <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
