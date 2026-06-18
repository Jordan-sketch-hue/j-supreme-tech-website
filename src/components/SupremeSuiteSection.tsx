import Link from "next/link";
import { ArrowRight, ExternalLink, MonitorDown, Palette, ShieldCheck, Sparkles, Timer } from "lucide-react";
import { Showreel } from "@/components/products/showreel";
import { SUITE_SYSTEMS, suiteLinks } from "@/lib/supremeSuite";

/** Homepage band introducing the Supreme Suite SaaS product line. */
export function SupremeSuiteSection() {
  return (
    <section id="products" className="relative overflow-hidden bg-ink-950 text-white">
      <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-50" />
      <div className="shell relative py-20 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="eyebrow no-rule text-white/55">Products · Supreme Suite — our SaaS line</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {SUITE_SYSTEMS.length} ready-made business systems.
              <span className="block text-white/60">Branded as yours. Live in minutes.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">
              Beyond custom builds, we productized the systems we build best: complete CRMs with branded websites and
              AI staff for couriers, movers, salons, schools, restaurants and more. Upload your logo, pick your colors
              — every workspace feels custom because it is.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Timer, t: "3-day free trial", b: "Full product, no card — continue only if it earns it." },
                { icon: Palette, t: "White-label branding", b: "Your logo & colors everywhere, even the app icon." },
                { icon: Sparkles, t: "AI chatbot + voice agent", b: "Answering, quoting and booking 24/7." },
                { icon: MonitorDown, t: "Installable desktop app", b: "Own window, own icon, works offline." },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.t} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <Icon className="mt-0.5 h-4 w-4 flex-none text-white" />
                    <div>
                      <p className="text-[0.8rem] font-semibold">{f.t}</p>
                      <p className="text-[0.72rem] leading-relaxed text-white/55">{f.b}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn btn-on-dark">
                Explore all {SUITE_SYSTEMS.length} products <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={suiteLinks.trial()}
                target="_blank"
                rel="noreferrer"
                className="btn border border-white/25 bg-transparent text-white hover:border-white/60 hover:bg-white/10"
              >
                Start a free trial <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <a
              href={suiteLinks.status}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45 hover:text-white/80"
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Every page & workflow publicly self-checked — run it yourself
            </a>
          </div>

          {/* Live showreel — the real layouts, running */}
          <div className="min-w-0">
            <div className="rounded-2xl bg-white p-4 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] sm:p-5">
              <Showreel />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
              {SUITE_SYSTEMS.slice(0, 7).map((s) => (
                <Link
                  key={s.slug}
                  href={`/products/${s.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white"
                >
                  <span className="h-1 w-1 rounded-full" style={{ background: s.accent }} />
                  {s.shortName}
                </Link>
              ))}
              <Link
                href="/products"
                className="inline-flex items-center gap-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/70 underline underline-offset-4 hover:text-white"
              >
                +{SUITE_SYSTEMS.length - 7} more <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
