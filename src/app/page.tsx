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
import { BrowserFrame, LaptopFrame, PhoneFrame } from "@/components/DeviceFrame";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { MarketingShowcase } from "@/components/MarketingShowcase";
import { ServicesSection } from "@/components/ServicesSection";
import { SupremeSuiteSection } from "@/components/SupremeSuiteSection";
import { PayButton } from "@/components/PayButton";
import { ProjectIntakeForm } from "@/components/ProjectIntakeForm";
import type { CSSProperties } from "react";
import { PROCESS, PROJECTS, STATS } from "@/lib/portfolio";
import { SERVICE_OFFERS, priceLabel } from "@/lib/serviceOffers";
import { CountUp, Marquee, Reveal, RevealGroup, RevealItem, ScrollProgress } from "@/components/motion-kit";

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
    portfolio.ts — "12+" (suffix), "07"/"03" (leading zeros), "JA→∞" (as-is). */
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
      <section id="home" className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="shell relative grid items-center gap-16 pb-20 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-28">
          {/* Copy */}
          <div>
            <Reveal direction="up">
              <span className="eyebrow no-rule">
                <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-ink-900" />
                Creative Technology &middot; Digital Systems
              </span>
            </Reveal>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-ink-900 sm:text-6xl xl:text-7xl">
              <CineWords text="We design the system." delay={0.15} />
              <br />
              <CineWords text="You run the business." delay={0.55} />
            </h1>
            <Reveal direction="up" delay={0.2}>
              <p className="mt-7 max-w-xl text-lg leading-8 text-ink-600">
                Websites, apps, CRMs, booking engines, e-commerce platforms,
                automations, and full digital infrastructure — built clean,
                shipped live, and organized to scale. From Jamaica to the world.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="#contact" className="btn btn-dark">
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#work" className="btn btn-outline">
                  View the Work
                </Link>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <div className="mt-7 flex flex-col gap-4 text-sm text-ink-600 sm:flex-row sm:items-center sm:gap-6">
                <a
                  href="https://wa.me/16582182282"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-ink-900"
                >
                  <MessageCircle className="h-4 w-4" />
                  658-218-2282
                </a>
                <a
                  href="mailto:global.jsuprememarketing@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-ink-900"
                >
                  <Mail className="h-4 w-4" />
                  Email the studio
                </a>
              </div>
            </Reveal>

            {/* Inline stats */}
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white p-4">
                  <p className="font-display text-2xl font-semibold text-ink-900">
                    <StatValue value={s.value} />
                  </p>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase leading-4 tracking-[0.1em] text-ink-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Device cluster */}
          <div className="relative mx-auto w-full max-w-xl pb-12 lg:pb-0">
            <BrowserFrame
              host="jsupremeconglomerate.online"
              alt="Supreme OS — operator workspace dashboard"
              className="float"
            />
            <div className="float-2 absolute -bottom-8 -left-4 w-28 sm:-left-8 sm:w-36 lg:w-40">
              <PhoneFrame
                host="crown-district-ja.vercel.app"
                alt="Crown District JA storefront on mobile"
              />
            </div>
            <div className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] md:flex">
              <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-ink-900" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-600">
                12 platforms · live
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== MARQUEE ============================== */}
      <section className="border-y border-line bg-white py-5">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="ml-6 hidden shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-400 sm:block">
            Shipped live ↗
          </span>
          <Marquee speed={30} gap="0rem">
            {PROJECTS.map((p) => (
              <span
                key={p.host}
                className="mx-6 inline-flex items-center gap-3 font-mono text-sm text-ink-500"
              >
                <span className="text-ink-900">{p.name}</span>
                <span className="text-ink-300">/ {p.tag}</span>
                <span className="text-ink-300">•</span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ============================== WORK / SHOWCASE ============================== */}
      <section id="work" className="section shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Selected Work</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
              Real platforms. Live screens. Every industry.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-600">
              Twelve shipped products across logistics, commerce, education, and
              business operations — captured live, organized by use case. Click
              any mockup to open the real site.
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

      {/* ============================== MARKETING & DESIGN ============================== */}
      <MarketingShowcase />

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
      <section id="process" className="border-y border-line bg-ink-50">
        <div className="shell section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow no-rule justify-center">How We Work</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
              A standard delivery workflow.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-600">
              Discover, design, architect, build, test, launch, scale. Clear at
              every step, measurable at every milestone.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div
                key={p.step}
                className="pm-step bg-white p-6"
                style={{ "--pm-d": `${i * 1.5}s`, "--pm-dur": `${PROCESS.length * 1.5}s` } as CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-sm font-bold text-ink-900">{p.step}</p>
                  <span className="relative flex h-2 w-2">
                    <span
                      className="pm-ping absolute inline-flex h-full w-full rounded-full border-2 border-ink-900"
                      style={{ "--pm-d": `${i * 1.5}s` } as CSSProperties}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ink-900" />
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-500">{p.blurb}</p>
              </div>
            ))}
          </div>
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
          Secure card payment via WiPay · after payment we collect your project details
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
