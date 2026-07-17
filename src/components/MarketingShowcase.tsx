"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MARKETING_SAMPLES } from "@/lib/portfolio";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";

const reels   = MARKETING_SAMPLES.filter((m) => m.tag === "Reel" || m.tag === "Campaign");
const feeds   = MARKETING_SAMPLES.filter((m) => m.tag === "Feed");
const stories = MARKETING_SAMPLES.filter((m) => m.tag === "Story");
const [featured] = reels;

export function MarketingShowcase() {
  return (
    <section id="marketing" className="relative overflow-hidden bg-ink-950 py-24 md:py-32">
      <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-40" />

      <div className="shell relative">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal direction="up">
              <span className="eyebrow no-rule text-white/40">
                Marketing &amp; Design
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                We design the brand.<br />
                <span className="text-white/35">Not just the build.</span>
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="mt-5 text-lg leading-8 text-white/50">
                Campaigns, social creative, brand identity, and ad systems — real work run for live clients
                across Jamaica and the Caribbean.
              </p>
            </Reveal>
          </div>
          <Reveal direction="up" delay={0.2}>
            <Link
              href="#services"
              className="hidden shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-white/40 hover:text-white transition-colors md:inline-flex"
            >
              See marketing packages
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        {/* Featured hero piece */}
        <Reveal direction="up" delay={0.15}>
          <div className="group relative mt-14 overflow-hidden rounded-2xl border border-white/10">
            <div className="relative aspect-[16/7] w-full overflow-hidden bg-ink-900">
              <Image
                src={featured.src}
                alt={featured.title}
                fill
                sizes="100vw"
                className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
            </div>
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6 md:p-8">
              <div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
                  {featured.client}
                </span>
                <h3 className="mt-1 text-xl font-semibold text-white md:text-2xl">
                  {featured.title}
                </h3>
              </div>
              <span className="tag tag-dark shrink-0">{featured.tag}</span>
            </div>
          </div>
        </Reveal>

        {/* Feed posts */}
        <div className="mt-10">
          <Reveal>
            <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/30">Feed Posts</p>
          </Reveal>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.05}>
            {feeds.map((m) => (
              <RevealItem key={m.src}>
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-ink-900">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image src={m.src} alt={m.title} fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover object-top transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/90 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/50">{m.client}</span>
                      <p className="mt-0.5 text-xs font-semibold text-white leading-4">{m.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-white/[0.07] px-3 py-2">
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/30">{m.client}</span>
                    <span className="tag tag-dark text-[0.55rem]">{m.tag}</span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Stories */}
        <div className="mt-8">
          <Reveal>
            <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/30">Stories</p>
          </Reveal>
          <RevealGroup className="grid gap-4 grid-cols-3 sm:grid-cols-4 lg:grid-cols-6" amount={0.05}>
            {stories.map((m) => (
              <RevealItem key={m.src}>
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-ink-900">
                  <div className="relative aspect-[9/16] w-full overflow-hidden">
                    <Image src={m.src} alt={m.title} fill sizes="20vw" className="object-cover object-top transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/90 via-transparent to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/50">{m.client}</span>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Bottom CTA strip */}
        <Reveal direction="up" delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-6 sm:flex-row">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/35">
                Done-for-you · Monthly retainers
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                Social media, ad creative, brand strategy — managed monthly.
              </p>
            </div>
            <Link href="#services" className="btn btn-on-dark shrink-0">
              See packages &amp; pricing
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
