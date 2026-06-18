import type { Metadata } from "next";
import { BookOpen, Layers } from "lucide-react";
import { getLibrary, formatPrice } from "@/lib/ebooks";
import { EbookCard } from "@/components/library/ebook-card";
import { NewsletterCard } from "@/components/newsletter/forms";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "The Library — Studio E-books | J Supreme Tech",
  description:
    "Premium, practical e-books from the J Supreme Tech studio — including the ongoing series Modern Technology & Its Applications, plus marketing and growth field guides. From $29.99.",
  alternates: { canonical: "/library" },
  openGraph: { title: "The Library — J Supreme Tech", description: "Premium, practical e-books on technology, marketing and growth. From $29.99.", url: "https://jsupremetech.online/library" },
};

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function LibraryPage() {
  const { series, standalone } = getLibrary();
  const empty = series.length === 0 && standalone.length === 0;

  return (
    <main className="bg-white text-ink-900">
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative py-16 md:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">The Library · field guides</span>
            </Reveal>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-[3.3rem] md:leading-[1.04]">
              Everything we learned, written down.
            </h1>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
                Premium e-books built from real builds — an ongoing series on modern technology and its applications, plus marketing and growth playbooks. From {formatPrice(29.99)}, delivered as a clean PDF.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="shell section !py-16">
        {empty ? (
          <div className="card flex flex-col items-center p-12 text-center">
            <BookOpen className="h-8 w-8 text-ink-300" />
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-400">The shelves are being stocked</p>
            <p className="mt-2 text-ink-600">The first e-books are publishing shortly.</p>
          </div>
        ) : null}

        {/* ---------- Ongoing volumed series ---------- */}
        {series.map((s) => {
          const range = s.volumes.length
            ? `Vol. ${ROMAN[s.volumes[0].volume ?? 1]}–${ROMAN[s.volumes[s.volumes.length - 1].volume ?? s.volumes.length]}`
            : "Series";
          return (
            <section key={s.name} className="mb-20">
              <div className="relative overflow-hidden rounded-3xl border border-ink-950 bg-ink-950 p-8 text-white sm:p-10">
                <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-50" />
                <div className="relative flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/55">
                      <Layers className="h-3.5 w-3.5" /> The Series · {range}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{s.name}</h2>
                    <p className="mt-3 text-[0.97rem] leading-relaxed text-white/65">
                      An ongoing, sectioned series — each volume a self-contained field guide, expanded as the technology and the market evolve. Start anywhere; collect the set.
                    </p>
                  </div>
                  <span className="rounded-full border border-white/20 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70">
                    {s.volumes.length} volume{s.volumes.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>

              <RevealGroup className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
                {s.volumes.map((e) => (
                  <RevealItem key={e.slug}>
                    <EbookCard ebook={e} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </section>
          );
        })}

        {/* ---------- Standalone field guides ---------- */}
        {standalone.length ? (
          <section>
            <div className="flex items-end justify-between border-b border-line pb-5">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Field guides</h2>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400">{standalone.length} titles</span>
            </div>
            <RevealGroup className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
              {standalone.map((e) => (
                <RevealItem key={e.slug}>
                  <EbookCard ebook={e} />
                </RevealItem>
              ))}
            </RevealGroup>
          </section>
        ) : null}

        <div className="mt-16">
          <NewsletterCard source="library" />
        </div>
      </div>
    </main>
  );
}
