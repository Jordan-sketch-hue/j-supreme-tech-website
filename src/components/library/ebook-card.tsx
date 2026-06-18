import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Ebook, formatPrice } from "@/lib/ebooks";
import { BookCover } from "./book-cover";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function EbookCard({ ebook }: { ebook: Ebook }) {
  const vol = ebook.volume ? `Vol. ${ROMAN[ebook.volume] ?? ebook.volume}` : null;
  return (
    <Link href={`/library/${ebook.slug}`} className="group block">
      <div className="relative">
        <BookCover title={ebook.title} subtitle={ebook.subtitle} motif={ebook.coverMotif} slug={ebook.slug} className="transition group-hover:-translate-y-1.5" />
        {vol ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink-950 px-2.5 py-1 font-mono text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-white">
            {vol}
          </span>
        ) : null}
      </div>
      <div className="mt-5">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-400">
          {ebook.pages ? `${ebook.pages} pages` : "E-book"} · PDF
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink-900">{ebook.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-600 line-clamp-2">{ebook.summary}</p>
        <span className="mt-3 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-ink-900">{formatPrice(ebook.price)}</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-900">
            Get it <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </span>
        </span>
      </div>
    </Link>
  );
}
