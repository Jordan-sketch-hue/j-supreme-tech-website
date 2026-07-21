import type { Metadata } from "next";
import { ArrowRight, Check, Code2, Image, MessageCircle, Monitor, Palette, Play, Sparkles, Video, Zap } from "lucide-react";
import { PageViewConversion } from "@/components/GoogleConversions";
import { CineWords } from "@/components/CineWords";
import { Reveal, RevealGroup, ScrollProgress } from "@/components/motion-kit";

export const metadata: Metadata = {
  title: "AXIOM — Build, Create & Publish | J Supreme Tech",
  description:
    "AXIOM generates websites, apps, ad creatives and images, grades color, edits designs visually, and schedules content — all in one browser-based tool by J Supreme Tech.",
};

/* ─── what each mode produces ────────────────────────────── */
const MODES = [
  {
    icon: Code2,
    label: "WEBSITES & APPS",
    headline: "Type a brief. Get a build.",
    body: "Describe any project — a booking site, e-commerce store, WhatsApp bot, Next.js dashboard — and AXIOM scaffolds the full code in seconds. Multi-page, real routing, zero dead links. Download as ZIP or deploy straight to Vercel.",
    output: ["Full HTML / Next.js source", "Multi-page with live nav", "Supabase, WiPay, Resend wired in", "ZIP download or one-click deploy"],
    color: "#f5a623",
  },
  {
    icon: Image,
    label: "IMAGES & AD CREATIVES",
    headline: "Generate. Grade. Export.",
    body: "Generate on-brand images with Flux AI — then apply cinematic color grading (12 presets or manual sliders), remove backgrounds, and export sized PNG creatives for any format. Or search thousands of stock photos and videos from Pexels and Pixabay.",
    output: ["AI-generated images (1:1, 9:16, 4:5, 16:9)", "12 cinematic color presets", "Background removal", "PNG export at full quality"],
    color: "#8B5CF6",
  },
  {
    icon: Sparkles,
    label: "AD STUDIO",
    headline: "Sized creatives, ready to post.",
    body: "Pick a canvas format, choose a brand, pull B-roll from stock media or generate a background, add your text layers, write captions with AI, and export a print-quality PNG. Every size social needs, built into one canvas.",
    output: ["1080×1080 · 1080×1920 · 1920×1080", "Brand-registered colors + fonts", "AI caption writing", "Direct to content queue"],
    color: "#10B981",
  },
  {
    icon: Monitor,
    label: "VISUAL EDITING",
    headline: "Click anything. Change it.",
    body: "Every site AXIOM builds opens in a live canvas editor. Click any element — headline, button, section background — to edit text, swap colors, resize, or delete. No code needed. Save back to the build or export as a new file.",
    output: ["Click-to-edit any element", "Color, font, size controls", "Drag to reposition", "Save directly to build"],
    color: "#3B82F6",
  },
];

const MEDIA_FEATURES = [
  "Search millions of stock photos",
  "Download video B-roll (Pexels + Pixabay)",
  "Inject media into any build with one click",
  "Use as backgrounds in Ad Studio",
  "Copy direct URLs for social posts",
];

const PLANS = [
  {
    name: "Starter",
    price: "US$29",
    period: "/mo",
    desc: "Solo creator or small brand",
    features: [
      "Website & app builder",
      "50 AI images per month",
      "Color grading studio",
      "Stock media (photos + video)",
      "Social content scheduling",
      "Knowledge base sync",
    ],
    cta: "Start free — 14 days",
    href: "https://axiom.jsupremetech.online",
    highlight: false,
  },
  {
    name: "Pro",
    price: "US$59",
    period: "/mo",
    desc: "Agencies & content teams",
    features: [
      "Everything in Starter",
      "Real AI codegen (Claude Sonnet)",
      "Unlimited image generation",
      "Ad Creative Studio — all sizes",
      "Multi-brand social scheduling",
      "Visual canvas editor",
      "Unlimited knowledge base",
      "Priority support",
    ],
    cta: "Start free — 14 days",
    href: "https://axiom.jsupremetech.online",
    highlight: true,
  },
  {
    name: "White-Label",
    price: "US$149",
    period: "/mo",
    desc: "Resell under your own brand",
    features: [
      "Everything in Pro",
      "Custom domain + logo",
      "Unlimited client workspaces",
      "Your branding on all exports",
      "Reseller dashboard",
      "Dedicated onboarding call",
    ],
    cta: "Talk to us",
    href: "https://wa.me/16582182282",
    highlight: false,
  },
];

const COMPETITORS = [
  { name: "Canva",         build: false, aiCode: false, grade: false, media: true,  price: "US$15/mo" },
  { name: "Webflow",       build: true,  aiCode: false, grade: false, media: false, price: "US$23/mo" },
  { name: "Framer",        build: true,  aiCode: false, grade: false, media: false, price: "US$20/mo" },
  { name: "Adobe Express", build: false, aiCode: false, grade: true,  media: true,  price: "US$30/mo" },
  { name: "Buffer",        build: false, aiCode: false, grade: false, media: false, price: "US$18/mo" },
  { name: "AXIOM",         build: true,  aiCode: true,  grade: true,  media: true,  price: "US$29/mo" },
];

function TerminalDemo({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div className="overflow-hidden border border-white/10 bg-ink-950 font-mono text-xs">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="ml-3 text-[10px] uppercase tracking-widest text-white/25">{label}</span>
      </div>
      <div className="min-h-[150px] space-y-1.5 p-5">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith("◆")
                ? "text-[#f5a623]"
                : line.startsWith(">")
                  ? "text-white/90"
                  : "text-white/35"
            }
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AxiomPage() {
  return (
    <main className="bg-white text-ink-900">
      <PageViewConversion />
      <ScrollProgress className="bg-ink-900" />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative flex min-h-[90svh] flex-col justify-center overflow-hidden bg-ink-950 text-white">
        <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(245,166,35,0.10),transparent)]" />

        <div className="shell relative z-10 py-24">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">
              J Supreme Tech · Creative Platform
            </p>
          </Reveal>

          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.04] tracking-tight md:text-[4.2rem]">
            <CineWords text="Build websites." delay={0.08} />{" "}
            <span className="text-[#f5a623]">
              <CineWords text="Create images." delay={0.22} />
            </span>{" "}
            <CineWords text="Ship content." delay={0.38} />
          </h1>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50">
              AXIOM is a single browser-based tool that replaces the five subscriptions
              your creative workflow currently runs on.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://axiom.jsupremetech.online"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#f5a623] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#f5a623]/90"
              >
                Try AXIOM free <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#what-it-does"
                className="inline-flex items-center gap-2 border border-white/15 px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.15em] text-white/60 transition hover:border-white/30 hover:text-white"
              >
                See what it does
              </a>
            </div>
          </Reveal>

          {/* Terminal demo */}
          <Reveal delay={0.38}>
            <div className="mt-16 max-w-xl">
              <TerminalDemo
                label="AXIOM — website builder"
                lines={[
                  "> full site for a jamaican car wash — booking, pricing, gallery",
                  "",
                  "◆ 5 pages — index · services · booking · gallery · contact",
                  "◆ Brand colors matched · nav links verified · 0 dead links",
                  "◆ ZIP ready — download or deploy to Vercel ↗",
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ WHAT IT DOES — 4 clear modes ═══════════════ */}
      <section id="what-it-does" className="border-b border-line bg-white py-20">
        <div className="shell">
          <Reveal>
            <span className="eyebrow no-rule">What AXIOM does</span>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight">
              Four things. One tool.
            </h2>
            <p className="mt-4 max-w-lg text-ink-500">
              Each mode is its own studio — pick what you need to make and AXIOM walks you through it.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-0 divide-y divide-line border border-line md:grid-cols-2 md:divide-x md:divide-y-0">
            {MODES.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.05}>
                <div className="flex flex-col gap-5 p-8 md:p-10">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center"
                      style={{ background: `${m.color}18` }}
                    >
                      <m.icon className="h-4.5 w-4.5" style={{ color: m.color }} />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
                      {m.label}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold">{m.headline}</h3>
                  <p className="text-sm leading-relaxed text-ink-500">{m.body}</p>
                  <ul className="space-y-2">
                    {m.output.map((o) => (
                      <li key={o} className="flex items-center gap-2.5 text-sm text-ink-600">
                        <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: m.color }} />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DEMO TERMINALS ═══════════════ */}
      <section className="border-b border-line bg-ink-50/40 py-20">
        <div className="shell">
          <Reveal>
            <span className="eyebrow no-rule">Live demos</span>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight">
              Prompt in. Output out.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal delay={0.04}>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5a623]">
                  Generate a website
                </p>
                <TerminalDemo
                  label="AXIOM · website"
                  lines={[
                    "> law firm site with booking, blog, and wipay checkout",
                    "",
                    "◆ CLASSIFY — law-firm · Next.js · Supabase · WiPay",
                    "◆ INTEGRATIONS — booking form · email · payments",
                    "◆ PAGES — home · services · blog · contact · checkout",
                    "◆ CODE — 6 files scaffolded",
                    "◆ DONE — ZIP ready / deploy to Vercel ↗",
                  ]}
                />
                <p className="text-xs text-ink-400">
                  Full source code. Real routing. Download or deploy instantly.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B5CF6]">
                  Generate + grade an image
                </p>
                <TerminalDemo
                  label="AXIOM · imagine + grade"
                  lines={[
                    "> generate: professional woman at laptop, tropical office",
                    "",
                    "◆ FLUX — generating 1080×1080 image…",
                    "◆ IMAGE READY — preview + download ↓",
                    "",
                    "> apply grade: Golden Hour",
                    "◆ GRADE — brightness +8% · hue +12° · vignette 35%",
                    "◆ BAKED PNG — full quality export ready ↓",
                  ]}
                />
                <p className="text-xs text-ink-400">
                  AI image generation → cinema-grade color → PNG download in one flow.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#10B981]">
                  Build an ad creative
                </p>
                <TerminalDemo
                  label="AXIOM · ad studio"
                  lines={[
                    "◆ FORMAT — 9:16 Story (1080×1920)",
                    "◆ BRAND — Language Cradle · violet palette",
                    "◆ MEDIA — searching 'caribbean classroom'…",
                    "  12 stock videos found · 1 selected as B-roll",
                    "◆ AI CAPTIONS — 5 caption options generated",
                    "◆ EXPORT PNG — 1080×1920 · full quality ↓",
                  ]}
                />
                <p className="text-xs text-ink-400">
                  Sized canvas. Stock media. AI captions. Export the file you actually need.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.09}>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B82F6]">
                  Edit a generated site visually
                </p>
                <TerminalDemo
                  label="AXIOM · canvas editor"
                  lines={[
                    "◆ BUILD LOADED — car wash site (5 pages)",
                    "◆ CANVAS EDITOR — click any element to edit",
                    "",
                    "  [click] Hero headline selected",
                    "  [edit] 'Best Car Wash in Kingston' → saved",
                    "  [click] CTA button selected",
                    "  [color] background → #1F56A8",
                    "◆ CHANGES SAVED — updated build ready to export",
                  ]}
                />
                <p className="text-xs text-ink-400">
                  No code. Click any text, color, or section — change it — save it.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <a
                href="https://axiom.jsupremetech.online"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-ink-950 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-ink-800"
              >
                <Play className="h-4 w-4" /> Open AXIOM and try it
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ STOCK MEDIA ═══════════════ */}
      <section className="border-b border-line bg-white py-20">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow no-rule">Stock photos & video</span>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
                Millions of images and videos. Built in.
              </h2>
              <p className="mt-4 text-ink-500">
                Search Pexels and Pixabay without leaving AXIOM. Find the photo or video clip you need, preview it, download it, or drop it straight into an ad creative or website — all in the same session.
              </p>
              <ul className="mt-6 space-y-3">
                {MEDIA_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-ink-700">
                    <Check className="h-4 w-4 flex-shrink-0 text-ink-900" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <TerminalDemo
                label="AXIOM · media library"
                lines={[
                  "> search videos: tropical resort jamaica",
                  "",
                  "◆ PEXELS — 18 videos found",
                  "  [1] Sunset over the Blue Mountains — 4K · 0:32",
                  "  [2] Kingston street market — HD · 1:14",
                  "  [3] Negril beach drone shot — 4K · 0:58",
                  "  …15 more results",
                  "",
                  "> download [1]",
                  "◆ DOWNLOADING — sunset-blue-mountains.mp4 ↓",
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ VS TABLE ═══════════════ */}
      <section className="border-b border-line bg-ink-50/40 py-20">
        <div className="shell">
          <Reveal>
            <span className="eyebrow no-rule">vs. the competition</span>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight">
              Every competitor does one thing.
            </h2>
            <p className="mt-4 max-w-lg text-ink-500">
              Most teams use 4–5 tools to cover what AXIOM handles in one login.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-12 overflow-x-auto">
              <table className="w-full border-collapse font-mono text-sm min-w-[540px]">
                <thead>
                  <tr className="border-b-2 border-ink-200">
                    <th className="py-3 pr-6 text-left text-[10px] uppercase tracking-widest text-ink-400 font-normal">Tool</th>
                    <th className="py-3 px-4 text-center text-[10px] uppercase tracking-widest text-ink-400 font-normal">Builds sites</th>
                    <th className="py-3 px-4 text-center text-[10px] uppercase tracking-widest text-ink-400 font-normal">AI code</th>
                    <th className="py-3 px-4 text-center text-[10px] uppercase tracking-widest text-ink-400 font-normal">Color grade</th>
                    <th className="py-3 px-4 text-center text-[10px] uppercase tracking-widest text-ink-400 font-normal">Stock media</th>
                    <th className="py-3 pl-4 text-right text-[10px] uppercase tracking-widest text-ink-400 font-normal">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS.map((c) => {
                    const ax = c.name === "AXIOM";
                    return (
                      <tr key={c.name} className={`border-b border-line ${ax ? "bg-ink-950 text-white" : "bg-white"}`}>
                        <td className={`py-4 pr-6 font-semibold ${ax ? "text-[#f5a623]" : "text-ink-900"}`}>
                          {ax ? "◆ AXIOM" : c.name}
                        </td>
                        {[c.build, c.aiCode, c.grade, c.media].map((v, i) => (
                          <td key={i} className="py-4 px-4 text-center">
                            {v
                              ? <Check className={`h-4 w-4 mx-auto ${ax ? "text-[#f5a623]" : "text-green-600"}`} />
                              : <span className="text-ink-300">—</span>}
                          </td>
                        ))}
                        <td className={`py-4 pl-4 text-right ${ax ? "text-[#f5a623] font-bold" : "text-ink-500"}`}>{c.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="border-b border-line bg-white py-20">
        <div className="shell">
          <Reveal>
            <span className="eyebrow no-rule">Pricing</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
              14 days free. No card needed.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.06}>
                <div className={`flex h-full flex-col border p-8 ${plan.highlight ? "border-ink-900 bg-ink-950 text-white" : "border-line bg-white"}`}>
                  {plan.highlight && (
                    <div className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5a623]">
                      Most popular
                    </div>
                  )}
                  <div className="font-display text-2xl font-semibold">{plan.name}</div>
                  <div className={`mt-1 text-sm ${plan.highlight ? "text-white/40" : "text-ink-400"}`}>{plan.desc}</div>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold">{plan.price}</span>
                    <span className={plan.highlight ? "text-white/35" : "text-ink-400"}>{plan.period}</span>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${plan.highlight ? "text-[#f5a623]" : "text-ink-700"}`} />
                        <span className={plan.highlight ? "text-white/75" : "text-ink-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-8 block w-full py-3.5 text-center font-mono text-sm font-bold uppercase tracking-[0.15em] transition ${
                      plan.highlight
                        ? "bg-[#f5a623] text-black hover:bg-[#f5a623]/90"
                        : "border border-ink-900 text-ink-900 hover:bg-ink-50"
                    }`}
                  >
                    {plan.cta} <ArrowRight className="inline h-4 w-4 ml-1" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="bg-ink-950 py-20 text-white">
        <div className="shell">
          <Reveal>
            <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight">
              Built in Jamaica. Working everywhere.
            </h2>
            <p className="mt-4 max-w-lg text-white/40">
              AXIOM is the creative OS behind J Supreme Tech. Now available as a standalone tool for agencies, brands, and creators.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://axiom.jsupremetech.online"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#f5a623] px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#f5a623]/90"
              >
                Open AXIOM <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/16582182282"
                className="inline-flex items-center gap-2 border border-white/15 px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.15em] text-white/60 transition hover:border-white/30 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" /> Talk to us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
