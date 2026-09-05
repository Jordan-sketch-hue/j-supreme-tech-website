import type { Metadata } from "next";
import { Cpu, Sparkles, LineChart, ShieldCheck } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter/forms";
import { Reveal } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "In Today's World: — J Supreme Tech Newsletter",
  description:
    "Join In Today's World: technology, AI, marketing, finance, Caribbean and Jamaica coverage, every weekday morning from J Supreme Tech.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "In Today's World: — J Supreme Tech",
    description: "Signal over noise — a daily dispatch, every weekday morning.",
    url: "https://jsupremetech.online/newsletter",
  },
};

const PERKS = [
  { icon: Cpu, title: "Technology & AI", body: "What's actually shipping — models, tools, and the moves worth tracking." },
  { icon: LineChart, title: "Markets & finance", body: "Signal across trading, finance and business — curated, never noise." },
  { icon: Sparkles, title: "Caribbean & Jamaica", body: "Regional coverage you won't find in a global feed." },
];

export default function NewsletterPage() {
  return (
    <main className="bg-white text-ink-900">
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Reveal>
              <span className="eyebrow">Newsletter · daily</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-[3.3rem] md:leading-[1.04]">
                In Today&apos;s World:
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-500">
                One clean dispatch every weekday morning — technology, AI, marketing, finance, Caribbean and Jamaica coverage. Signal over noise, straight to your inbox.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-8 max-w-md">
                <NewsletterForm source="newsletter-page" cta="Join free" />
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <p className="mt-4 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Unsubscribe anytime · we never sell your data
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
