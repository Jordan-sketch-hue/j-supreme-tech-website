import type { Metadata } from "next";
import { Mail, Newspaper, Zap, ShieldCheck } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter/forms";
import { Reveal } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "The Communications Debrief — J Supreme Tech Newsletter",
  description:
    "Join the Communications Debrief: weekly field notes on building software, marketing systems and the markets, straight from the J Supreme Tech studio. Double opt-in, no spam.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "The Communications Debrief — J Supreme Tech",
    description: "Signal over noise — tech, marketing and the markets, from the studio bench.",
    url: "https://jsupremetech.online/newsletter",
  },
};

const PERKS = [
  { icon: Newspaper, title: "What we shipped", body: "Production logs from real builds — the problem, the fix, the launch." },
  { icon: Zap, title: "Systems & automation", body: "The leverage moves: AI staff, pipelines, the tools that compound." },
  { icon: Mail, title: "Markets & growth", body: "Signal across tech, marketing and trading — curated, never noise." },
];

export default function NewsletterPage() {
  return (
    <main className="bg-white text-ink-900">
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Reveal>
              <span className="eyebrow">Newsletter · the debrief</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-[3.3rem] md:leading-[1.04]">
                The Communications Debrief.
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-500">
                One clean dispatch from the studio — building software, marketing systems and the markets. Signal over noise, straight to your inbox.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-8 max-w-md">
                <NewsletterForm source="newsletter-page" cta="Join the Debrief" />
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <p className="mt-4 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Double opt-in · unsubscribe anytime · we never sell your data
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="card overflow-hidden">
              <div className="border-b border-line bg-ink-50 px-6 py-4">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-500">Inside every issue</span>
              </div>
              <ul className="divide-y divide-line">
                {PERKS.map((p) => (
                  <li key={p.title} className="flex gap-4 p-6">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-line bg-white">
                      <p.icon className="h-5 w-5 text-ink-900" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink-900">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
