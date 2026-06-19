import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { liveAffiliates, type AffiliateCategory } from "@/lib/affiliates";
import { getAffiliateArticles } from "@/lib/blog";
import { CATEGORIES, formatDate } from "@/lib/blog-taxonomy";
import { DISCLOSURE } from "@/lib/ads";

/*
  THE STACK — the site's featured affiliate section.

  This is the ONLY page built purely around affiliate partners: the tools JST
  genuinely uses to build and run client systems. It renders only `liveAffiliates()`,
  so partners appear here the moment their tracked link goes live and disappear if
  flipped off — no dead links, ever. Deep-dive articles (tagged "affiliate") are
  surfaced below so a reader can go from "what is this" to "why we use it" to "get it".
*/

const DESCRIPTION =
  "The Stack — the tools J Supreme Tech actually uses to build and run client systems: domains, hosting, infrastructure, design, CRM and growth. Curated, not sponsored fluff.";

export const metadata: Metadata = {
  title: "The Stack — Tools We Build With | J Supreme Tech",
  description: DESCRIPTION,
  alternates: { canonical: "/stack" },
  openGraph: { title: "The Stack — J Supreme Tech", description: DESCRIPTION, url: "https://jsupremetech.online/stack" },
};

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

export default function StackPage() {
  const partners = liveAffiliates();
  const articles = getAffiliateArticles();

  return (
    <main className="bg-white text-ink-900">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">The Stack · tools we build with</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-[3.4rem] md:leading-[1.04]">
              The tools behind the work.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
              Every platform we ship runs on a stack of dependable tools. These are the ones
              we actually use — for our own systems and the ones we build for clients. Some
              are affiliate links: if you sign up through them, we may earn a commission at no
              extra cost to you.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Partner grid ---------- */}
      <section className="shell py-14 md:py-16">
        {partners.length ? (
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((a) => (
              <a
                key={a.id}
                href={a.href}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="group flex flex-col bg-white p-7 transition hover:bg-ink-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-semibold text-ink-900">{a.name}</span>
                  <ArrowUpRight className="h-4 w-4 flex-none text-ink-300 transition group-hover:text-ink-900" />
                </div>
                <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-400">
                  {CAT_LABEL[a.category]}
                </span>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-600">{a.tagline}</p>
                <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-5 font-mono text-[0.6rem] uppercase tracking-[0.1em]">
                  <div>
                    <dt className="text-ink-400">Commission</dt>
                    <dd className="mt-1 normal-case tracking-normal text-ink-700">{a.commission}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-400">Cookie</dt>
                    <dd className="mt-1 normal-case tracking-normal text-ink-700">{a.cookie}</dd>
                  </div>
                </dl>
              </a>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-line bg-ink-50 p-8 text-center text-ink-500">
            The stack is being curated. Check back shortly.
          </p>
        )}

        <p className="mt-7 max-w-2xl font-mono text-[0.64rem] leading-relaxed text-ink-400">
          {DISCLOSURE.affiliate}{" "}
          <Link href="/disclosure" className="underline decoration-ink-300 underline-offset-2 hover:text-ink-900">
            Full disclosure
          </Link>
          .
        </p>
      </section>

      {/* ---------- Deep dives ---------- */}
      {articles.length ? (
        <section className="border-t border-line bg-ink-50/50">
          <div className="shell section !py-16">
            <div className="max-w-2xl">
              <span className="eyebrow">From The Signal</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900">
                Why we use what we use.
              </h2>
              <p className="mt-3 text-ink-500">
                The thinking behind the stack — guides and playbooks on getting the most out of these tools.
              </p>
            </div>
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-ink-900"
                >
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-400">
                    {CATEGORIES[a.category].short} · {formatDate(a.date)}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-ink-900">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-ink-600">{a.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink-900">
                    Read <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
