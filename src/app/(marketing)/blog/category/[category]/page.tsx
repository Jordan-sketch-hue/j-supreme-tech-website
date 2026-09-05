import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getByCategory, categoryCounts } from "@/lib/blog";
import { CATEGORIES, CATEGORY_ORDER, categoryMeta, type BlogCategory } from "@/lib/blog-taxonomy";
import { ArticleCard } from "@/components/blog/article-card";
import { NewsletterCard } from "@/components/newsletter/forms";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";

// ISR: render category pages on-demand and cache, keeping the build light.
export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta(category);
  if (!meta) return { title: "Not found — The Signal" };
  return {
    title: `${meta.label} — The Signal | J Supreme Tech`,
    description: meta.blurb,
    alternates: { canonical: `/blog/category/${meta.key}` },
    openGraph: { title: `${meta.label} — The Signal`, description: meta.blurb, url: `https://jsupremetech.online/blog/category/${meta.key}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const meta = categoryMeta(category);
  if (!meta) notFound();

  const articles = getByCategory(category as BlogCategory);
  const counts = categoryCounts();

  return (
    <main className="bg-white text-ink-900">
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative py-16 md:py-20">
          <nav className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400">
            <Link href="/blog" className="hover:text-ink-900">Newsletter</Link> / {meta.label}
          </nav>
          <Reveal>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-[3.2rem] md:leading-[1.05]">
              {meta.label}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-500">{meta.blurb}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {CATEGORY_ORDER.map((key) => (
                <Link
                  key={key}
                  href={`/blog/category/${key}`}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.12em] transition ${
                    key === meta.key
                      ? "border-ink-900 bg-ink-950 text-white"
                      : "border-line bg-white text-ink-700 hover:border-ink-900 hover:text-ink-900"
                  }`}
                >
                  {CATEGORIES[key].short}
                  <span className={key === meta.key ? "text-white/60" : "text-ink-400"}>{counts[key] ?? 0}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell section !py-16">
        {articles.length ? (
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
            {articles.map((a) => (
              <RevealItem key={a.slug}>
                <ArticleCard article={a} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="card p-10 text-center">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-400">Nothing here yet</p>
            <p className="mt-3 text-ink-600">The first {meta.label} dispatch is on its way.</p>
            <Link href="/blog" className="btn btn-outline mt-6">Back to The Signal</Link>
          </div>
        )}

        <div className="mt-16">
          <NewsletterCard source={`category:${meta.key}`} />
        </div>
      </section>
    </main>
  );
}
