import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "Our Stack — Tools & Tech We Ship With | J Supreme Tech",
  description:
    "The exact frameworks, platforms, and tools J Supreme Tech uses to build production-grade websites, apps, and digital systems.",
};

const STACK = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js 16", blurb: "App Router, Turbopack, RSC — our primary framework for every web surface." },
      { name: "React 19", blurb: "Server & client components, concurrent features, streaming." },
      { name: "Tailwind CSS 4", blurb: "CSS-native config, @theme tokens, zero JS in stylesheets." },
      { name: "TypeScript", blurb: "Strict mode everywhere — type errors never reach production." },
    ],
  },
  {
    category: "Motion & Experience",
    items: [
      { name: "GSAP", blurb: "Cinematic scroll animations, stagger sequences, page transitions." },
      { name: "Lenis", blurb: "Smooth momentum scroll wired directly into GSAP's ticker." },
      { name: "Motion Kit", blurb: "Our in-house library — Reveal, CountUp, Marquee, CineWords, ScrollProgress." },
      { name: "Framer Motion", blurb: "Used selectively for component-level micro-interactions." },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      { name: "Supabase", blurb: "Postgres + auth + realtime + storage — one platform, row-level security." },
      { name: "Next.js API Routes", blurb: "Edge-ready server functions co-located with the frontend." },
      { name: "Payload CMS", blurb: "Headless CMS for content-heavy client sites (e.g. BP Couriers)." },
      { name: "Clerk", blurb: "Auth with social login, MFA, and organization management." },
    ],
  },
  {
    category: "Payments & Commerce",
    items: [
      { name: "WiPay", blurb: "Caribbean card processing — JMD, USD, TTD. Our primary payment gateway." },
      { name: "Stripe", blurb: "USD international payments for global clients and SaaS subscriptions." },
      { name: "Resend", blurb: "Transactional email API — order confirmations, system alerts, newsletters." },
    ],
  },
  {
    category: "Deploy & Infra",
    items: [
      { name: "Vercel", blurb: "Production deploys, preview URLs, edge network, and analytics for every project." },
      { name: "Railway", blurb: "Always-on Node services — bots, schedulers, WhatsApp automations." },
      { name: "Namecheap", blurb: "Domain registrar + DNS management for the full client fleet." },
      { name: "Cloudflare", blurb: "CDN, SSL, and WAF in front of legacy PHP and WordPress properties." },
    ],
  },
  {
    category: "Mobile",
    items: [
      { name: "React Native", blurb: "Cross-platform iOS/Android — one codebase, native performance." },
      { name: "Expo", blurb: "Build tooling and OTA updates for React Native apps." },
      { name: "Codemagic", blurb: "CI/CD pipeline for App Store + Google Play submissions." },
      { name: "TestFlight", blurb: "Internal beta distribution for iOS builds before public release." },
    ],
  },
  {
    category: "Marketing Tech",
    items: [
      { name: "Meta Graph API", blurb: "Programmatic posting to Facebook Pages and Instagram — no third-party scheduler." },
      { name: "Google Analytics 4", blurb: "Traffic, conversion, and audience data across all client sites." },
      { name: "Google Ads", blurb: "Search and display campaigns with conversion tracking wired to our builds." },
      { name: "WhatsApp Cloud API", blurb: "Automated messaging, lead capture, and dispatch notifications." },
    ],
  },
  {
    category: "AI & Automation",
    items: [
      { name: "Claude (Anthropic)", blurb: "Embedded AI for chatbots, content generation, and internal tooling." },
      { name: "Gemini", blurb: "Multimodal AI for image analysis and zero-cost document workflows." },
      { name: "Groq", blurb: "Ultra-fast inference for real-time AI features (zero cost tier)." },
      { name: "Zapier / n8n", blurb: "No-code automation glue between CRMs, email, and third-party APIs." },
    ],
  },
];

export default function StackPage() {
  return (
    <main className="bg-white text-ink-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-ink-950 py-24 text-white md:py-32">
        <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-50" />
        <div className="shell relative">
          <Reveal>
            <span className="eyebrow no-rule text-white/40">Engineering</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white md:text-[3.5rem] md:leading-[1.05]">
              The stack we ship with.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/55">
              Every framework, platform, and tool we trust in production — chosen for performance,
              developer ergonomics, and the Caribbean market&apos;s payment reality.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn btn-on-dark">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/work" className="btn btn-ghost-dark">
                See what we&apos;ve built
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stack grid */}
      <section className="shell py-20 md:py-28">
        <div className="space-y-16">
          {STACK.map((section) => (
            <div key={section.category}>
              <Reveal>
                <h2 className="mb-6 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-ink-400">
                  {section.category}
                </h2>
              </Reveal>
              <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.08}>
                {section.items.map((item) => (
                  <RevealItem key={item.name}>
                    <div className="card card-hover h-full p-5">
                      <p className="font-display text-sm font-semibold text-ink-900">{item.name}</p>
                      <p className="mt-2 text-xs leading-5 text-ink-500">{item.blurb}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-ink-50 py-16 text-center">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Want this stack working for your business?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-ink-500">We scope, build, and ship — you own the system.</p>
        </Reveal>
        <Reveal delay={0.18}>
          <Link href="/#contact" className="btn btn-dark mt-6">
            Start a Project <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
