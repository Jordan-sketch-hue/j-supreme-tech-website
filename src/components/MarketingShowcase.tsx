import { MARKETING_SAMPLES } from "@/lib/portfolio";

/* eslint-disable @next/next/no-img-element */

/**
 * Marketing & Design gallery — flyers, social creative, brand identity and a
 * marketing-plan mockup. Plain <img> + CSS columns so mixed aspect ratios tile
 * cleanly (masonry). Drop new files in /public/marketing-samples and add a row
 * to MARKETING_SAMPLES in portfolio.ts.
 */
export function MarketingShowcase() {
  return (
    <section id="marketing" className="section shell">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">Marketing &amp; Design</span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            We design the brand too — not just the build.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-600">
            Logos, ad creative, social campaigns, flyers, and full marketing
            plans. The same studio that ships your system grows it — so your brand
            looks the part and the right people find it.
          </p>
        </div>
        <a
          href="#services"
          className="hidden shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-700 hover:text-ink-900 md:inline-flex"
        >
          See packages &amp; pay
        </a>
      </div>

      <div className="mt-12 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
        {MARKETING_SAMPLES.map((m) => (
          <figure
            key={m.src}
            className="card card-hover mb-5 break-inside-avoid overflow-hidden p-0"
          >
            <img
              src={m.src}
              alt={m.title}
              loading="lazy"
              className="w-full bg-ink-50 object-cover"
            />
            <figcaption className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
              <span className="text-sm font-semibold text-ink-900">{m.title}</span>
              <span className="tag">{m.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
