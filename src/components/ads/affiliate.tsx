import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { affiliatesForTopic, affiliate, type AffiliateCategory } from "@/lib/affiliates";
import type { BlogCategory } from "@/lib/blog-taxonomy";
import { DISCLOSURE } from "@/lib/ads";

/*
  Affiliate UI. Two pieces:
    • <AffiliateTools>  — a curated "tools we use" card block for the foot of articles.
    • <AffiliateLink>   — an inline, in-prose affiliate link by partner id.

  Both apply rel="sponsored nofollow noopener" (Google's required attribute for paid
  links) and surface a quiet FTC disclosure. Renders nothing when no partner is live,
  so it's safe to drop into any article today.
*/

const CAT_LABEL: Record<AffiliateCategory, string> = {
  hosting: "Hosting",
  infrastructure: "Infrastructure",
  design: "Design",
  productivity: "Productivity",
  ecommerce: "Commerce",
  crm: "CRM",
  seo: "SEO",
  marketing: "Marketing",
};

export function AffiliateTools({
  title = "The stack we actually use",
  intro = "The tools below run our own systems and the ones we build for clients. A few are affiliate links — they support The Signal at no cost to you.",
  category,
  only,
}: {
  title?: string;
  intro?: string;
  /** Article category — selects the contextually relevant partners. */
  category?: BlogCategory;
  /** Optionally restrict to specific partner ids (overrides category selection). */
  only?: string[];
}) {
  let items = affiliatesForTopic(category);
  if (only?.length) items = items.filter((a) => only.includes(a.id));
  if (!items.length) return null;

  return (
    <section className="my-12 rounded-2xl border border-line bg-ink-50 p-7 sm:p-9">
      <div className="flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-900" />
        <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
          Recommended · affiliate
        </span>
      </div>
      <h2 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink-900 sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-[0.97rem] leading-relaxed text-ink-600">{intro}</p>

      <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {items.map((a) => (
          <a
            key={a.id}
            href={a.href}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="group flex items-start justify-between gap-4 bg-white p-5 transition hover:bg-ink-50"
          >
            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="font-display text-base font-semibold text-ink-900">{a.name}</span>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink-400">
                  {CAT_LABEL[a.category]}
                </span>
              </span>
              <span className="mt-1 block text-[0.9rem] leading-snug text-ink-600">{a.tagline}</span>
            </span>
            <ArrowUpRight className="mt-0.5 h-4 w-4 flex-none text-ink-300 transition group-hover:text-ink-900" />
          </a>
        ))}
      </div>

      <p className="mt-5 font-mono text-[0.62rem] leading-relaxed text-ink-400">
        {DISCLOSURE.affiliate}{" "}
        <Link href="/disclosure" className="underline decoration-ink-300 underline-offset-2 hover:text-ink-900">
          Full disclosure
        </Link>
        .
      </p>
    </section>
  );
}

/** Inline affiliate link for in-article prose: <AffiliateLink id="namecheap">Namecheap</AffiliateLink> */
export function AffiliateLink({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const a = affiliate(id);
  if (!a || !a.live || a.href.includes("REPLACE_ME")) {
    // Fall back to plain text so prose never breaks before the program is live.
    return <span>{children}</span>;
  }
  return (
    <a
      href={a.href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="font-medium text-ink-900 underline decoration-ink-300 underline-offset-4 transition hover:decoration-ink-900"
    >
      {children}
    </a>
  );
}
