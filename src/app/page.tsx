import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Code2,
  Database,
  Globe2,
  LineChart,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Network,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Workflow,
} from "lucide-react";
import { ServiceCard, type ServiceCardProps } from "@/components/ServiceCard";
import { PricingCard, type PricingCardProps } from "@/components/PricingCard";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProjectIntakeForm } from "@/components/ProjectIntakeForm";

const services: ServiceCardProps[] = [
  {
    icon: Code2,
    title: "Website Development",
    eyebrow: "Presence Layer",
    description:
      "Responsive business websites, landing pages, portfolios, and SEO-ready service sites built with a premium conversion structure.",
    points: ["Business websites", "Landing pages", "Portfolio sites", "SEO-ready responsive builds"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    eyebrow: "Product Layer",
    description:
      "Android and iOS-ready customer apps, operation apps, and mobile product experiences for growing brands.",
    points: ["Android apps", "iOS-ready builds", "Customer apps", "Business operation apps"],
  },
  {
    icon: Store,
    title: "E-Commerce Systems",
    eyebrow: "Revenue Layer",
    description:
      "Online stores, catalogues, checkout systems, inventory structure, and payment-ready commerce flows.",
    points: ["Product catalogues", "Checkout systems", "Inventory structure", "Payment integrations"],
  },
  {
    icon: Workflow,
    title: "Booking & Reservation Systems",
    eyebrow: "Operations Layer",
    description:
      "Appointment, excursion, transfer, and reservation systems with scheduling logic and automated confirmations.",
    points: ["Appointment booking", "Excursion booking", "Calendar scheduling", "Automated confirmations"],
  },
  {
    icon: Database,
    title: "CRM & Data Systems",
    eyebrow: "Intelligence Layer",
    description:
      "Customer databases, lead tracking, sales pipelines, admin dashboards, records, and reporting systems.",
    points: ["Customer databases", "Lead tracking", "Sales pipelines", "Admin dashboards"],
  },
  {
    icon: Network,
    title: "Creative Technology & Digital Systems",
    eyebrow: "Architecture Layer",
    description:
      "Automation, software architecture, digital workflows, AI-assisted systems, internal tools, and dashboards.",
    points: ["Business automation", "System architecture", "AI-assisted systems", "Custom dashboards"],
  },
  {
    icon: Sparkles,
    title: "Branding & Digital Presentation",
    eyebrow: "Experience Layer",
    description:
      "Brand identity, social adverts, UI/UX design, Behance-ready case studies, and client presentation graphics.",
    points: ["Brand identity", "Social media adverts", "UI/UX design", "Presentation graphics"],
  },
];

const pricing: PricingCardProps[] = [
  {
    title: "Starter Digital Presence",
    price: "JMD $10,000+",
    description: "A sharp, responsive website or landing page for brands that need to move fast.",
    features: ["Basic website or landing page", "Mobile responsive", "Contact form", "Conversion-focused sections"],
  },
  {
    title: "Business System Build",
    price: "Custom quote",
    featured: true,
    description: "A multi-page business platform with operational features and dashboard options.",
    features: ["Multi-page website", "Booking, e-commerce, or CRM features", "Dashboard options", "Scalable content structure"],
  },
  {
    title: "Premium Digital Ecosystem",
    price: "Custom quote",
    description: "Website, app, dashboard, automation, and architecture for serious digital infrastructure.",
    features: ["Website + app + dashboard", "Automation workflows", "Full system architecture", "Support and scale planning"],
  },
];

const architecture = [
  "Client Website/App",
  "Frontend Interface",
  "API Layer",
  "Database",
  "Admin Dashboard",
  "Automations",
  "Analytics",
  "Growth System",
];

const demos = [
  {
    title: "Caribbean Booking Engine",
    category: "Reservations",
    metric: "Automated confirmations",
    description: "Excursion, airport transfer, and calendar logic in one operating layer.",
  },
  {
    title: "Retail Commerce OS",
    category: "E-Commerce",
    metric: "Catalogue to checkout",
    description: "Product browsing, inventory structure, payments, and customer capture.",
  },
  {
    title: "Executive CRM Dashboard",
    category: "Data Systems",
    metric: "Leads to reports",
    description: "Customer records, pipeline visibility, and decision-ready business reporting.",
  },
];

const systemStats = [
  { label: "Leads", value: "+42%", icon: BarChart3 },
  { label: "Automations", value: "18", icon: Bot },
  { label: "Systems", value: "7", icon: ServerCog },
  { label: "Security", value: "99.9", icon: ShieldCheck },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#050505] text-white">
      <section id="home" className="relative min-h-[92vh] px-6 pb-16 pt-28 sm:pt-32">
        <div className="digital-grid absolute inset-0 opacity-45" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#7B2FFF] to-transparent" />
        <div className="absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#7B2FFF]/18 blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#B3B3B3] shadow-[0_0_40px_rgba(123,47,255,0.18)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#00D26A] shadow-[0_0_18px_rgba(0,210,106,0.9)]" />
              From Jamaica to the World
            </div>
            <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Creative Technology & Digital Systems Built for Real Growth.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#B3B3B3] sm:text-xl">
              Websites, apps, CRMs, booking systems, e-commerce platforms, automations, and custom digital infrastructure for businesses in Jamaica, the Caribbean, and worldwide.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#contact" className="premium-button group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white">
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-6 py-4 text-sm font-bold text-white backdrop-blur hover:border-[#A855F7]/70 hover:bg-[#A855F7]/10">
                View Services
              </Link>
            </div>
            <div className="mt-8 flex flex-col gap-3 text-sm text-[#B3B3B3] sm:flex-row sm:items-center">
              <a href="https://wa.me/16582182282" className="inline-flex items-center gap-2 hover:text-white">
                <MessageCircle className="h-4 w-4 text-[#00D26A]" />
                WhatsApp: 658-218-2282
              </a>
              <a href="mailto:global.jsuprememarketing@gmail.com" className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-[#A855F7]" />
                global.jsuprememarketing@gmail.com
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="device-shell float-slow">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#B3B3B3]">Growth Command</p>
                  <p className="mt-1 text-lg font-bold">J Supreme Tech OS</p>
                </div>
                <div className="rounded-full border border-[#00D26A]/30 bg-[#00D26A]/10 px-3 py-1 text-xs font-bold text-[#00D26A]">Live</div>
              </div>
              <div className="grid gap-4 p-5">
                <div className="rounded-xl border border-white/10 bg-[#0D0D0D]/90 p-4">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">System Performance</span>
                    <LineChart className="h-5 w-5 text-[#A855F7]" />
                  </div>
                  <div className="flex h-28 items-end gap-2">
                    {[34, 58, 44, 72, 61, 84, 76, 96, 88].map((height) => (
                      <div key={height} className="flex-1 rounded-t-md bg-linear-to-t from-[#7B2FFF] to-[#6D5BFF]" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {systemStats.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <Icon className="h-5 w-5 text-[#A855F7]" />
                      <p className="mt-5 text-2xl font-black">{value}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#B3B3B3]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-6 hidden rounded-[2rem] border border-white/10 bg-[#0D0D0D]/85 p-3 shadow-[0_0_70px_rgba(109,91,255,0.28)] backdrop-blur md:block">
              <div className="h-44 w-24 rounded-[1.55rem] border border-white/10 bg-[#050505] p-2">
                <div className="h-full rounded-[1.1rem] bg-linear-to-b from-[#7B2FFF]/40 via-[#0D0D0D] to-[#050505] p-3">
                  <MonitorSmartphone className="h-5 w-5 text-white" />
                  <div className="mt-12 h-2 rounded-full bg-white/70" />
                  <div className="mt-3 h-2 w-2/3 rounded-full bg-[#A855F7]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-shell">
        <SectionHeader
          eyebrow="Creative Technology & Digital Systems"
          title="A complete digital stack for modern business."
          text="J Supreme Tech is not simply a website agency. It builds scalable business ecosystems, automation, digital infrastructure, and software architecture."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section id="architecture" className="section-shell border-y border-white/10 bg-[#0D0D0D]">
        <SectionHeader
          eyebrow="Systems Architecture"
          title="Structured systems from first click to growth intelligence."
          text="Every build is planned as a connected ecosystem, not a collection of disconnected pages."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-8">
          {architecture.map((item, index) => (
            <div key={item} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B2FFF]/15 text-sm font-black text-[#A855F7] ring-1 ring-[#A855F7]/25">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="text-sm font-bold leading-6">{item}</p>
              {index < architecture.length - 1 ? (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-linear-to-r from-[#7B2FFF] to-[#6D5BFF] lg:block" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            align="left"
            eyebrow="Work / Demos"
            title="Dashboard-style demos for real business workflows."
            text="Placeholder case studies show how the brand can present systems, apps, dashboards, and operational tools across industries."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {demos.map((demo) => (
              <article key={demo.title} className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur hover:border-[#A855F7]/50 hover:shadow-[0_0_55px_rgba(123,47,255,0.18)]">
                <div className="mb-8 h-36 rounded-xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(123,47,255,0.5),transparent_35%),linear-gradient(135deg,rgba(109,91,255,0.22),rgba(5,5,5,0.95))] p-4">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="h-3 rounded-full bg-white/70" />
                    <span className="h-3 rounded-full bg-[#A855F7]" />
                    <span className="h-3 rounded-full bg-white/20" />
                  </div>
                  <div className="mt-8 space-y-2">
                    <span className="block h-2 rounded-full bg-white/50" />
                    <span className="block h-2 w-2/3 rounded-full bg-[#6D5BFF]" />
                  </div>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A855F7]">{demo.category}</p>
                <h3 className="mt-3 text-xl font-black">{demo.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#B3B3B3]">{demo.description}</p>
                <p className="mt-6 text-sm font-bold text-white">{demo.metric}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section-shell border-y border-white/10 bg-[#0D0D0D]">
        <SectionHeader
          eyebrow="Process"
          title="Discover. Design. Architect. Build. Test. Launch. Scale."
          text="A structured delivery path keeps every project clear, measurable, and ready for the next layer of growth."
        />
        <ProcessTimeline />
      </section>

      <section id="pricing" className="section-shell">
        <SectionHeader
          eyebrow="Pricing"
          title="Packages for presence, systems, and ecosystems."
          text="Start lean or build a complete technology layer. Pricing depends on scope, integrations, and operational depth."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricing.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
      </section>

      <section id="about" className="section-shell border-y border-white/10 bg-[#0D0D0D]">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="eyebrow">About J Supreme Tech</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Architect-level thinking for Caribbean-to-global businesses.</h2>
            <p className="mt-6 text-lg leading-8 text-[#B3B3B3]">
              J Supreme Tech builds websites, apps, business systems, digital infrastructure, and scalable technology ecosystems for brands that need more than a basic online presence.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Digital Solutions. Real Growth.", "We Build Today. You Lead Tomorrow.", "Systems That Work. Growth That Lasts.", "From Jamaica to the World."].map((tagline) => (
              <div key={tagline} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <Check className="h-5 w-5 text-[#00D26A]" />
                <p className="mt-6 text-lg font-black">{tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Start building the system your business needs next.</h2>
            <div className="mt-8 space-y-4 text-[#B3B3B3]">
              <a href="https://wa.me/16582182282" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:border-[#00D26A]/50">
                <MessageCircle className="h-5 w-5 text-[#00D26A]" />
                WhatsApp: 658-218-2282
              </a>
              <a href="mailto:global.jsuprememarketing@gmail.com" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:border-[#A855F7]/50">
                <Mail className="h-5 w-5 text-[#A855F7]" />
                global.jsuprememarketing@gmail.com
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <Globe2 className="h-5 w-5 text-[#6D5BFF]" />
                Jamaica, Caribbean, Worldwide
              </div>
            </div>
          </div>
          <ProjectIntakeForm />
        </div>
      </section>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-[#B3B3B3]">{text}</p>
    </div>
  );
}
