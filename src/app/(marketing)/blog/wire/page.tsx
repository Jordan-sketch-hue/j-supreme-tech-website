import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { getWire } from "@/lib/blog";
import { NewsletterCard } from "@/components/newsletter/forms";
import { Reveal } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "The Wire — Signal We're Watching | J Supreme Tech",
  description:
    "A daily curated read across AI, science, technology, markets, education and big ideas — each with our own commentary. External sources, attributed and linked — not affiliated with J Supreme Tech.",
  alternates: { canonical: "/blog/wire" },
};

const LABELS: Record<string, string> = {
  ai: "AI",
  science: "Science",
  tech: "Tech",
  graphics: "Graphics",
  markets: "Markets",
  world: "World",
  education: "Education",
  ideas: "Ideas",
  marketing: "Marketing",
  trading: "Trading",
};

// Categories that have a licensed monochrome cover image in /public/wire/<category>.jpg.
const COVER_CATEGORIES = new Set<string>([
  "ai",
  "science",
  "tech",
  "graphics",
  "markets",
  "world",
  "education",
  "ideas",
]);

export default function WirePage() {
  const wire = getWire();

  return (
    <main className="bg-white text-ink-900">
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative py-16 md:py-20">
          <nav className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400">
            <Link href="/blog" className="hover:text-ink-900">Newsletter</Link> / The Wire
          </nav>
          <Reveal>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-[3.2rem] md:leading-[1.05]">The Wire</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-500">
              Signal from the wider field — AI, science, technology, markets and big ideas, each with a line of our own commentary. Updated daily. We link out; we don't reprint.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell section !py-14">
        {wire.length ? (
          <ul className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
            {wire.map((w, i) => (
              <li key={i}>
                <a href={w.url} target="_blank" rel="noreferrer noopener" className="group flex gap-5 py-6">
                  {COVER_CATEGORIES.has(w.category) ? (
                    <div className="relative hidden h-24 w-24 flex-none overflow-hidden rounded-xl border border-line bg-ink-50 sm:block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/wire/${w.category}.jpg`}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-ink-600">
                        {LABELS[w.category] ?? "Signal"}
                      </span>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-400">{w.source}</span>
                      <ArrowUpRight className="ml-auto h-4 w-4 text-ink-400 transition group-hover:text-ink-900" />
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink-900 group-hover:underline">{w.title}</h2>
                    <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-600">{w.summary}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mx-auto max-w-3xl text-center text-ink-500">The Wire is being curated. Check back shortly.</p>
        )}

        {/* legal note */}
        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-ink-50 p-5">
          <Info className="mt-0.5 h-4 w-4 flex-none text-ink-500" />
          <p className="text-xs leading-relaxed text-ink-500">
            The Wire links to third-party websites for reference and commentary. Headlines and summaries here are written by J Supreme Tech; we do not republish source content. All trademarks and copyrights belong to their respective owners, who do not endorse or sponsor J Supreme Tech. Links are provided “as is” — see our{" "}
            <Link href="/disclaimer" className="underline hover:text-ink-900">disclaimer</Link>.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <NewsletterCard source="wire" />
        </div>
      </section>
    </main>
  );
}
