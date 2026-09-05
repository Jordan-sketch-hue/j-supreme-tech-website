import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { getInTodaysWorldIssues, readerUrl } from "@/lib/inTodaysWorld";
import { NewsletterCard } from "@/components/newsletter/forms";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "In Today's World: — Daily Intelligence Archive | J Supreme Tech",
  description:
    "Every issue of In Today's World: — technology, AI, marketing, finance, Caribbean and Jamaica coverage, published every weekday morning.",
  alternates: { canonical: "/blog/in-todays-world" },
};

export const revalidate = 3600;

export default async function InTodaysWorldPage() {
  const issues = await getInTodaysWorldIssues();

  return (
    <main className="bg-white text-ink-900">
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative py-16 md:py-20">
          <nav className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400">
            <Link href="/blog" className="hover:text-ink-900">The Signal</Link> / In Today&apos;s World:
          </nav>
          <Reveal>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-[3.2rem] md:leading-[1.05]">
              In Today&apos;s World:
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-500">
              A daily dispatch — technology, AI, marketing, finance, Caribbean and Jamaica coverage,
              published every weekday morning. Every issue archived here in full.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell section !py-14">
        {issues.length ? (
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" amount={0.1}>
            {issues.map((issue) => (
              <RevealItem key={issue.issueNumber}>
                <a
                  href={readerUrl(issue.issueNumber)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
                >
                  {/* Designed cover — no photography exists for this text-only
                      series, so the cover is generated from the brand system:
                      the spectrum bar plus the issue number as typography. */}
                  <div className="relative flex h-32 flex-none flex-col justify-between overflow-hidden bg-ink-950 p-5">
                    <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-20" />
                    <span className="relative font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/45">
                      {issue.topStory.category || "Briefing"}
                    </span>
                    <span className="relative font-display text-4xl font-semibold text-white/90">
                      #{String(issue.issueNumber).padStart(2, "0")}
                    </span>
                    <div className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full" style={{ background: "var(--sp-h)" }} />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink-900 group-hover:underline">
                      {issue.topStory.headline}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">
                      {issue.topStory.body}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-400">
                        {issue.dateFormatted}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-500 group-hover:text-ink-900">
                        Read issue <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <p className="mx-auto max-w-3xl text-center text-ink-500">
            The first archived issue lands after the next weekday send — check back shortly.
          </p>
        )}

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-ink-50 p-5">
          <Info className="mt-0.5 h-4 w-4 flex-none text-ink-500" />
          <p className="text-xs leading-relaxed text-ink-500">
            In Today&apos;s World: is written and published by J Supreme Tech, weekdays only. Reading
            an issue opens the full archive on{" "}
            <a href="https://communications.jsupremetech.online" target="_blank" rel="noreferrer noopener" className="underline hover:text-ink-900">
              communications.jsupremetech.online
            </a>
            .
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <NewsletterCard source="in-todays-world-archive" />
        </div>
      </section>
    </main>
  );
}
