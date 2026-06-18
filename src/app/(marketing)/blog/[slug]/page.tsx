import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { getAllArticles, getArticle, getRelated } from "@/lib/blog";
import { CATEGORIES, formatDate, tableOfContents } from "@/lib/blog-taxonomy";
import { Cover } from "@/components/blog/cover";
import { ArticleBody } from "@/components/blog/blocks";
import { ArticleCard } from "@/components/blog/article-card";
import { ShareBar } from "@/components/blog/share";
import { TableOfContents } from "@/components/blog/toc";
import { ArticleJsonLd } from "@/components/blog/jsonld";
import { NewsletterCard } from "@/components/newsletter/forms";
import { ScrollProgress } from "@/components/motion-kit";
import { AffiliateTools } from "@/components/ads/affiliate";
import { AdSlot } from "@/components/ads/ad-slot";

// Articles render on-demand (ISR) and cache — keeps the production build light
// (no per-article prerender) and lets new articles appear without a full rebuild.
export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Not found — The Signal" };
  const cat = CATEGORIES[article.category];
  return {
    title: `${article.title} — The Signal`,
    description: article.excerpt,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `https://jsupremetech.online/blog/${article.slug}`,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [article.author],
      section: cat.label,
      tags: article.tags,
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt },
  };
}

function monogram(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const cat = CATEGORIES[article.category];
  const toc = tableOfContents(article.blocks);
  const related = getRelated(article, 3);

  const all = getAllArticles();
  const idx = all.findIndex((a) => a.slug === article.slug);
  const prev = idx >= 0 ? all[idx + 1] : undefined; // older
  const next = idx > 0 ? all[idx - 1] : undefined; // newer

  return (
    <main className="bg-white text-ink-900">
      <ArticleJsonLd article={article} />
      <ScrollProgress className="bg-ink-900" />

      {/* ---------- Header ---------- */}
      <header className="border-b border-line">
        <div className="shell pt-8 md:pt-10">
          <nav className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400">
            <Link href="/blog" className="hover:text-ink-900">The Signal</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/blog/category/${article.category}`} className="hover:text-ink-900">{cat.label}</Link>
          </nav>

          <div className="mx-auto mt-7 max-w-3xl pb-10">
            <div className="flex items-center gap-3">
              {article.kicker ? <span className="eyebrow no-rule">{article.kicker}</span> : null}
              <Link
                href={`/blog/category/${article.category}`}
                className="rounded-full border border-ink-900 px-2.5 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ink-900"
              >
                {cat.short}
              </Link>
            </div>
            <h1 className="mt-5 font-display text-[2.1rem] font-semibold leading-[1.08] tracking-tight text-ink-900 sm:text-[3rem]">
              {article.title}
            </h1>
            <p className="mt-5 font-display text-lg leading-relaxed text-ink-500 sm:text-xl">{article.deck}</p>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 font-mono text-[0.7rem] font-bold text-white">
                  {monogram(article.author)}
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-ink-900">{article.author}</div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-400">
                    {article.authorRole ? `${article.authorRole} · ` : ""}{formatDate(article.date)} · {article.readMinutes} min read
                  </div>
                </div>
              </div>
              <ShareBar slug={article.slug} title={article.title} />
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Cover ---------- */}
      <div className="shell">
        <div className="mx-auto -mt-px max-w-5xl">
          <div className="aspect-[2/1] overflow-hidden border-x border-b border-line">
            <Cover motif={article.motif} seed={article.slug} className="h-full w-full" label={article.title} />
          </div>
        </div>
      </div>

      {/* ---------- Body + TOC ---------- */}
      <div className="shell py-12 md:py-16">
        <div className="mx-auto grid min-w-0 max-w-5xl gap-12 xl:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="mx-auto w-full min-w-0 max-w-2xl break-words">
            <ArticleBody blocks={article.blocks} seed={article.slug} />

            {/* tags */}
            <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
              {article.tags.map((t) => (
                <span key={t} className="tag">#{t}</span>
              ))}
            </div>

            {/* FAQ */}
            {article.faq && article.faq.length ? (
              <section className="mt-12">
                <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">Questions, answered</h2>
                <dl className="mt-5 divide-y divide-line border-y border-line">
                  {article.faq.map((f, i) => (
                    <div key={i} className="py-5">
                      <dt className="font-display text-base font-semibold text-ink-900">{f.q}</dt>
                      <dd className="mt-2 text-[0.97rem] leading-relaxed text-ink-600">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {/* curated affiliate "tools we use" — auto-selects partners relevant to this
                article's category; renders only when a matching partner is live */}
            <AffiliateTools category={article.category} />

            {/* share again */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-ink-50 px-6 py-5">
              <p className="font-display text-base font-semibold text-ink-900">Found the signal useful? Pass it on.</p>
              <ShareBar slug={article.slug} title={article.title} />
            </div>

            {/* foot-of-article display unit */}
            <AdSlot slot="articleFoot" />
          </article>

          {toc.length >= 2 ? <TableOfContents items={toc} /> : <div className="hidden xl:block" />}
        </div>
      </div>

      {/* ---------- Newsletter ---------- */}
      <section className="shell pb-16">
        <div className="mx-auto max-w-5xl">
          <NewsletterCard source={`article:${article.slug}`} />
        </div>
      </section>

      {/* ---------- Related ---------- */}
      {related.length ? (
        <section className="border-t border-line bg-ink-50/50">
          <div className="shell section !py-16">
            <div className="mx-auto max-w-5xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">Keep reading</h2>
              <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <ArticleCard key={r.slug} article={r} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- Prev / Next ---------- */}
      <nav className="border-t border-line">
        <div className="shell grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="group flex items-center gap-3 py-7 pr-4 sm:pr-8">
              <ArrowLeft className="h-4 w-4 flex-none text-ink-400 transition group-hover:text-ink-900" />
              <span>
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-400">Older</span>
                <span className="mt-1 block font-display text-sm font-semibold text-ink-900">{prev.title}</span>
              </span>
            </Link>
          ) : <span className="hidden sm:block" />}
          {next ? (
            <Link href={`/blog/${next.slug}`} className="group flex items-center justify-end gap-3 py-7 pl-4 text-right sm:pl-8">
              <span>
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-400">Newer</span>
                <span className="mt-1 block font-display text-sm font-semibold text-ink-900">{next.title}</span>
              </span>
              <ArrowRight className="h-4 w-4 flex-none text-ink-400 transition group-hover:text-ink-900" />
            </Link>
          ) : <span className="hidden sm:block" />}
        </div>
      </nav>
    </main>
  );
}
