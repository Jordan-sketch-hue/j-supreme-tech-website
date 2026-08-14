import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe2,
  Mail,
  MessageCircle,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { CineWords } from "@/components/CineWords";
import { HeroShowcase } from "@/components/HeroShowcase";
import { LaptopFrame, PhoneFrame } from "@/components/DeviceFrame";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { ClientLogoStrip } from "@/components/ClientLogoStrip";
import { Testimonials } from "@/components/Testimonials";
import { ServicesSection } from "@/components/ServicesSection";
import { SupremeSuiteSection } from "@/components/SupremeSuiteSection";
import { PayButton } from "@/components/PayButton";
import { ProjectIntakeForm } from "@/components/ProjectIntakeForm";
import type { CSSProperties } from "react";
import { PROCESS, STATS } from "@/lib/portfolio";
import { SERVICE_OFFERS, priceLabel } from "@/lib/serviceOffers";
import { CountUp, Reveal, RevealGroup, RevealItem, ScrollProgress } from "@/components/motion-kit";

// Flagship pricing on the homepage = the website (Digital Presence) tiers, with
// real JMD prices + direct WiPay checkout. Every other service has its own
// packages in the interactive Services section above. Single source: serviceOffers.ts.
const websiteOffer = SERVICE_OFFERS["digital-presence"];

const taglines = [
  "Digital Solutions. Real Growth.",
  "We Build Today. You Lead Tomorrow.",
  "Systems That Work. Growth That Lasts.",
  "From Jamaica to the World.",
];

/** Count-up for numeric stats while preserving the exact formatting from
    portfolio.ts — "100+" (suffix), "07"/"03" (leading zeros), "JA→∞" (as-is). */
function StatValue({ value }: { value: string }) {
  const m = /^(0*)(\d+)(\+?)$/.exec(value);
  if (!m) return <>{value}</>;
  return <CountUp to={Number.parseInt(m[2], 10)} prefix={m[1]} suffix={m[3]} />;
}

export default function Home() {
  return (
    <main className="bg-white text-ink-900">
      <ScrollProgress className="bg-ink-900" />
      {/* ============================== HERO ============================== */}
      <section id="home" className="relative min-h-[100svh] bg-[#080808] text-white flex flex-col lg:flex-row">

        {/* Decorative — absolute, behind everything */}
        <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-25 z-0" />
        <div className="hero-glow pointer-events-none absolute left-[15%] top-[25%] h-[600px] w-[600px] rounded-full z-0"
          style={{ background: "radial-gradient(circle, rgba(61,107,255,0.07) 0%, transparent 70%)" }} />
        <div className="hero-glow pointer-events-none absolute left-[5%] top-[65%] h-[350px] w-[350px] rounded-full z-0"
          style={{ background: "radial-gradient(circle, rgba(155,81,255,0.05) 0%, transparent 70%)", animationDelay: "2s" }} />

        {/* Bottom spectrum edge */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full z-20"
          style={{ background: "var(--sp-h)" }} />

        {/* ── LEFT COLUMN: text content ── */}
        <div className="relative z-10 flex flex-1 flex-col justify-between pb-24 pt-16 md:pt-24
                        px-6 sm:px-8 lg:pl-10 xl:pl-16 2xl:pl-24 lg:pr-8 lg:max-w-[58vw]">

          {/* Headline */}
          <div className="mt-10">
            <h1 className="font-display text-[clamp(2.6rem,3.8vw,4.2rem)] font-semibold leading-[0.9] tracking-[-0.03em]">
              <CineWords text="We build the systems." delay={0.1} />
              <br />
              <span className="text-white/25">
                <CineWords text="You grow the brand." delay={0.45} />
              </span>
            </h1>

            <Reveal direction="up" delay={0.25}>
              <p className="mt-7 max-w-[400px] text-[1rem] leading-[1.75] text-white/45">
                Websites, apps, CRMs, AI systems, and marketing —
                engineered as one connected digital infrastructure.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.35}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#contact"
                  className="relative overflow-hidden rounded-full bg-white px-7 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.1em] text-black transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-px">
                  Start a Project →
                </Link>
                <Link href="/solutions/websites"
                  className="rounded-full border border-white/20 px-7 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white/70 transition-all hover:border-white/50 hover:text-white hover:-translate-y-px">
                  Explore Solutions
                </Link>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.45}>
              <div className="mt-6 flex flex-wrap gap-5 text-[0.76rem] text-white/30">
                <a href="https://wa.me/16582182282" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white/60">
                  <MessageCircle className="h-3.5 w-3.5" /> (658) 218-2282
                </a>
                <a href="mailto:global.jsuprememarketing@gmail.com"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white/60">
                  <Mail className="h-3.5 w-3.5" /> Email the studio
                </a>
              </div>
            </Reveal>

            {/* Solution quick-links */}
            <Reveal direction="up" delay={0.55}>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  { label: "Websites", href: "/solutions/websites" },
                  { label: "Mobile Apps", href: "/solutions/mobile-apps" },
                  { label: "AI Systems", href: "/solutions/ai-systems" },
                  { label: "Automation", href: "/solutions/automation" },
                  { label: "E-Commerce", href: "/solutions/ecommerce" },
                  { label: "Marketing", href: "/solutions/marketing-creative" },
                ].map((s) => (
                  <Link key={s.href} href={s.href}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/45 transition-all hover:border-white/25 hover:text-white/80 whitespace-nowrap">
                    {s.label}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Mobile-only live work strip */}
          <Reveal direction="up" delay={0.5}>
            <div className="mt-8 lg:hidden">
              <p className="mb-3 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white/30">Live client work</p>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { file: "thelanguagecradle-com-d.webp", label: "Language Cradle", tag: "Education" },
                  { file: "bpcouriers-online-d.webp", label: "BP Couriers", tag: "Logistics" },
                  { file: "the-cleanser-ja-vercel-app-d.webp", label: "The Cleanser JA", tag: "E-Commerce" },
                  { file: "solace-auto-imports-vercel-app-d.webp", label: "Solace Auto", tag: "Automotive" },
                  { file: "ridelink-jamaica-vercel-app-d.webp", label: "RideLink", tag: "Ride-Hail" },
                ].map((s) => (
                  <div key={s.file} className="flex-none w-[68vw] max-w-[260px] overflow-hidden rounded-xl border border-white/10 bg-[#111]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/showcase/${s.file}`} alt={s.label} className="h-36 w-full object-cover object-top" />
                    <div className="px-3 py-2.5">
                      <p className="font-mono text-[0.45rem] uppercase tracking-[0.16em] text-white/35">{s.tag}</p>
                      <p className="mt-0.5 font-display text-[0.78rem] font-semibold text-white">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Stats strip */}
          <Reveal direction="up" delay={0.6}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="px-5 py-4">
                  <p className="font-display text-2xl font-semibold text-white">
                    <StatValue value={s.value} />
                  </p>
                  <p className="mt-1 font-mono text-[0.52rem] uppercase leading-4 tracking-[0.1em] text-white/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── RIGHT COLUMN: founder photo + live work carousel ── */}
        <div className="hidden lg:flex lg:w-[44vw] flex-none flex-col relative overflow-hidden">
          {/* Founder photo — dark editorial background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jordan-founder.jpg"
            alt="Jordan Morris — Founder"
            className="absolute inset-0 h-full w-full object-cover object-[center_8%]"
            style={{ opacity: 0.55 }}
          />
          {/* Left gradient — fades photo into left text column */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/50 to-transparent" />
          {/* Bottom gradient — fades into carousel */}
          <div className="absolute bottom-0 inset-x-0 h-[70%] bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent" />

          {/* Live work carousel */}
          <div className="relative z-10 mt-auto">
            <HeroShowcase />
          </div>
        </div>

      </section>

      {/* ============================== CLIENT LOGO STRIP ============================== */}
      <ClientLogoStrip />


      {/* ============================== WORK / SHOWCASE ============================== */}
      <section id="work" className="section shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Selected Work</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
              Tech builds. Marketing campaigns. Both.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-600">
              Platforms shipped live, campaigns run for real clients, brands built from the ground up —
              across logistics, commerce, education, and marketing. Switch between Tech Work and Marketing
              &amp; Design below.
            </p>
          </div>
          <Link
            href="#contact"
            className="hidden shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-700 hover:text-ink-900 md:inline-flex"
          >
            Start yours
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <ShowcaseGrid />
      </section>

      {/* ============================== TESTIMONIALS ============================== */}
      <Testimonials />

      {/* ============================== CROSS-DEVICE BAND ============================== */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-70" />
        <div className="shell section relative grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow text-white/60">One System</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Built for every screen, every role.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              A single system, surfaced across devices and audiences — a
              marketing site, a customer web app, an admin console, and native
              iOS &amp; Android apps. Here&apos;s RideLink Jamaica running on
              desktop and mobile.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                { icon: Monitor, label: "Desktop & web apps" },
                { icon: Tablet, label: "Tablet-ready admin dashboards" },
                { icon: Smartphone, label: "Native iOS & Android apps" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-white/80">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm">{label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-2">
              {["Rider app", "Driver app", "Admin console", "Marketing site"].map(
                (t) => (
                  <span key={t} className="tag tag-dark">
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <LaptopFrame
              host="ridelink-jamaica.vercel.app"
              alt="RideLink Jamaica web platform on a laptop"
              className="float"
            />
            <div className="float-2 absolute -bottom-6 right-0 w-28 sm:w-36 lg:-right-6 lg:w-40">
              <PhoneFrame
                host="ridelink-jamaica.vercel.app"
                alt="RideLink Jamaica rider app on mobile"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================== SERVICES (interactive: click → packages → pay) ============================== */}
      <ServicesSection />

      {/* ============================== PRODUCTS (Supreme Suite SaaS line) ============================== */}
      <SupremeSuiteSection />

      {/* ============================== PROCESS ============================== */}
      <section id="process" className="overflow-hidden border-y border-line bg-ink-950 text-white">
        <div className="shell section">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <span className="eyebrow no-rule text-white/40">How We Work</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Eight steps. Every build.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-sm leading-7 text-white/45 md:text-right">
                From discovery to launch — a repeatable system that makes fast delivery possible
                without cutting corners.
              </p>
            </Reveal>
          </div>

          {/* Horizontal scrolling timeline */}
          <div className="mt-14 overflow-x-auto pb-4 scrollbar-none">
            <div className="flex min-w-max gap-px">
              {PROCESS.map((p, i) => (
                <div
                  key={p.step}
                  className="pm-step relative w-56 flex-none border border-white/[0.08] bg-white/[0.03] p-6 first:rounded-l-2xl last:rounded-r-2xl"
                  style={{ "--pm-d": `${i * 1.5}s`, "--pm-dur": `${PROCESS.length * 1.5}s` } as CSSProperties}
                >
                  {/* connector line */}
                  {i < PROCESS.length - 1 && (
                    <div className="absolute -right-px top-8 h-px w-px bg-white/20" />
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30">
                      {p.step}
                    </span>
                    <span className="relative flex h-2 w-2 flex-none mt-0.5">
                      <span
                        className="pm-ping absolute inline-flex h-full w-full rounded-full border border-white/60"
                        style={{ "--pm-d": `${i * 1.5}s` } as CSSProperties}
                      />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white/40" />
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-sm font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/40">{p.blurb}</p>
                </div>
              ))}
            </div>
          </div>
          <Reveal>
            <p className="mt-4 text-center font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/20">
              scroll to see all steps →
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================== PRICING ============================== */}
      <section id="pricing" className="section shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow no-rule justify-center">Pricing</span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            Real prices. Pay online, we start.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-600">
            Website packages below. Apps, social media management, and brand &amp;
            design each have their own packages in{" "}
            <a href="#services" className="underline hover:text-ink-900">
              Services
            </a>
            . Pay securely by card — prices in JMD.
          </p>
        </div>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3" amount={0.1}>
          {websiteOffer.packages.map((plan) => {
            const featured = !!plan.popular;
            return (
              <RevealItem key={plan.id}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 ${
                  featured
                    ? "border-ink-950 bg-ink-950 text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]"
                    : "border-line bg-white text-ink-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {featured ? <span className="tag tag-dark">Popular</span> : null}
                </div>
                <p
                  className={`mt-4 font-display text-4xl font-semibold ${
                    featured ? "text-white" : "text-ink-900"
                  }`}
                >
                  {priceLabel(plan)}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 flex-none ${
                          featured ? "text-white" : "text-ink-900"
                        }`}
                      />
                      <span className={featured ? "text-white/85" : "text-ink-700"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <PayButton
                    slug="digital-presence"
                    pkg={plan.id}
                    label={`Pay ${priceLabel(plan)}`}
                    className={`btn w-full ${featured ? "btn-on-dark" : "btn-dark"}`}
                  />
                  <Link
                    href="/start?service=digital-presence"
                    className={`mt-3 block text-center font-mono text-[0.62rem] uppercase tracking-[0.12em] ${
                      featured ? "text-white/60 hover:text-white" : "text-ink-500 hover:text-ink-900"
                    }`}
                  >
                    or send an inquiry first
                  </Link>
                </div>
              </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.12em] text-ink-500">
          PayPal or bank transfer · after payment we collect your project details
        </p>
        <p className="mt-3 text-center">
          <Link
            href="/market"
            className="font-mono text-xs uppercase tracking-[0.12em] text-ink-500 underline underline-offset-4 hover:text-ink-900"
          >
            See what competitors charge for these systems →
          </Link>
        </p>
      </section>

      {/* ============================== ABOUT ============================== */}
      <section id="about" className="border-y border-line bg-white">
        <div className="shell section grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <span className="eyebrow">About J Supreme Tech</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
              Architect-level thinking for Caribbean-to-global brands.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink-600">
              J Supreme Tech is a black-and-white technology studio. We build
              websites, apps, business systems, and scalable infrastructure for
              brands that need more than a basic online presence — and we present
              every build with the same clarity we design it.
            </p>
            <p className="mt-4 text-lg leading-8 text-ink-600">
              The studio sits inside the J Supreme group, alongside the operator
              workspace that runs our own CRM, invoices, and projects.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink-700 underline underline-offset-4 hover:text-ink-900"
            >
              The full story, identity &amp; group structure
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {taglines.map((t) => (
              <div key={t} className="card card-hover p-6">
                <Check className="h-5 w-5 text-ink-900" />
                <p className="mt-5 font-display text-lg font-semibold leading-7 text-ink-900">
                  {t}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== CONTACT ============================== */}
      <section id="contact" className="section shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="eyebrow">Start a Project</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
              Tell us what to build next.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-600">
              Share the goal and we&apos;ll come back with a system plan, scope,
              and timeline. Prefer to talk? Reach us directly.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href="https://wa.me/16582182282"
                target="_blank"
                rel="noreferrer"
                className="card card-hover flex items-center gap-3 p-4 text-ink-800"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">WhatsApp: 658-218-2282</span>
              </a>
              <a
                href="mailto:global.jsuprememarketing@gmail.com"
                className="card card-hover flex items-center gap-3 break-all p-4 text-ink-800"
              >
                <Mail className="h-5 w-5 flex-none" />
                <span className="text-sm font-medium">
                  global.jsuprememarketing@gmail.com
                </span>
              </a>
              <div className="card flex items-center gap-3 p-4 text-ink-800">
                <Globe2 className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Jamaica · Caribbean · Worldwide
                </span>
              </div>
            </div>
          </div>
          <ProjectIntakeForm />
        </div>
      </section>
    </main>
  );
}
