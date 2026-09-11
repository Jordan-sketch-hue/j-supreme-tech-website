import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, Zap, Brain, TrendingUp, Globe, Lock } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "Games — Beta · First Edition | J Supreme Tech",
  description:
    "First-edition browser games from J Supreme Tech. All are welcome to play — these are early beta releases and your feedback shapes what's next.",
  alternates: { canonical: "/games" },
  openGraph: {
    title: "Games — Beta · First Edition | J Supreme Tech",
    description: "All are welcome to play — early beta, first edition, built by JST.",
    url: "https://jsupremetech.online/games",
  },
};

const GAMES = [
  {
    slug: "market-mind",
    name: "Market Mind",
    tagline: "Test your financial intuition",
    description:
      "Read real market scenarios and make calls — buy, hold, or sell. See how your instincts stack up against historical outcomes.",
    icon: TrendingUp,
    color: "from-emerald-500/10 to-transparent",
    accent: "#10b981",
    status: "beta",
    available: false,
  },
  {
    slug: "tech-trivia",
    name: "Tech Trivia",
    tagline: "How deep is your tech knowledge?",
    description:
      "AI, software, Caribbean tech, and global industry. 10 questions, timed, ranked. Updated weekly from In Today's World: topics.",
    icon: Brain,
    color: "from-violet-500/10 to-transparent",
    accent: "#8b5cf6",
    status: "beta",
    available: false,
  },
  {
    slug: "word-sprint",
    name: "Word Sprint",
    tagline: "Think fast, type faster",
    description:
      "Tech and business vocabulary in a rapid-fire word game. Build your domain vocabulary while competing for the leaderboard.",
    icon: Zap,
    color: "from-amber-500/10 to-transparent",
    accent: "#f59e0b",
    status: "beta",
    available: false,
  },
  {
    slug: "region-radar",
    name: "Region Radar",
    tagline: "How well do you know the Caribbean?",
    description:
      "Geography, business, culture, and current events across the Caribbean and Jamaica. Quick rounds, rotating question sets.",
    icon: Globe,
    color: "from-sky-500/10 to-transparent",
    accent: "#0ea5e9",
    status: "beta",
    available: false,
  },
];

export default function GamesPage() {
  return (
    <main className="bg-white text-ink-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-ink-950">
        <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-20" />
        <div className="shell relative py-16 md:py-24">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Beta &middot; First Edition
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 flex items-center gap-4 font-display text-4xl font-semibold tracking-tight text-white md:text-[3.2rem] md:leading-[1.05]">
              <Gamepad2 className="h-9 w-9 flex-none text-white/40" />
              JST Games
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/55">
              First-edition games built by J Supreme Tech. All are welcome to play — these are early
              beta releases. Your play shapes what ships next.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/30">
              Free &middot; No account required &middot; Browser-based
            </p>
          </Reveal>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full" style={{ background: "var(--sp-h)" }} />
      </section>

      {/* Games grid */}
      <section className="shell section">
        <RevealGroup className="grid gap-6 sm:grid-cols-2" amount={0.08}>
          {GAMES.map((game) => (
            <RevealItem key={game.slug}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.18)]">
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} pointer-events-none`} />
                <div className="pointer-events-none absolute top-0 left-0 h-[2px] w-full" style={{ background: game.accent }} />

                <div className="relative flex flex-1 flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line bg-white shadow-sm"
                      style={{ color: game.accent }}
                    >
                      <game.icon className="h-5 w-5" />
                    </span>
                    <span className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-50 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Beta
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink-900">
                    {game.name}
                  </h2>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400">
                    {game.tagline}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">
                    {game.description}
                  </p>

                  <div className="mt-6">
                    {game.available ? (
                      <Link
                        href={`/games/${game.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-ink-700"
                      >
                        Play now
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-50 px-5 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink-400">
                        <Lock className="h-3 w-3" />
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Beta notice */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-line bg-ink-50 p-6 text-center">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400">
              First Edition Beta
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">
              You&apos;re playing first-edition releases
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">
              These games are early builds. All are welcome to play — your sessions help us shape
              difficulty, content, and mechanics. More games ship regularly.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-5 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-ink-700"
              >
                Get notified via newsletter
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-5 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-ink-700 transition hover:border-ink-300"
              >
                Send feedback
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
