import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { CASE_STUDIES, getCaseStudy } from "@/lib/caseStudies";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";
import { BrowserFrame } from "@/components/DeviceFrame";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.client} — Case Study | J Supreme Tech`,
    description: cs.subhead,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const idx = CASE_STUDIES.findIndex((c) => c.slug === slug);
  const next = CASE_STUDIES[idx + 1];

  return (
    <main className="bg-white text-ink-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-ink-950 pb-0 pt-24 text-white md:pt-32">
        <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-50" />
        <div className="shell relative">
          <Reveal>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> Back to work
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="mt-5 block font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/40">
              {cs.tag}
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-[3.2rem] md:leading-[1.08]">
              {cs.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 max-w-2xl text-lg text-white/55">{cs.subhead}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <a
              href={`https://${cs.host}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-white/40 hover:text-white transition-colors"
            >
              {cs.host} <ExternalLink className="h-3 w-3" />
            </a>
          </Reveal>
          <div className="mt-16">
            <BrowserFrame host={cs.host} alt={`${cs.client} live platform`} />
          </div>
        </div>
      </section>

      {/* Results strip */}
      <section className="border-b border-line bg-ink-950">
        <div className="shell">
          <RevealGroup className="grid grid-cols-2 gap-px bg-white/[0.06] lg:grid-cols-4" amount={0.1}>
            {cs.results.map((r) => (
              <RevealItem key={r.label}>
                <div className="bg-ink-950 px-6 py-8 text-center text-white">
                  <p className="font-display text-4xl font-bold tracking-tight">{r.metric}</p>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/40">{r.label}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="eyebrow">The Problem</span>
              <p className="mt-5 text-lg leading-8 text-ink-600">{cs.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">The Solution</span>
              <p className="mt-5 text-lg leading-8 text-ink-600">{cs.solution}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stack used */}
      <section className="border-t border-line bg-ink-50 py-14">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Stack Used</span>
          </Reveal>
          <RevealGroup className="mt-6 flex flex-wrap gap-2" amount={0.1}>
            {cs.stack.map((t) => (
              <RevealItem key={t}>
                <span className="tag">{t}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Next case study */}
      {next && (
        <section className="border-t border-line">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between px-8 py-10 transition hover:bg-ink-50 md:px-16"
          >
            <div>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-400">
                Next case study
              </span>
              <p className="mt-1 font-display text-2xl font-semibold text-ink-900 md:text-3xl">
                {next.client}
              </p>
            </div>
            <ArrowRight className="h-6 w-6 text-ink-400 transition group-hover:translate-x-1 group-hover:text-ink-900" />
          </Link>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-line bg-ink-950 py-16 text-center text-white">
        <div className="shell">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              Ready to build yours?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-white/55">We scope, build, and ship — you own the system.</p>
          </Reveal>
          <Reveal delay={0.18}>
            <Link href="/#contact" className="btn btn-on-dark mt-6">
              Start a Project <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
