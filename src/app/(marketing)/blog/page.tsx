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

function IssueCover({ issue }: { issue: { issueNumber: number; topStory?: { category: string; headline: string } } }) {
  const cat = issue.topStory?.category || "default";
  const { bg, accent, shape } = COVER_PALETTE[cat] ?? COVER_PALETTE.default;
  const n = issue.issueNumber;
  const seed = n % 10;

  /* Topic-relevant SVG art per category */
  const shapeArt: Record<string, string> = {
    // Neural network — AI
    circle: (() => {
      const nodes: [number, number][] = [[15,20],[15,52],[38,10],[38,35],[38,60],[63,22],[63,52],[83,38]];
      const edges = [[0,2],[0,3],[1,3],[1,4],[2,5],[3,5],[3,6],[4,6],[5,7],[6,7]];
      const ls = edges.map(([s,t]) => `<line x1="${nodes[s][0]}" y1="${nodes[s][1]}" x2="${nodes[t][0]}" y2="${nodes[t][1]}" stroke="${accent}28" stroke-width="0.9"/>`).join("");
      const ns = nodes.map(([cx,cy],i) => `<circle cx="${cx}" cy="${cy}" r="${i===7?3.5:i<2?2.2:1.8}" fill="${accent}${i===7?"cc":i<2?"66":"44"}"/>`).join("");
      return ls + ns;
    })(),
    // Circuit board traces — Tech
    lines: (() => {
      const traces = [
        `<line x1="0" y1="20" x2="100" y2="20" stroke="${accent}28" stroke-width="1"/>`,
        `<line x1="0" y1="42" x2="100" y2="42" stroke="${accent}28" stroke-width="1"/>`,
        `<line x1="0" y1="62" x2="100" y2="62" stroke="${accent}28" stroke-width="1"/>`,
        `<line x1="18" y1="20" x2="18" y2="42" stroke="${accent}28" stroke-width="1"/>`,
        `<line x1="45" y1="0" x2="45" y2="62" stroke="${accent}28" stroke-width="1"/>`,
        `<line x1="72" y1="20" x2="72" y2="80" stroke="${accent}28" stroke-width="1"/>`,
        `<line x1="88" y1="42" x2="88" y2="62" stroke="${accent}28" stroke-width="1"/>`,
      ];
      const pads: [number,number][] = [[18,20],[45,20],[72,20],[88,20],[18,42],[45,42],[72,42],[88,42],[45,62],[72,62]];
      const dots = pads.map(([cx,cy]) => `<rect x="${cx-2.5}" y="${cy-2.5}" width="5" height="5" fill="${accent}66" rx="1"/>`).join("");
      return traces.join("") + dots;
    })(),
    // Upward sparkline — Markets
    bars: (() => {
      const pts: [number,number][] = [[5,65],[15,55+seed%5],[25,50-seed%4],[35,45+seed%6],[48,38-seed%3],[58,30+seed%4],[68,22-seed%5],[80,16+seed%3],[93,10]];
      const d = pts.map(([x,y],i) => `${i===0?"M":"L"}${x},${y}`).join(" ");
      return [
        `<path d="${d} L93,78 L5,78 Z" fill="${accent}0d"/>`,
        `<path d="${d}" fill="none" stroke="${accent}77" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
        `<circle cx="93" cy="10" r="2.5" fill="${accent}cc"/>`,
        `<line x1="5" y1="78" x2="93" y2="78" stroke="${accent}22" stroke-width="0.8"/>`,
      ].join("");
    })(),
    // Candlestick chart — Finance
    grid: (() => {
      const candles = [{x:13,o:55,c:38,h:30,l:62},{x:28,o:40,c:55,h:32,l:60},{x:43,o:52,c:28,h:22,l:58},{x:58,o:30,c:20,h:15,l:35},{x:73,o:22,c:14,h:9,l:28},{x:88,o:16,c:8,h:4,l:22}];
      return candles.map(({x,o,c,h,l}) => {
        const top=Math.min(o,c), bot=Math.max(o,c), bull=c<o;
        return `<line x1="${x}" y1="${h}" x2="${x}" y2="${top}" stroke="${accent}66" stroke-width="0.8"/><rect x="${x-4}" y="${top}" width="8" height="${Math.max(bot-top,2)}" fill="${bull?accent+"55":accent+"18"}" stroke="${accent}66" stroke-width="0.8" rx="0.5"/><line x1="${x}" y1="${bot}" x2="${x}" y2="${l}" stroke="${accent}66" stroke-width="0.8"/>`;
      }).join("");
    })(),
    // Org chart — Business
    rings: [
      `<line x1="50" y1="19" x2="22" y2="38" stroke="${accent}44" stroke-width="0.8"/>`,
      `<line x1="50" y1="19" x2="78" y2="38" stroke="${accent}44" stroke-width="0.8"/>`,
      `<line x1="22" y1="47" x2="12" y2="62" stroke="${accent}33" stroke-width="0.8"/>`,
      `<line x1="22" y1="47" x2="33" y2="62" stroke="${accent}33" stroke-width="0.8"/>`,
      `<line x1="78" y1="47" x2="67" y2="62" stroke="${accent}33" stroke-width="0.8"/>`,
      `<line x1="78" y1="47" x2="88" y2="62" stroke="${accent}33" stroke-width="0.8"/>`,
      `<rect x="43" y="10" width="14" height="9" rx="2" fill="${accent}33" stroke="${accent}66" stroke-width="0.8"/>`,
      `<rect x="15" y="38" width="14" height="9" rx="2" fill="${accent}33" stroke="${accent}66" stroke-width="0.8"/>`,
      `<rect x="71" y="38" width="14" height="9" rx="2" fill="${accent}33" stroke="${accent}66" stroke-width="0.8"/>`,
      `<rect x="5" y="62" width="14" height="9" rx="2" fill="${accent}33" stroke="${accent}66" stroke-width="0.8"/>`,
      `<rect x="26" y="62" width="14" height="9" rx="2" fill="${accent}33" stroke="${accent}66" stroke-width="0.8"/>`,
      `<rect x="60" y="62" width="14" height="9" rx="2" fill="${accent}33" stroke="${accent}66" stroke-width="0.8"/>`,
      `<rect x="81" y="62" width="14" height="9" rx="2" fill="${accent}33" stroke="${accent}66" stroke-width="0.8"/>`,
    ].join(""),
    // Topographic contours — Caribbean
    waves: [
      `<path d="M0 68 C20 52 30 58 50 54 S80 48 100 36" fill="none" stroke="${accent}55" stroke-width="1.2"/>`,
      `<path d="M0 56 C20 40 30 46 50 42 S80 36 100 24" fill="none" stroke="${accent}44" stroke-width="1.1"/>`,
      `<path d="M0 44 C20 28 30 34 50 30 S80 24 100 12" fill="none" stroke="${accent}33" stroke-width="1"/>`,
      `<path d="M0 32 C25 16 35 22 55 18 S85 12 100 2" fill="none" stroke="${accent}22" stroke-width="0.9"/>`,
      `<path d="M0 20 C25 4 40 10 60 6" fill="none" stroke="${accent}15" stroke-width="0.8"/>`,
    ].join(""),
    // Broadcast tower + signal arcs — Jamaica
    zigzag: [
      `<line x1="50" y1="72" x2="50" y2="34" stroke="${accent}66" stroke-width="1.5"/>`,
      `<line x1="50" y1="72" x2="32" y2="80" stroke="${accent}44" stroke-width="1"/>`,
      `<line x1="50" y1="72" x2="68" y2="80" stroke="${accent}44" stroke-width="1"/>`,
      `<line x1="50" y1="55" x2="40" y2="63" stroke="${accent}33" stroke-width="0.8"/>`,
      `<line x1="50" y1="55" x2="60" y2="63" stroke="${accent}33" stroke-width="0.8"/>`,
      `<path d="M36 50 Q28 42 36 34" fill="none" stroke="${accent}55" stroke-width="1.2"/>`,
      `<path d="M64 50 Q72 42 64 34" fill="none" stroke="${accent}55" stroke-width="1.2"/>`,
      `<path d="M28 56 Q16 42 28 28" fill="none" stroke="${accent}33" stroke-width="1"/>`,
      `<path d="M72 56 Q84 42 72 28" fill="none" stroke="${accent}33" stroke-width="1"/>`,
      `<path d="M20 62 Q4 42 20 22" fill="none" stroke="${accent}1a" stroke-width="0.8"/>`,
      `<path d="M80 62 Q96 42 80 22" fill="none" stroke="${accent}1a" stroke-width="0.8"/>`,
      `<circle cx="50" cy="32" r="3.5" fill="${accent}99"/>`,
      `<circle cx="50" cy="32" r="6" fill="none" stroke="${accent}33" stroke-width="0.8"/>`,
    ].join(""),
    // Globe grid — World
    dots: [
      `<ellipse cx="50" cy="40" rx="36" ry="32" fill="none" stroke="${accent}44" stroke-width="0.8"/>`,
      `<path d="M17 26 Q50 18 83 26" fill="none" stroke="${accent}28" stroke-width="0.8"/>`,
      `<path d="M14 40 Q50 32 86 40" fill="none" stroke="${accent}28" stroke-width="0.8"/>`,
      `<path d="M17 54 Q50 62 83 54" fill="none" stroke="${accent}28" stroke-width="0.8"/>`,
      `<line x1="50" y1="8" x2="50" y2="72" stroke="${accent}22" stroke-width="0.8"/>`,
      `<path d="M50 8 Q32 40 50 72" fill="none" stroke="${accent}22" stroke-width="0.8"/>`,
      `<path d="M50 8 Q68 40 50 72" fill="none" stroke="${accent}22" stroke-width="0.8"/>`,
      `<circle cx="62" cy="48" r="2" fill="${accent}88"/>`,
    ].join(""),
  };

  const shapeSvg = shapeArt[shape] ?? shapeArt.grid;
  const svgData = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 80'>${shapeSvg}</svg>`;
  const svgUrl = `data:image/svg+xml,${encodeURIComponent(svgData)}`;

  return (
    <div
      className="relative flex h-44 w-full flex-none flex-col justify-between overflow-hidden p-5"
      style={{ background: bg }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={svgUrl} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80" />

      <span
        className="relative z-10 w-fit rounded-full px-2.5 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.16em]"
        style={{ background: `${accent}22`, color: accent }}
      >
        {cat}
      </span>

      <div className="relative z-10">
        <span
          className="font-display text-5xl font-black leading-none"
          style={{ color: accent }}
        >
          #{String(n).padStart(2, "0")}
        </span>
      </div>

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
                      {issue.topStory?.headline}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">
                      {issue.topStory?.body}
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