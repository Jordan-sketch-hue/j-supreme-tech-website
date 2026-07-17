import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Reveal } from "@/components/motion-kit";

export function ShowreelSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white md:py-28">
      <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-40" />
      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <span className="eyebrow no-rule text-white/40">Studio reel · 2026</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                12 platforms.<br />
                <span className="text-white/35">One standard.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-base leading-7 text-white/50">
                A quick walkthrough of what we&apos;ve built — logistics systems, booking apps,
                CRMs, storefronts, and the marketing creative that drives them.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <Link href="/#work" className="btn btn-on-dark mt-8">
                See all work <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          {/* Reel frame */}
          <Reveal direction="left" delay={0.15}>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
              <div className="relative aspect-video w-full">
                {/* Placeholder until reel video is uploaded */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="grid grid-cols-3 gap-1.5 opacity-20">
                    {["bpcouriers.online","thelanguagecradle.com","ridelink-jamaica.vercel.app",
                      "ferguson-law.vercel.app","jsupremeconglomerate.online","the-cleanser-ja.vercel.app"].map((h) => (
                      <div key={h} className="aspect-video w-20 rounded-lg bg-white/10" />
                    ))}
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition group-hover:bg-white/10">
                    <Play className="h-6 w-6 fill-white text-white" />
                  </div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/30">
                    Reel dropping soon
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.08] px-5 py-3">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/30">
                  JST Studio Reel 2026
                </span>
                <span className="tag tag-dark text-[0.58rem]">2:40</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
