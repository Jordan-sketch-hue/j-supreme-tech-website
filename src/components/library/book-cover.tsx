import type { CoverMotif } from "@/lib/blog-taxonomy";
import { Cover } from "@/components/blog/cover";

/** Premium portrait e-book cover — generative motif behind a typographic overlay. */
export function BookCover({
  title,
  subtitle,
  motif,
  slug,
  className = "",
}: {
  title: string;
  subtitle?: string;
  motif: CoverMotif;
  slug: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[3/4] overflow-hidden rounded-xl border border-ink-200 bg-white shadow-[0_24px_50px_-26px_rgba(0,0,0,0.35)] ${className}`}>
      <div className="absolute inset-0 opacity-[0.5]">
        <Cover motif={motif} seed={slug} className="h-full w-full" label="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/40 to-white/92" />
      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-900 font-mono text-[0.55rem] font-bold text-white">JST</span>
          <span className="font-mono text-[0.52rem] uppercase tracking-[0.2em] text-ink-500">E-Book</span>
        </div>
        <div>
          <h3 className="font-display text-[1.35rem] font-semibold leading-[1.1] tracking-tight text-ink-900">{title}</h3>
          {subtitle ? <p className="mt-2 text-[0.78rem] leading-snug text-ink-600">{subtitle}</p> : null}
          <div className="mt-4 h-px w-12 bg-ink-900" />
          <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ink-500">J Supreme Tech</p>
        </div>
      </div>
    </div>
  );
}
