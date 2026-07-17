import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";

const REELS = [
  {
    src: "/reels/aboo-tours-reel.mp4",
    client: "Aboo Tours",
    title: "Jamaica Cinematic Reel",
    tag: "Reel · 2026",
  },
  {
    src: "/reels/876-spotlight-reel.mp4",
    client: "876 Luxury Car Wash",
    title: "Spotlight Reel",
    tag: "Reel · 2026",
  },
];

export function ShowreelSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white md:py-28">
      <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-40" />
      <div className="shell relative">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <span className="eyebrow no-rule text-white/40">Studio reels · 2026</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Motion work.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Link href="/#contact" className="btn btn-ghost-dark shrink-0">
              Commission a reel <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-6 md:grid-cols-2" amount={0.08}>
          {REELS.map((r) => (
            <RevealItem key={r.src}>
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
                {/* 9:16 portrait reel — matches Instagram/TikTok format */}
                <div className="relative aspect-[9/16] w-full overflow-hidden sm:aspect-[4/5]">
                  <video
                    src={r.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-3">
                  <div>
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/35">
                      {r.client}
                    </span>
                    <p className="mt-0.5 text-sm font-semibold text-white">{r.title}</p>
                  </div>
                  <span className="tag tag-dark text-[0.58rem]">{r.tag}</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
