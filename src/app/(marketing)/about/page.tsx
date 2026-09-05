import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Building2,
  MessageCircle,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { PageViewConversion } from "@/components/GoogleConversions";
import { CineWords } from "@/components/CineWords";
import { BrowserFrame } from "@/components/DeviceFrame";
import { CountUp, Marquee, Reveal, RevealGroup, RevealItem, ScrollProgress } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "About — Black & White, Refracted | J Supreme Tech",
  description:
    "J Supreme Tech is the technology arm of the J Supreme group — a Jamaican studio shipping websites, apps, CRMs and a 13-system SaaS line worldwide. The house standard starts in black and white; the spectrum you see across our work is that same discipline refracted into color.",
};

const PRINCIPLES = [
  {
    icon: Workflow,
    title: "Systems, not pages",
    body: "A website is the surface. Underneath we wire the pipeline, the payments, the data — so the business runs, not just looks built.",
  },
  {
    icon: ShieldCheck,
    title: "Proof over promises",
    body: "Our SaaS platform self-checks every page and workflow on a public /status portal. We'd rather show you than tell you.",
  },
  {
    icon: Boxes,
    title: "Discipline first, color earned",
    body: "The house standard starts in black and white — the spectrum you see across our work is that same discipline refracted, not a departure from it.",
  },
  {
    icon: Building2,
    title: "Speed with precision",
    body: "Launch websites in about a week, full platforms in milestones you can see. Fast because the system is repeatable — not because corners get cut.",
  },
];

const GROUP = [
  {
    name: "J Supreme Tech",
    role: "Custom builds",
    blurb: "Websites, apps, CRMs, booking engines and infrastructure — engineered per client.",
    href: "/services",
    label: "See services",
  },
  {
    name: "Supreme Suite",
    role: "SaaS products",
    blurb: "13 ready-made business systems — CRM + branded site + AI staff, white-labeled in minutes.",
    href: "/products",
    label: "See products",
  },
  {
    name: "J Supreme Marketing",
    role: "Growth & creative",
    blurb: "Social media management, ad creative and brand design that feed the systems traffic.",
    href: "/services",
    label: "See packages",
  },
];

const TYPE_SPECIMEN = [
  { label: "Display", className: "font-display text-xl font-semibold tracking-tight", sample: "Space Grotesk" },
  { label: "Mono", className: "font-mono text-sm uppercase tracking-[0.18em]", sample: "JetBrains Mono" },
  { label: "Body", className: "text-base", sample: "Inter — clean, quiet, readable." },
];

const INKS = ["#0a0a0a", "#141414", "#3d3d3d", "#737373", "#a3a3a3", "#cfcfcf", "#e6e6e6", "#f4f4f4"];

export default function AboutPage() {
  return (
    <main className="bg-white text-ink-900">
      <PageViewConversion />
      <ScrollProgress className="bg-ink-900" />

      {/* ============ Hero + brand board ============ */}
      <section className="relative overflow-hidden border-b border-line bg-ink-50/60">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div className="min-w-0">
            <Reveal>
              <span className="eyebrow">About · The J Supreme group</span>
            </Reveal>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-[3.4rem] md:leading-[1.05]">
              <CineWords text="A studio in" delay={0.15} />{" "}
              <span className="underline decoration-4 underline-offset-8">
                <CineWords text="black & white." delay={0.4} />
              </span>
              <br />
              <span className="text-ink-400">
                <CineWords text="Refracted into color." delay={0.6} />
              </span>
            </h1>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
                J Supreme Tech is the technology arm of the J Supreme group — a Jamaican studio
                that designs, builds and operates digital systems for brands from Kingston to
                anywhere. Custom platforms on one side, a {""}
                <Link href="/products" className="font-semibold text-ink-900 underline underline-offset-2">
                  13-system SaaS line
                </Link>{" "}
                on the other. One standard across all of it — the house runs in black and white,
                the way white light runs colorless until it hits a prism. Every spectrum bar,
                gradient and accent you see across our work is that same discipline, refracted.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#contact" className="btn btn-dark">
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/#work" className="btn btn-outline">
                  See the work
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Founder photo */}
          <Reveal direction="left" delay={0.15} className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl bg-ink-950 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/jordan-founder.jpg"
                alt="Jordan Morris — Founder & CEO, J Supreme Tech"
                className="block h-[420px] w-full object-cover object-top"
              />
              {/* gradient footer */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 to-transparent px-5 pb-5 pt-16">
                <p className="font-display text-sm font-semibold text-white">Jordan Morris</p>
                <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/45">
                  Founder & CEO · J Supreme Tech
                </p>
              </div>
              {/* floating stat chips */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <div className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-center backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-white">100+</p>
                  <p className="font-mono text-[0.48rem] uppercase tracking-[0.16em] text-white/40">Platforms</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-center backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-white">13</p>
                  <p className="font-mono text-[0.48rem] uppercase tracking-[0.16em] text-white/40">SaaS Products</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative border-t border-line bg-white/70 py-3 backdrop-blur-sm">
          <Marquee speed={36} gap="3rem">
            {["Digital Solutions. Real Growth.", "We Build Today. You Lead Tomorrow.", "Systems That Work. Growth That Lasts.", "From Jamaica to the World."].map((t) => (
              <span key={t} className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ============ Stats ============ */}
      <section className="shell py-12 md:py-14">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {[
              { v: <><CountUp to={100} className="tabular-nums" />+</>, l: "live platforms shipped" },
              { v: <CountUp to={13} className="tabular-nums" />, l: "ready-made SaaS systems" },
              { v: <CountUp to={3} className="tabular-nums" />, l: "native apps in the stores" },
              { v: "01", l: "house standard, refracted" },
            ].map((s, i) => (
              <div key={i} className="bg-white px-5 py-6 text-center">
                <p className="font-display text-3xl font-bold tracking-tight text-ink-900">{s.v}</p>
                <p className="mt-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-500">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ Principles ============ */}
      <section className="border-y border-line bg-ink-50/50 py-16 md:py-20">
        <div className="shell">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow no-rule justify-center">How we think</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Four principles. Every build.
              </h2>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" amount={0.1}>
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <RevealItem key={p.title}>
                  <div className="card card-hover h-full p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-950 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-base font-semibold text-ink-900">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ============ The group ============ */}
      <section className="section shell">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow no-rule justify-center">Structure</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              One group. Three engines.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-3 text-base leading-relaxed text-ink-500">
              Custom builds, productized systems, and the marketing that grows them — under one roof,
              so nothing gets lost between vendors.
            </p>
          </Reveal>
        </div>
        <RevealGroup className="grid gap-5 lg:grid-cols-3" amount={0.1}>
          {GROUP.map((g, i) => (
            <RevealItem key={g.name}>
              <div className="card card-hover flex h-full flex-col p-7">
                <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink-400">
                  0{i + 1} · {g.role}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink-900">{g.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{g.blurb}</p>
                <Link
                  href={g.href}
                  className="mt-5 inline-flex items-center gap-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink-600 hover:text-ink-900"
                >
                  {g.label} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ============ We run on our own software ============ */}
      <section className="relative overflow-hidden border-t border-line bg-ink-950 py-16 text-white md:py-24">
        <div className="grid-bg-dark pointer-events-none absolute inset-0" />
        <div className="shell relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <span className="eyebrow no-rule text-white/50">Eat your own cooking</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                We run the group on software we built.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                Supreme OS — our own operator workspace — handles the studio&apos;s CRM, invoices,
                projects and AI workflows. Founded in Jamaica in 2024; every client system since has
                been built with the same hands that run our own.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-7 flex flex-wrap gap-2">
                {["CRM & invoices", "Projects", "AI workflows", "Live since 2024"].map((t) => (
                  <span key={t} className="tag tag-dark">{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={0.15}>
            <BrowserFrame host="jsupremeconglomerate.online" alt="Supreme OS — the operator workspace that runs the J Supreme group" />
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section shell text-center">
        <Reveal>
          <span className="eyebrow no-rule justify-center">Work with the studio</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Bring us the goal. We&apos;ll bring the system.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contact" className="btn btn-dark">
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://wa.me/16582182282" target="_blank" rel="noreferrer" className="btn btn-outline">
              <MessageCircle className="h-4 w-4" /> WhatsApp 658-218-2282
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
