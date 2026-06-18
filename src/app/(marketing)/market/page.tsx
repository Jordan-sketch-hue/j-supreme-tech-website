import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  CATEGORY_ORDER,
  FEE_MODEL_LEGEND,
  FX_NOTE,
  MARKET_SYSTEMS,
  RESEARCH_DATE,
  systemsByCategory,
} from "@/lib/marketAnalysis";
import {
  JST_PRICING,
  TRIAL_DAYS,
  fmtJMD,
  hybridFor,
  type PricingModel,
} from "@/lib/jstPricing";

export const metadata: Metadata = {
  title: "Market & Competition — What Competitors Charge | J Supreme Tech",
  description:
    "Independent pricing research across the 13 business systems J Supreme Tech is launching: what Onfleet, AppFolio, Toast, FareHarbor, Calendly, Chatbase and 40+ competitors charge — one-time fees, monthly plans, commissions and usage meters.",
};

const categoryBlurbs: Record<(typeof CATEGORY_ORDER)[number], string> = {
  Operations: "Systems that run the day-to-day — dispatch, jobs, stock, doors, tables.",
  Booking: "Systems that fill the calendar and take the deposit.",
  Education: "Systems that run schools and academies end-to-end.",
  Growth: "Systems that bring customers back.",
  Intelligence: "Systems that read the numbers and answer the phone.",
};

export default async function MarketPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>;
}) {
  const { model: modelParam } = await searchParams;
  const model: PricingModel = modelParam === "hybrid" ? "hybrid" : "monthly";
  const competitorCount = MARKET_SYSTEMS.reduce(
    (n, s) => n + s.competitors.length,
    0,
  );

  return (
    <main className="bg-white text-ink-900">
      {/* ============================ HERO ============================ */}
      <section className="section shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow no-rule justify-center">
            Market &amp; Competition
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            What the market charges.
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink-600">
            We benchmarked the {MARKET_SYSTEMS.length} business systems in the
            J&nbsp;Supreme engine against {competitorCount}+ named competitors —
            what they charge, and <em>how</em> they charge it: one-time fees,
            monthly plans, per-seat math, booking commissions and usage meters.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ink-500">
            Research snapshot · {RESEARCH_DATE} · published list prices in USD
            unless marked · {FX_NOTE}
          </p>
        </div>

        {/* jump nav */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORY_ORDER.map((cat) => (
            <a
              key={cat}
              href={`#${cat.toLowerCase()}`}
              className="rounded-full border border-line bg-white px-4 py-2 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ink-600 hover:border-ink-900 hover:text-ink-900"
            >
              {cat}
            </a>
          ))}
        </div>

        {/* live-product banner — this research became a real product line */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-ink-950 p-6 sm:flex-row sm:p-7">
          <div>
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
              These {MARKET_SYSTEMS.length} systems are live
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold tracking-tight text-ink-900">
              We didn&apos;t just benchmark the market — we built it. Meet{" "}
              <span className="underline decoration-2 underline-offset-4">Supreme Suite</span>.
            </p>
            <p className="mt-1 text-sm text-ink-500">
              Every system below is a launchable product: branded CRM + website + AI staff, free for 3 days.
            </p>
          </div>
          <div className="flex flex-none flex-wrap items-center gap-2.5">
            <Link href="/products" className="btn btn-dark">
              See the products <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://supreme-suite.vercel.app/start"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Start free trial <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* legend */}
        <div className="mt-12 rounded-2xl border border-line bg-ink-50 p-6 sm:p-8">
          <h2 className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ink-500">
            How competitors charge — the seven fee structures
          </h2>
          <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {FEE_MODEL_LEGEND.map(({ model, meaning }) => (
              <div key={model} className="flex items-baseline gap-3 text-sm">
                <span className="whitespace-nowrap font-mono text-xs font-semibold text-ink-900">
                  {model}
                </span>
                <span className="text-ink-600">{meaning}</span>
              </div>
            ))}
          </div>
        </div>

        {/* JST launch-pricing model toggle */}
        <div className="mt-8 rounded-2xl border border-ink-950 bg-ink-950 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/55">
                J Supreme Tech — launch pricing
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
                Tiered, in JMD, with a {TRIAL_DAYS}-day free trial — no free plan.
                Flip the model to see JST&apos;s rows recalculate against every
                table below.
              </p>
            </div>
            <div className="inline-flex shrink-0 rounded-full border border-white/20 p-1 font-mono text-[0.62rem] uppercase tracking-[0.12em]">
              <Link
                href="/market?model=monthly"
                className={`rounded-full px-4 py-2 transition ${
                  model === "monthly" ? "bg-white text-ink-950" : "text-white/70 hover:text-white"
                }`}
              >
                Monthly only
              </Link>
              <Link
                href="/market?model=hybrid"
                className={`rounded-full px-4 py-2 transition ${
                  model === "hybrid" ? "bg-white text-ink-950" : "text-white/70 hover:text-white"
                }`}
              >
                Setup + monthly
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= CATEGORIES ========================= */}
      {CATEGORY_ORDER.map((cat) => {
        const systems = systemsByCategory(cat);
        if (systems.length === 0) return null;
        return (
          <section
            key={cat}
            id={cat.toLowerCase()}
            className="border-t border-line"
          >
            <div className="section shell">
              <div className="max-w-2xl">
                <span className="eyebrow">{cat}</span>
                <p className="mt-4 text-lg text-ink-600">
                  {categoryBlurbs[cat]}
                </p>
              </div>

              <div className="mt-10 space-y-14">
                {systems.map((system) => (
                  <article
                    key={system.slug}
                    id={system.slug}
                    className="card overflow-hidden"
                  >
                    {/* system header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-6 sm:p-7">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-semibold text-ink-400">
                            {String(system.id).padStart(2, "0")}
                          </span>
                          <h3 className="text-xl font-semibold tracking-tight text-ink-900">
                            {system.name}
                          </h3>
                        </div>
                        <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-500">
                          Engine modules: {system.modules}
                        </p>
                      </div>
                      <span className="tag">{system.feeStructure.split(".")[0]}</span>
                    </div>

                    {/* competitor table */}
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[760px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-line bg-ink-50">
                            {["Competitor", "Pricing model", "One-time fees", "Ongoing price", "Notes"].map(
                              (h) => (
                                <th
                                  key={h}
                                  className="px-6 py-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink-500 sm:px-7"
                                >
                                  {h}
                                </th>
                              ),
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {system.competitors.map((c) => (
                            <tr key={c.name} className="border-b border-line align-top">
                              <td className="px-6 py-4 font-semibold text-ink-900 sm:px-7">
                                {c.name}
                              </td>
                              <td className="px-6 py-4 sm:px-7">
                                <span className="whitespace-nowrap rounded-full border border-line bg-white px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink-700">
                                  {c.model}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-ink-700 sm:px-7">{c.oneTime}</td>
                              <td className="whitespace-nowrap px-6 py-4 font-mono text-xs font-semibold text-ink-900 sm:px-7">
                                {c.ongoing}
                              </td>
                              <td className="px-6 py-4 text-ink-600 sm:px-7">{c.notes}</td>
                            </tr>
                          ))}
                          {/* JST tiered rows (react to the monthly/hybrid toggle) */}
                          {(JST_PRICING[system.slug] ?? []).map((tier, ti) => {
                            const h = hybridFor(tier.monthly);
                            const monthly = model === "hybrid" ? h.monthly : tier.monthly;
                            return (
                              <tr
                                key={tier.name}
                                className={`bg-ink-950 align-top text-white ${
                                  ti === 0 ? "border-t-2 border-white/20" : ""
                                }`}
                              >
                                <td className="px-6 py-4 sm:px-7">
                                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <span className="font-semibold">J Supreme Tech</span>
                                    <span className="text-white/55">·</span>
                                    <span className="text-white/85">{tier.name}</span>
                                    {tier.popular ? (
                                      <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-ink-950">
                                        Popular
                                      </span>
                                    ) : null}
                                  </span>
                                </td>
                                <td className="px-6 py-4 sm:px-7">
                                  <span className="whitespace-nowrap rounded-full border border-white/25 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white">
                                    {model === "hybrid" ? "Setup + monthly" : "Flat monthly"}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-mono text-xs sm:px-7">
                                  {model === "hybrid" ? (
                                    <span className="font-semibold">{fmtJMD(h.setup)}</span>
                                  ) : (
                                    <span className="text-white/70">Included</span>
                                  )}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-mono text-xs font-semibold sm:px-7">
                                  {fmtJMD(monthly)}/mo
                                </td>
                                <td className="px-6 py-4 text-white/80 sm:px-7">
                                  {ti === 0
                                    ? `${tier.blurb} · ${TRIAL_DAYS}-day free trial, no free plan.`
                                    : tier.blurb}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* analysis */}
                    <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-3">
                      <div>
                        <h4 className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                          Market norm
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-ink-700">
                          {system.marketNorm}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                          Fee structure
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-ink-700">
                          {system.feeStructure}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                          The JST angle
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-ink-700">
                          {system.jstAngle}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ============================ CTA ============================ */}
      <section className="border-t border-line bg-ink-950 text-white">
        <div className="section shell text-center">
          <span className="eyebrow no-rule justify-center text-white/60">
            The bottom line
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            The market charges per seat, per unit, per minute — or takes a cut
            of every booking.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            J Supreme systems launch tiered, in JMD — choose monthly-only, or a
            one-time setup with a lower monthly. {TRIAL_DAYS}-day free trial, no
            free plan, no per-seat math, no commission. One engine.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contact" className="btn btn-on-dark">
              Start a Project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#pricing" className="btn btn-ghost-dark">
              Current JST pricing <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= DISCLAIMER ========================= */}
      <section className="shell py-8">
        <p className="mx-auto max-w-3xl text-center font-mono text-[0.62rem] uppercase leading-5 tracking-[0.12em] text-ink-400">
          Independent research by J Supreme Tech, {RESEARCH_DATE}. Competitor
          prices are published list prices (USD unless marked) from vendor
          pricing pages and 2026 buyer guides; &ldquo;~&rdquo; marks figures
          triangulated where vendors gate pricing behind sales calls. Prices
          change — verify with each vendor. All trademarks belong to their
          owners; no affiliation or endorsement implied.
        </p>
      </section>
    </main>
  );
}
