import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getInTodaysWorldIssues, readerUrl } from "@/lib/inTodaysWorld";
import { NewsletterCard } from "@/components/newsletter/forms";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "In Today's World: — Daily Intelligence | J Supreme Tech",
  description:
    "Every issue of In Today's World: — technology, AI, marketing, finance, Caribbean and Jamaica coverage, published every weekday morning. Live archive.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: {
    title: "In Today's World: — J Supreme Tech",
    description:
      "Daily tech, AI, markets, and Caribbean coverage. Weekday mornings — signal over noise.",
    url: "https://jsupremetech.online/blog",
    type: "website",
  },
};

export const revalidate = 3600;

/* ── Cover palette per category ── */
const COVER_PALETTE: Record<string, { bg: string; accent: string; shape: string }> = {
  AI:       { bg: "#0a0a1a", accent: "#7c3aed", shape: "circle" },
  Tech:     { bg: "#051020", accent: "#0ea5e9", shape: "lines" },
  Markets:  { bg: "#0a1a0a", accent: "#10b981", shape: "bars" },
  Finance:  { bg: "#1a0a00", accent: "#f59e0b", shape: "grid" },
  Business: { bg: "#0a000a", accent: "#ec4899", shape: "rings" },
  Caribbean:{ bg: "#001a1a", accent: "#06b6d4", shape: "waves" },
  Jamaica:  { bg: "#0a1400", accent: "#84cc16", shape: "zigzag" },
  World:    { bg: "#100010", accent: "#a78bfa", shape: "dots" },
  default:  { bg: "#0d0d0d", accent: "#6b7280", shape: "grid" },
};

function IssueCover({ issue }: { issue: { issueNumber: number; topStory: { category: string; headline: string } } }) {
  const cat = issue.topStory.category || "default";
  const { bg, accent, shape } = COVER_PALETTE[cat] ?? COVER_PALETTE.default;
  const n = issue.issueNumber;

  /* Generate a unique but deterministic offset per issue */
  const seed = (n * 137) % 360;

  /* SVG shape layer */
  const shapeSvg = shape === "circle"
    ? `<circle cx="${40 + (seed % 30)}" cy="${30 + (seed % 20)}" r="${45 + (seed % 25)}" fill="${accent}18" /><circle cx="${70 - (seed % 15)}" cy="${60 + (seed % 10)}" r="${20 + (seed % 15)}" fill="${accent}10" />`
    : shape === "lines"
    ? Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${10 + i * 14}" x2="100" y2="${14 + i * 12}" stroke="${accent}20" stroke-width="1" vector-effect="non-scaling-stroke" />`).join("")
    : shape === "bars"
    ? Array.from({ length: 10 }, (_, i) => `<rect x="${5 + i * 9}" y="${25 + (seed * (i + 1)) % 40}" width="6" height="${10 + (seed * (i + 2)) % 30}" fill="${accent}22" rx="2" />`).join("")
    : shape === "rings"
    ? `<circle cx="50" cy="50" r="35" fill="none" stroke="${accent}18" stroke-width="8" /><circle cx="50" cy="50" r="22" fill="none" stroke="${accent}14" stroke-width="5" />`
    : shape === "dots"
    ? Array.from({ length: 20 }, (_, i) => `<circle cx="${(i * 17 + seed) % 100}" cy="${(i * 23 + seed * 2) % 80}" r="${2 + (i % 3)}" fill="${accent}30" />`).join("")
    : `<rect x="10" y="10" width="30" height="30" fill="none" stroke="${accent}18" stroke-width="1" /><rect x="25" y="25" width="50" height="50" fill="none" stroke="${accent}12" stroke-width="1" /><rect x="60" y="5" width="20" height="60" fill="none" stroke="${accent}10" stroke-width="1" />`;

  const svgData = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 80'>${shapeSvg}</svg>`;
  const svgUrl = `data:image/svg+xml,${encodeURIComponent(svgData)}`;

  return (
    <div
      className="relative flex h-44 w-full flex-none flex-col justify-between overflow-hidden p-5"
      style={{ background: bg }}
    >
      {/* Background SVG art */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={svgUrl} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80" />

      {/* Category pill */}
      <span
        className="relative z-10 w-fit rounded-full px-2.5 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.16em]"
        style={{ background: `${accent}22`, color: accent }}
      >
        {cat}
      </span>

      {/* Issue number */}
      <div className="relative z-10">
        <span
          className="font-display text-5xl font-black leading-none"
          style={{ color: accent }}
        >
          #{String(n).padStart(2, "0")}
        </span>
      </div>

      {/* Spectrum bar */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full" style={{ background: "var(--sp-h)" }} />
    </div>
  );
}

export default async function BlogPage() {
  const issues = await getInTodaysWorldIssues(50);
  const sorted = [...issues].sort((a, b) => b.issueNumber - a.issueNumber);

  return (
    <main className="bg-white text-ink-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative py-16 md:py-20">
          <Reveal>
            <span className="eyebrow">In Today&apos;s World: &middot; daily dispatch</span>
          </Reveal>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-[3.4rem] md:leading-[1.04]">
            In Today&apos;s World:
          </h1>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
              Technology, AI, markets, finance, Caribbean and Jamaica — one signal every weekday
              morning. Every issue archived live.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/newsletter"
                className="rounded-full bg-ink-900 px-5 py-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-ink-700"
              >
                Subscribe free →
              </Link>
              <a
                href="https://communications.jsupremetech.online"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink-500 transition hover:text-ink-900"
              >
                Read in browser <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Issue grid */}
      <section className="shell section !py-14">
        {sorted.length ? (
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" amount={0.08}>
            {sorted.map((issue) => (
              <RevealItem key={issue.issueNumber}>
                <a
                  href={readerUrl(issue)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.22)]"
                >
                  <IssueCover issue={issue} />
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-[1.05rem] font-semibold leading-snug tracking-tight text-ink-900 group-hover:underline">
                      {issue.topStory.headline}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">
                      {issue.topStory.body}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ink-400">
                        {issue.dateFormatted}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ink-500 transition group-hover:text-ink-900">
                        Read issue <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <p className="mx-auto max-w-3xl text-center text-ink-500">
            Archive loading — check back shortly.
          </p>
        )}

        <div className="mx-auto mt-14 max-w-3xl">
          <NewsletterCard source="blog-archive" />
        </div>
      </section>
    </main>
  );
}
