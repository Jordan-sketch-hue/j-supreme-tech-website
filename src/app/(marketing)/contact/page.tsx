import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Globe2, Mail, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { PageViewConversion } from "@/components/GoogleConversions";
import { CineWords } from "@/components/CineWords";
import { ProjectIntakeForm } from "@/components/ProjectIntakeForm";
import { Reveal, ScrollProgress } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "Contact — Start a Project | J Supreme Tech",
  description:
    "Tell J Supreme Tech what to build next — websites, apps, CRMs, booking systems, SaaS. WhatsApp 658-218-2282 or send the project intake and get a system plan back.",
};

const CHANNELS = [
  {
    icon: MessageCircle,
    title: "WhatsApp — fastest",
    line: "658-218-2282",
    sub: "Usually answered within the hour",
    href: "https://wa.me/16582182282",
  },
  {
    icon: Mail,
    title: "Email the studio",
    line: "global.jsuprememarketing@gmail.com",
    sub: "Project briefs, documents, partnerships",
    href: "mailto:global.jsuprememarketing@gmail.com",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-white text-ink-900">
      <PageViewConversion />
      <ScrollProgress className="bg-ink-900" />

      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative py-16 md:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">Contact · Start a project</span>
            </Reveal>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-[3.2rem] md:leading-[1.05]">
              <CineWords text="Tell us the goal." delay={0.15} />{" "}
              <span className="underline decoration-4 underline-offset-8">
                <CineWords text="We'll map the system." delay={0.45} />
              </span>
            </h1>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
                Send the intake below and we come back with a system plan, scope and timeline —
                or skip the form and talk to us directly.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ Form + channels ============ */}
      <section className="section shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Reveal>
              <div className="space-y-3">
                {CHANNELS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.title}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="card card-hover flex items-start gap-4 p-5"
                    >
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-ink-950 text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-base font-semibold text-ink-900">{c.title}</span>
                        <span className="mt-0.5 block break-all font-mono text-sm text-ink-600">{c.line}</span>
                        <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-400">{c.sub}</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                <div className="card p-5">
                  <MapPin className="h-5 w-5 text-ink-900" />
                  <p className="mt-3 font-display text-sm font-semibold text-ink-900">Kingston, Jamaica</p>
                  <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-400">Home base</p>
                </div>
                <div className="card p-5">
                  <Globe2 className="h-5 w-5 text-ink-900" />
                  <p className="mt-3 font-display text-sm font-semibold text-ink-900">Worldwide delivery</p>
                  <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-400">Remote-first builds</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="card flex items-start gap-4 p-5">
                <Clock className="mt-0.5 h-5 w-5 flex-none text-ink-900" />
                <div>
                  <p className="font-display text-sm font-semibold text-ink-900">Mon–Sat · 9am–6pm (Jamaica)</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">
                    WhatsApp messages outside hours get answered first thing next morning.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="relative overflow-hidden rounded-2xl bg-ink-950 p-6 text-white">
                <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-60" />
                <div className="relative">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="mt-3 font-display text-base font-semibold">Just need software, not a project?</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                    13 ready-made systems with a 3-day free trial — live before we&apos;d even finish a call.
                  </p>
                  <Link
                    href="/products"
                    className="mt-4 inline-flex items-center gap-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] underline underline-offset-4"
                  >
                    Browse the products <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <ProjectIntakeForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
