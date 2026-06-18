import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";
import { getEbook, getEbookSlugs, formatPrice } from "@/lib/ebooks";
import { EbookBuyBox } from "@/components/library/ebook-buybox";
import { BookCover } from "@/components/library/book-cover";
import { Reveal } from "@/components/motion-kit";

export const dynamicParams = false;

export function generateStaticParams() {
  return getEbookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEbook(slug);
  if (!e) return { title: "Not found — The Library" };
  return {
    title: `${e.title} — E-book (${formatPrice(e.price)}) | J Supreme Tech`,
    description: e.summary,
    alternates: { canonical: `/library/${e.slug}` },
    openGraph: { title: e.title, description: e.summary, url: `https://jsupremetech.online/library/${e.slug}`, type: "book" },
  };
}

export default async function EbookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEbook(slug);
  if (!e) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: e.title,
    description: e.summary,
    author: { "@type": "Person", name: e.author },
    publisher: { "@type": "Organization", name: "J Supreme Tech" },
    url: `https://jsupremetech.online/library/${e.slug}`,
    inLanguage: "en",
    workExample: {
      "@type": "Book",
      bookFormat: "https://schema.org/EBook",
      offers: { "@type": "Offer", price: e.price.toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock" },
    },
  };

  return (
    <main className="bg-white text-ink-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-line">
        <div className="shell pt-8">
          <nav className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400">
            <Link href="/library" className="hover:text-ink-900">The Library</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink-600">{e.title}</span>
          </nav>

          <div className="grid items-start gap-12 py-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="mx-auto max-w-[20rem]">
                <BookCover title={e.title} subtitle={e.subtitle} motif={e.coverMotif} slug={e.slug} />
              </div>
            </Reveal>

            <div>
              <span className="eyebrow no-rule">{e.category} · field guide</span>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-[2.6rem]">{e.title}</h1>
              <p className="mt-3 font-display text-lg text-ink-500">{e.subtitle}</p>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-700">{e.summary}</p>
              {e.audience ? (
                <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-400">For: {e.audience}</p>
              ) : null}
              <div className="mt-7 max-w-lg">
                <EbookBuyBox slug={e.slug} title={e.title} price={e.price} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section !py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* What's inside */}
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">What&apos;s inside</h2>
            <ol className="mt-6 space-y-5 border-l border-line">
              {e.chapters.map((c, i) => (
                <li key={i} className="relative pl-6">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border border-ink-900 bg-white" />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-400">Chapter {i + 1}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink-900">{c.title}</h3>
                  {c.intro ? <p className="mt-1 text-sm leading-relaxed text-ink-600">{c.intro}</p> : null}
                </li>
              ))}
            </ol>
          </div>

          {/* Takeaways */}
          {e.takeaways && e.takeaways.length ? (
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">You&apos;ll walk away with</h2>
              <ul className="mt-6 space-y-3.5">
                {e.takeaways.map((t, i) => (
                  <li key={i} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-700">
                    <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink-900 text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 rounded-2xl border border-line bg-ink-50 p-6">
                <p className="text-sm leading-relaxed text-ink-600">
                  {formatPrice(e.price)} one-time — lifetime access to the PDF, free updates. Pay by bank transfer; your secure download link arrives by email the moment payment clears.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
