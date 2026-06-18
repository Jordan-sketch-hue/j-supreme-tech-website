"use client";

import {
  AnimatedGradient,
  BorderBeam,
  confettiCannons,
  CountUp,
  fireConfetti,
  fireworks,
  Magnetic,
  Marquee,
  Parallax,
  Reveal,
  RevealGroup,
  RevealItem,
  ScrollProgress,
  SmoothScroll,
  SpotlightCard,
  TextReveal,
  TiltCard,
  Typewriter,
} from "../../components/motion-kit";

const stats: { label: string; value: number; suffix: string; decimals?: number }[] = [
  { label: "Projects shipped", value: 55, suffix: "+" },
  { label: "Brands served", value: 18, suffix: "" },
  { label: "Avg. build speed", value: 4.8, suffix: "x", decimals: 1 },
  { label: "Client satisfaction", value: 100, suffix: "%" },
];

const services = [
  "Websites",
  "Mobile Apps",
  "Ad Campaigns",
  "E-Commerce",
  "Branding",
  "Automation",
  "CRM Systems",
  "Analytics",
];

export default function MotionKitDemo() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-white text-zinc-900">
        <ScrollProgress className="bg-zinc-900" />

        {/* Hero */}
        <section className="relative overflow-hidden">
          <AnimatedGradient colors={["#a5b4fc", "#f9a8d4", "#fde68a"]} opacity={0.45} />
          <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 text-center">
            <Reveal direction="down" duration={0.5}>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
                J Supreme Motion Kit
              </p>
            </Reveal>
            <TextReveal
              as="h1"
              text="Premium motion for every build"
              className="text-5xl font-bold tracking-tight md:text-7xl"
            />
            <Reveal delay={0.35}>
              <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-600">
                We ship{" "}
                <Typewriter
                  words={["websites", "mobile apps", "campaigns", "brands"]}
                  className="font-semibold text-zinc-900"
                />{" "}
                with motion baked in.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => fireConfetti()}
                    className="rounded-full bg-zinc-900 px-7 py-3 text-sm font-semibold text-white"
                  >
                    Fire confetti
                  </button>
                </Magnetic>
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => fireworks(2000)}
                    className="rounded-full border border-zinc-300 px-7 py-3 text-sm font-semibold"
                  >
                    Fireworks
                  </button>
                </Magnetic>
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => confettiCannons()}
                    className="rounded-full border border-zinc-300 px-7 py-3 text-sm font-semibold"
                  >
                    Cannons
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Animated stats */}
        <section className="border-y border-zinc-200 bg-zinc-50">
          <RevealGroup className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
            {stats.map((s) => (
              <RevealItem key={s.label} className="text-center">
                <div className="text-4xl font-bold">
                  <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <p className="mt-2 text-sm text-zinc-500">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Marquee */}
        <section className="py-16">
          <Marquee speed={26} className="border-y border-zinc-100 py-6">
            {services.map((s) => (
              <span key={s} className="text-2xl font-semibold tracking-tight text-zinc-300">
                {s}
              </span>
            ))}
          </Marquee>
        </section>

        {/* Interactive cards */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <TextReveal
            as="h2"
            text="Interactive surfaces"
            className="text-3xl font-bold tracking-tight"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <TiltCard className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-semibold">Tilt card</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Tracks the pointer in 3D. Great for product shots, pricing tiers and
                feature grids.
              </p>
            </TiltCard>
            <SpotlightCard className="rounded-2xl bg-zinc-950 p-7 text-white">
              <h3 className="text-lg font-semibold">Spotlight card</h3>
              <p className="mt-2 text-sm text-zinc-400">
                A soft light follows the cursor. Move the mouse over this card to see it.
              </p>
            </SpotlightCard>
            <div className="relative rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
              <BorderBeam color="#111111" duration={5} />
              <h3 className="text-lg font-semibold">Border beam</h3>
              <p className="mt-2 text-sm text-zinc-600">
                An animated highlight orbits the border. Perfect for a featured plan or
                CTA.
              </p>
            </div>
          </div>
        </section>

        {/* Parallax band */}
        <section className="relative overflow-hidden bg-zinc-950 py-28 text-white">
          <Parallax speed={0.45} className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
              Parallax
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Depth that sells the <span className="mk-shimmer">premium</span> feel
            </h2>
          </Parallax>
        </section>

        {/* Reveal directions */}
        <section className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-bold tracking-tight">Scroll reveals</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {(["up", "down", "left", "right"] as const).map((dir) => (
              <Reveal
                key={dir}
                direction={dir}
                className="rounded-2xl border border-zinc-200 p-6 text-center"
              >
                <p className="font-mono text-sm text-zinc-500">direction</p>
                <p className="mt-1 text-xl font-semibold">{dir}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-16 text-center text-sm text-zinc-400">
            J Supreme Motion Kit — delete this route anytime. Components live in
            components/motion-kit.
          </p>
        </section>
      </main>
    </SmoothScroll>
  );
}
