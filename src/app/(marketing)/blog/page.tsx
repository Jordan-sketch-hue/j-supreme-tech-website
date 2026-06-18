import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getAllArticles, getFeatured, getLatest, getWire, categoryCounts } from "@/lib/blog";
import { CATEGORIES, CATEGORY_ORDER, formatDate } from "@/lib/blog-taxonomy";
import { Cover } from "@/components/blog/cover";
import { ArticleCard } from "@/components/blog/article-card";
import { NewsletterCard } from "@/components/newsletter/forms";
import { BlogJsonLd } from "@/components/blog/jsonld";
import { CineWords } from "@/components/CineWords";
import { Reveal, RevealGroup, RevealItem, ScrollProgress } from "@/components/motion-kit";

const DESCRIPTION =
  "The Signal is the J Supreme Tech studio publication — engineering, marketing and the markets. Production logs, playbooks and research, straight from the bench.";

export const metadata: Metadata = {
  title: "The Signal — Studio Publication | J Supreme Tech",
  description: DESCRIPTION,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
  openGraph: { title: "The Signal — J Supreme Tech", description: DESCRIPTION, url: "https://jsupremetech.online/blog" },
};

export default function BlogHub() {
  const all = getAllArticles();
  const featured = getFeatured();
  const counts = categoryCounts();
  const wire = getWire().slice(0, 4);
  const rest = featured ? getLatest(9, featured.slug) : getLatest(9);

  return (
    <main className="bg-white text-ink-900">
      <BlogJsonLd description={DESCRIPTION} />
      <ScrollProgress className="bg-ink-900" />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative py-16 md:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">The Signal · studio publication</span>
            </Reveal>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-[3.4rem] md:leading-[1.04]">
              <CineWords text="Signal over noise." delay={0.15} />
            </h1>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
                Engineering, marketing and the markets — production logs, playbooks and research from the J Supreme Tech studio. Categorized, predictable, newest first.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {CATEGORY_ORDER.map((key) => (
                  <Link
                    key={key}
                    href={`/blog/category/${key}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-ink-700 transition hover:-translate-y-0.5 hover:border-ink-900 hover:text-ink-900"
                  >
                    {CATEGORIES[key].short}
                    <span className="text-ink-400">{counts[key] ?? 0}</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Featured ---------- */}
      {featured ? (
        <section className="shell pt-14">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <article className="card card-hover grid overflow-hidden lg:grid-cols-2">
                <div className="relative aspect-[16/10] border-b border-line lg:aspect-auto lg:border-b-0 lg:border-r">
                  <Cover motif={featured.motif} seed={featured.slug} className="h-full w-full" label={featured.title} />
                  <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-ink-950 px-3 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white">
                    Featured
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink-400">
                    <span>{CATEGORIES[featured.category].label}</span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(featured.date)}</span>
                    <span aria-hidden>·</span>
                    <span>{featured.readMinutes} min</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-[1rem] leading-relaxed text-ink-600">{featured.deck}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-900">
                    Read the piece <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Link>
          </Reveal>
        </section>
      ) : null}

      {/* ---------- Latest grid ---------- */}
      {rest.length ? (
        <section className="shell pt-14">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Latest dispatches</h2>
            <Link href="/blog/wire" className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-500 hover:text-ink-900">
              The Wire →
            </Link>
          </div>
          <RevealGroup className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
            {rest.map((a) => (
              <RevealItem key={a.slug}>
                <ArticleCard article={a} />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      ) : (
        <section className="shell pt-14">
          <div className="card p-10 text-center">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-400">The Signal is warming up</p>
            <p className="mt-3 text-ink-600">New dispatches are landing shortly. Join the Debrief to get the first read.</p>
          </div>
        </section>
      )}

      {/* ---------- The Wire (external) ---------- */}
      {wire.length ? (
        <section className="shell pt-16">
          <div className="rounded-3xl border border-line bg-ink-50/60 p-8 sm:p-10">
            <div className="flex items-end justify-between">
              <div>
                <span className="eyebrow">The Wire · what we're watching</span>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">Signal from the wider field</h2>
              </div>
              <Link href="/blog/wire" className="hidden font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-500 hover:text-ink-900 sm:inline">
                See all →
              </Link>
            </div>
            <ul className="mt-7 divide-y divide-line border-t border-line">
              {wire.map((w, i) => (
                <li key={i}>
                  <a href={w.url} target="_blank" rel="noreferrer noopener" className="group flex items-center gap-4 py-4">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-400">{w.source}</span>
                    <span className="flex-1 text-[0.95rem] text-ink-700 group-hover:text-ink-900">{w.title}</span>
                    <ArrowUpRight className="h-4 w-4 flex-none text-ink-400 transition group-hover:text-ink-900" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400">
              External sources · linked with commentary · not affiliated with J Supreme Tech
            </p>
          </div>
        </section>
      ) : null}

      {/* ---------- Newsletter ---------- */}
      <section className="shell py-16">
        <NewsletterCard source="blog-hub" />
      </section>
    </main>
  );
}
