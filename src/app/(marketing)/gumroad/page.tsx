import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Code2,
  ExternalLink,
  Globe,
  LayoutTemplate,
  MessageCircle,
  Package,
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { CineWords } from "@/components/CineWords";
import { Marquee, Reveal, RevealGroup, RevealItem, ScrollProgress } from "@/components/motion-kit";
import { PageViewConversion } from "@/components/GoogleConversions";

export const metadata: Metadata = {
  title: "Digital Products & Store — J Supreme Tech",
  description:
    "Ebooks, SaaS systems, white-label websites, apps, and strategy sessions built by J Supreme Tech. International-grade, battle-tested in production. Available now.",
  openGraph: {
    title: "J Supreme Tech — Digital Store",
    description:
      "Templates, ebooks, apps, 13 SaaS products, white-label websites and strategy calls. Built for founders worldwide.",
    url: "https://jsupremetech.online/gumroad",
  },
  // Unlisted: kept live for Gumroad's own linking/redirects, but not
  // surfaced in nav or search — removed from the Products dropdown.
  robots: { index: false, follow: false },
};

const STORE_URL = "https://store.jsupremetech.online";

const RAINBOW = [
  "#FF3B3B", // red
  "#FF8C00", // orange
  "#FFD700", // yellow
  "#00C853", // green
  "#00B4D8", // cyan
  "#7B2FFF", // violet
];

type Product = {
  id: string;
  icon: React.ElementType;
  badge: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceNote: string;
  gumroadSlug: string;
  highlight?: string;
  accent: string;
  tags: string[];
  coverSlug: string;
};

const PRODUCTS: Product[] = [
  // ── EBOOKS ──────────────────────────────────────────────────────────────────
  {
    id: "biz-playbook",
    icon: BookOpen,
    badge: "E-Book",
    category: "ebooks",
    name: "The Founder's Launch Playbook",
    tagline: "Launch a profitable digital business from scratch.",
    description:
      "A 60-page system for first-time founders worldwide — brand identity, first 10 clients, pricing strategy, digital infrastructure, and 90-day revenue roadmap. Works in any market, any currency.",
    price: "US$47",
    priceNote: "one-time · instant PDF",
    gumroadSlug: "founders-launch-playbook",
    highlight: "Best Seller",
    accent: RAINBOW[0],
    tags: ["Founders", "Business", "Global"],
    coverSlug: "founders-launch-playbook",
  },
  {
    id: "academy-monthly",
    icon: Star,
    badge: "Subscription",
    category: "ebooks",
    name: "JST Academy — Monthly Mastery",
    tagline: "One new skill module every month.",
    description:
      "12-module drip curriculum: branding → web → social → funnels → CRM → SaaS → pricing → recurring revenue. Cancel anytime. Annual plan saves 46%. Each module is a self-contained PDF with objectives and action steps.",
    price: "US$15",
    priceNote: "per month · or US$97/yr",
    gumroadSlug: "jst-academy-monthly",
    accent: RAINBOW[4],
    tags: ["Monthly", "Curriculum", "Cancel anytime"],
    coverSlug: "jst-academy-monthly",
  },
  {
    id: "content-calendar",
    icon: CalendarClock,
    badge: "Template",
    category: "ebooks",
    name: "90-Day Content Calendar",
    tagline: "Never wonder what to post again.",
    description:
      "Notion-based 90-day planner with 120 caption templates across 4 content pillars, a 30-day hashtag bank, and a quick-start posting guide. Built for any niche — not region-locked.",
    price: "US$19",
    priceNote: "one-time · Notion template",
    gumroadSlug: "content-calendar",
    accent: RAINBOW[2],
    tags: ["Notion", "Content", "Social media"],
    coverSlug: "content-calendar",
  },
  {
    id: "brand-kit",
    icon: Sparkles,
    badge: "Resource",
    category: "ebooks",
    name: "Brand Starter Kit",
    tagline: "Go from idea to identity in a day.",
    description:
      "Canva brand system: logo frame, 6-color palette guide, font pairing sheet, 12 social templates, cover photo — everything a new business needs to look professional on day one.",
    price: "US$29",
    priceNote: "one-time · Canva + PDF",
    gumroadSlug: "brand-kit",
    accent: RAINBOW[5],
    tags: ["Canva", "Branding", "Design"],
    coverSlug: "brand-kit",
  },

  // ── WEBSITES ────────────────────────────────────────────────────────────────
  {
    id: "website-template",
    icon: LayoutTemplate,
    badge: "Website Template",
    category: "websites",
    name: "Launch-Ready Business Website",
    tagline: "Ship your site in a weekend.",
    description:
      "Clean, professional multi-section HTML template: hero, services, pricing, testimonials, contact, and WhatsApp CTA. No framework required — push to Vercel or Netlify for free in minutes.",
    price: "US$47",
    priceNote: "one-time · HTML + CSS",
    gumroadSlug: "website-template",
    accent: RAINBOW[1],
    tags: ["HTML", "Responsive", "No-framework"],
    coverSlug: "website-template",
  },
  {
    id: "next-template",
    icon: Code2,
    badge: "Website Template",
    category: "websites",
    name: "Next.js Pro Starter (App Router)",
    tagline: "Production-ready Next.js 15 scaffold.",
    description:
      "Full Next.js 15 App Router boilerplate: Tailwind 4, Supabase auth, Resend email, Stripe payments, dark mode, SEO, sitemap, and a blog. Skip 40+ hours of setup. One command to deploy.",
    price: "US$97",
    priceNote: "one-time · full source",
    gumroadSlug: "nextjs-pro-starter",
    highlight: "Developer Pick",
    accent: RAINBOW[4],
    tags: ["Next.js 15", "Supabase", "Stripe"],
    coverSlug: "nextjs-pro-starter",
  },

  // ── APPS ────────────────────────────────────────────────────────────────────
  {
    id: "courier-app-template",
    icon: Package,
    badge: "App Template",
    category: "apps",
    name: "Courier & Logistics App",
    tagline: "Full courier scheduling platform.",
    description:
      "Next.js + Payload CMS + Clerk auth — a complete courier booking and dispatch platform. Driver dashboard, client portal, admin panel. Used in production at bpcouriers.online. Source included.",
    price: "US$197",
    priceNote: "one-time · full source",
    gumroadSlug: "courier-app-template",
    accent: RAINBOW[3],
    tags: ["Next.js", "Payload CMS", "Clerk"],
    coverSlug: "courier-app-template",
  },
  {
    id: "booking-app-template",
    icon: CalendarClock,
    badge: "App Template",
    category: "apps",
    name: "Booking & Service App",
    tagline: "Online bookings with payments wired up.",
    description:
      "Full-stack booking app template: service catalogue, date/time picker, Stripe checkout, admin calendar, automated email confirmations. Works for salons, movers, tours, coaches — any service business.",
    price: "US$147",
    priceNote: "one-time · full source",
    gumroadSlug: "booking-app-template",
    accent: RAINBOW[2],
    tags: ["Bookings", "Stripe", "Admin panel"],
    coverSlug: "booking-app-template",
  },

  // ── SAAS ─────────────────────────────────────────────────────────────────
  {
    id: "supreme-suite",
    icon: Globe,
    badge: "SaaS Access",
    category: "saas",
    name: "Supreme Suite — 13 Business Systems",
    tagline: "One platform. Thirteen systems.",
    description:
      "Courier management, booking engine, CRM, POS, inventory, employee portal, client portal, and more — all white-labeled for your brand. Start with a free 3-day trial, no card required.",
    price: "From US$29",
    priceNote: "per month · 3-day free trial",
    gumroadSlug: "supreme-suite",
    highlight: "Most Popular",
    accent: RAINBOW[5],
    tags: ["SaaS", "White-label", "13 systems"],
    coverSlug: "supreme-suite",
  },
  {
    id: "axiom-access",
    icon: Zap,
    badge: "SaaS Access",
    category: "saas",
    name: "AXIOM — AI Coding Console",
    tagline: "Your AI-powered dev environment.",
    description:
      "AXIOM is a live coding-agent console: prompt-to-code, agent runs, shareable sessions, and PWA install. Powered by Claude. Ideal for developers and technical founders who want to ship faster.",
    price: "US$19",
    priceNote: "per month",
    gumroadSlug: "axiom-access",
    accent: RAINBOW[0],
    tags: ["AI", "Coding", "PWA"],
    coverSlug: "axiom-access",
  },

  // ── WHITE-LABEL SERVICES ─────────────────────────────────────────────────
  {
    id: "discovery",
    icon: CalendarClock,
    badge: "Strategy Call",
    category: "services",
    name: "1-on-1 Discovery Session",
    tagline: "60 minutes. Real strategy.",
    description:
      "A focused 60-minute session with Jordan Morris. Bring your business challenge — leave with a clear digital roadmap, prioritized action items, and an honest cost assessment. Book a slot and come prepared.",
    price: "US$75",
    priceNote: "per session · 60 min",
    gumroadSlug: "discovery",
    accent: RAINBOW[1],
    tags: ["Strategy", "1-on-1", "Live session"],
    coverSlug: "discovery",
  },
  {
    id: "white-label-website",
    icon: Globe,
    badge: "White-Label Service",
    category: "services",
    name: "Done-For-You Business Website",
    tagline: "We build it. You own it.",
    description:
      "Full custom website designed and deployed by J Supreme Tech: strategy session, design, build, domain, hosting setup, and handoff documentation. Delivered in 5–7 business days.",
    price: "US$499",
    priceNote: "one-time · delivery in 5–7 days",
    gumroadSlug: "done-for-you-website",
    highlight: "White-Label",
    accent: RAINBOW[3],
    tags: ["Done-for-you", "Custom", "Delivered"],
    coverSlug: "done-for-you-website",
  },
  {
    id: "white-label-saas",
    icon: Sparkles,
    badge: "White-Label Service",
    category: "services",
    name: "White-Label SaaS Setup",
    tagline: "Your brand. Our platform.",
    description:
      "We provision a fully white-labeled Supreme Suite instance under your brand domain: custom logo, colors, domain, onboarding email, and admin access. Launch a SaaS product in 48 hours.",
    price: "US$299",
    priceNote: "setup · then from US$29/mo",
    gumroadSlug: "white-label-saas",
    accent: RAINBOW[4],
    tags: ["White-label", "SaaS", "48-hr setup"],
    coverSlug: "white-label-saas",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "ebooks", label: "E-Books & Templates" },
  { id: "websites", label: "Website Templates" },
  { id: "apps", label: "App Templates" },
  { id: "saas", label: "SaaS Access" },
  { id: "services", label: "White-Label Services" },
];

const TRUST = [
  { label: "100+", sub: "client sites live" },
  { label: "20+", sub: "managed brands" },
  { label: "13", sub: "SaaS systems" },
  { label: "100+", sub: "founders served" },
];

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;
  const href = `${STORE_URL}/l/${product.gumroadSlug}`;
  return (
    <RevealItem>
      <div
        className="group relative flex flex-col rounded-2xl border border-[#e4e4e4] bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_12px_48px_-8px_rgba(0,0,0,0.14)] hover:-translate-y-0.5"
        style={{ "--accent": product.accent } as React.CSSProperties}
      >
        {/* Cover art */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/covers/${product.coverSlug}.svg`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {product.highlight && (
            <span
              className="absolute right-3 top-3 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
              style={{ background: product.accent }}
            >
              {product.highlight}
            </span>
          )}
        </div>

        {/* Rainbow top bar on content area */}
        <div
          className="absolute left-0 bottom-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: product.accent }}
        />

        <div className="flex flex-col gap-5 p-7">

        <div className="flex items-start gap-4">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${product.accent}18`, border: `1px solid ${product.accent}33` }}
          >
            <Icon className="h-5 w-5" style={{ color: product.accent }} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#999]">
              {product.badge}
            </span>
            <h3 className="mt-0.5 text-lg font-bold leading-tight text-[#141414]">{product.name}</h3>
            <p className="text-sm text-[#555]">{product.tagline}</p>
          </div>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-[#444]">{product.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {product.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{ borderColor: `${product.accent}44`, color: product.accent }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-4">
          <div>
            <span className="text-xl font-black text-[#141414]">{product.price}</span>
            <span className="ml-1.5 text-xs text-[#999]">{product.priceNote}</span>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            style={{ background: product.accent }}
          >
            Get it <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        </div>{/* end inner content */}
      </div>
    </RevealItem>
  );
}

export default function GumroadPage() {
  return (
    <>
      <PageViewConversion />
      <ScrollProgress />

      {/* Rainbow marquee strip */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg,#FF3B3B,#FF8C00,#FFD700,#00C853,#00B4D8,#7B2FFF,#FF3B3B)",
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a0a0a] px-6 pb-24 pt-32 text-center">
        {/* Subtle rainbow glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full opacity-[0.07] blur-[120px]"
            style={{ background: "radial-gradient(circle,#7B2FFF,transparent)" }}
          />
          <div
            className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full opacity-[0.07] blur-[100px]"
            style={{ background: "radial-gradient(circle,#00B4D8,transparent)" }}
          />
        </div>

        <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white/40">
          J Supreme Tech — Digital Store
        </p>
        <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[4.5rem]">
          <CineWords text="Everything we build — available to the world." />
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/50">
          Ebooks, website templates, app source code, SaaS systems, and white-label services. Built
          in production. Available for founders everywhere.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-80"
            style={{
              background:
                "linear-gradient(135deg,#FF3B3B 0%,#FF8C00 25%,#FFD700 50%,#00C853 75%,#7B2FFF 100%)",
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            Browse the Store
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Custom project? Let&apos;s talk
          </Link>
        </div>

        {/* Trust band */}
        <div className="mx-auto mt-16 flex max-w-2xl flex-wrap items-center justify-center gap-12">
          {TRUST.map(({ label, sub }) => (
            <div key={sub} className="text-center">
              <p className="text-2xl font-black text-white">{label}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider marquee */}
      <div className="overflow-hidden border-y border-white/8 bg-[#0a0a0a] py-3.5">
        <Marquee speed={40}>
          {["E-Books", "Website Templates", "App Source Code", "13 SaaS Systems", "White-Label Services", "Strategy Calls", "Instant Downloads", "International Shipping", "Built in Production"].map(
            (t, i) => (
              <span
                key={t}
                className="mx-7 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: RAINBOW[i % RAINBOW.length] }}
              >
                {t}
              </span>
            ),
          )}
        </Marquee>
      </div>

      {/* Live Client Work — dark band */}
      <section className="bg-[#0a0a0a] border-t border-white/6 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="mb-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white/30">
              Built by J Supreme Tech — live in production
            </p>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Real clients. Real systems.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-white/45">
              Every template and product in this store is drawn from live client work — sites, apps, and platforms we&apos;ve shipped and still maintain.
            </p>
          </Reveal>

          {/* Live client sites — screenshot cards */}
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "The Language Cradle", url: "https://thelanguagecradle.com", cat: "Education Platform", accent: "#7B2FFF", desc: "Flagship IBLC learning platform with student portal, admin CMS, and Global Voice™ AI.", file: "/showcase/thelanguagecradle-com-d.webp" },
              { name: "BP Couriers", url: "https://bpcouriers.online", cat: "Courier App", accent: "#00C853", desc: "Full dispatch and booking platform — the live system behind the FleetRun SaaS product.", file: "/showcase/bpcouriers-online-d.webp" },
              { name: "The Cleanser JA", url: "https://the-cleanser-ja.vercel.app", cat: "E-Commerce Store", accent: "#FF8C00", desc: "Herbal wellness brand with a full admin, order system, and WiPay checkout.", file: "/showcase/the-cleanser-ja-vercel-app-d.webp" },
              { name: "Solace Auto Imports", url: "https://solace-auto-imports.vercel.app", cat: "Automotive Gallery", accent: "#00B4D8", desc: "JSON-driven Jamaican dealer car gallery — fast, elegant, zero-backend.", file: "/showcase/solace-auto-imports-vercel-app-d.webp" },
              { name: "RideLink Jamaica", url: "https://ridelink-jamaica.vercel.app", cat: "Ride-Hail Platform", accent: "#FF3B3B", desc: "Ride-hail and courier super app — rider, driver, and admin portals.", file: "/showcase/ridelink-jamaica-vercel-app-d.webp" },
              { name: "J Supreme Conglomerate", url: "https://jsupremeconglomerate.online", cat: "Operator Workspace", accent: "#FFD700", desc: "All-in-one CRM, invoices, and project management for multi-brand operators.", file: "/showcase/jsupremeconglomerate-online-d.webp" },
            ].map((site) => (
              <RevealItem key={site.name}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "8/5" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={site.file}
                      alt={site.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <ExternalLink className="h-2.5 w-2.5" /> Visit site
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: site.accent }}>
                      {site.cat}
                    </span>
                    <p className="font-display font-semibold text-white">{site.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/45">{site.desc}</p>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Demo companies */}
          <Reveal>
            <p className="mb-4 mt-14 text-center font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white/25">
              Demo showcases — explore the possibilities
            </p>
          </Reveal>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Fabworks JA", url: "https://fabworks-ja.vercel.app", cat: "Manufacturing", accent: "#FF8C00" },
              { name: "Crown District", url: "https://crown-district-ja.vercel.app", cat: "Real Estate", accent: "#FFD700" },
              { name: "RideLink Jamaica", url: "https://ridelink-jamaica.vercel.app", cat: "Ride-Hailing", accent: "#00C853" },
              { name: "NexPro", url: "https://nexpro.vercel.app", cat: "B2B Services", accent: "#7B2FFF" },
              { name: "Keltec Promotions", url: "https://keltec-promotions.vercel.app", cat: "Events", accent: "#FF3B3B" },
              { name: "Trella Marketing", url: "https://trella-marketing.vercel.app", cat: "Agency", accent: "#00B4D8" },
              { name: "Lumina Entertainment", url: "https://lumina-entertainment.vercel.app", cat: "Entertainment", accent: "#FFD700" },
              { name: "Unique Solid Surfaces", url: "https://unique-solid-surfaces.vercel.app", cat: "Countertops", accent: "#FF8C00" },
            ].map((d) => (
              <RevealItem key={d.name}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3.5 transition-all hover:border-white/20 hover:-translate-y-0.5"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${d.accent}18` }}
                  >
                    <Globe className="h-4 w-4" style={{ color: d.accent }} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{d.name}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: d.accent }}>{d.cat}</p>
                  </div>
                  <ExternalLink className="ml-auto h-3 w-3 shrink-0 text-white/20 group-hover:text-white/50" />
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Product sections */}
      <section className="bg-[#080808] border-t border-white/6 px-6 py-16">
        <div className="mx-auto max-w-6xl">

          {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
            const items = PRODUCTS.filter((p) => p.category === cat.id);
            if (!items.length) return null;
            return (
              <div key={cat.id} className="mb-14 last:mb-0">
                <Reveal>
                  <div className="mb-8 flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
                      {cat.label}
                    </span>
                    <div className="h-px flex-1 bg-white/8" />
                    <a
                      href={`${STORE_URL}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-white/40 hover:text-white"
                    >
                      View all <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </Reveal>
                <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </RevealGroup>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#0a0a0a] px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white/30">
            How it works
          </p>
          <h2 className="text-3xl font-black sm:text-4xl">Pick. Pay. Build.</h2>
          <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Find your product",
                body: "Browse by category — ebook, template, app, SaaS, or service. Every product ships with documentation.",
                color: RAINBOW[0],
              },
              {
                step: "02",
                title: "Pay on Gumroad",
                body: "Secure checkout via Gumroad. Instant download link or booking confirmation sent to your email.",
                color: RAINBOW[3],
              },
              {
                step: "03",
                title: "Put it to work",
                body: "Follow the included guide. Questions? WhatsApp line is open. We respond within 24 hours.",
                color: RAINBOW[5],
              },
            ].map(({ step, title, body, color }) => (
              <div key={step} className="relative pl-5" style={{ borderLeft: `2px solid ${color}` }}>
                <span className="block text-xs font-black tracking-[0.3em]" style={{ color }}>
                  {step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-24 text-center">
        <Reveal>
          <h2 className="text-3xl font-black text-[#141414] sm:text-4xl">
            Need it fully built?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-[#555]">
            Templates and ebooks give you the foundation. If you need the full build — website, app, CRM, brand, SaaS — we do that too.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-[#141414] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-80"
            >
              See our services <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/16582182282"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#e4e4e4] px-7 py-3.5 text-sm font-semibold text-[#141414] transition-colors hover:bg-[#f8f8f8]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
