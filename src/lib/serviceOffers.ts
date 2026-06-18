/**
 * serviceOffers.ts — the SINGLE SOURCE OF TRUTH for service pricing + checkout.
 *
 * Every service (see SERVICES in portfolio.ts) maps to a slug here with payable
 * packages in JMD. The WiPay checkout route looks the amount up here SERVER-SIDE
 * (never trusts the client), so editing a number here is all it takes to change
 * what a customer is charged.
 *
 *  ▸ REAL prices (given by Jordan): website tiers, app bundles, the Social Media
 *    Marketing tiers (from the J Supreme Marketing "SMM Packages" flyer), and
 *    Brand & Design entry.
 *  ▸ STARTING prices (sensible JMD anchors — tune freely): the bespoke systems
 *    (Commerce, Business-Operating/CRM, Booking, Creative-Tech). Their top tier
 *    is a "deposit to start", with the balance scoped after the intake form.
 *
 * To change a price: edit `amount` (JMD) and redeploy. That's it.
 */

export type Period = "once" | "month";

export type Package = {
  id: string;
  name: string;
  /** Amount charged via WiPay, in JMD. Always payable. */
  amount: number;
  period: Period;
  popular?: boolean;
  features: string[];
  /** Optional small line under the price (e.g. "deposit to start"). */
  priceNote?: string;
};

export type ServiceOffer = {
  slug: string;
  /** Headline shown in the checkout modal. */
  tagline: string;
  packages: Package[];
};

export const SERVICE_OFFERS: Record<string, ServiceOffer> = {
  "digital-presence": {
    slug: "digital-presence",
    tagline: "Conversion-built websites, landing pages & portfolios — pick a package and we start the same day.",
    packages: [
      { id: "launch", name: "Launch", amount: 55000, period: "once",
        features: ["Up to 5 pages", "Mobile-first design", "Contact + WhatsApp button", "Google-ready SEO basics", "7-day delivery"] },
      { id: "business", name: "Business", amount: 110000, period: "once", popular: true,
        features: ["Up to 12 pages", "Blog / easy-edit CMS", "On-page SEO + Google Maps", "Analytics + live chat", "~2-week delivery"] },
      { id: "enterprise", name: "Enterprise", amount: 160000, period: "once",
        features: ["Unlimited custom pages", "Bookings / store / payments", "Admin dashboard + client portal", "12-month support + free domain"] },
    ],
  },
  "commerce-application": {
    slug: "commerce-application",
    tagline: "Online stores & web apps with catalogues, carts, checkout, inventory and payments.",
    packages: [
      { id: "starter-store", name: "Starter Store", amount: 130000, period: "once",
        features: ["Catalogue + cart + checkout", "Up to 30 products", "Card payments wired", "Order notifications"] },
      { id: "growth-store", name: "Growth Store", amount: 240000, period: "once", popular: true,
        features: ["Unlimited products", "Inventory + customer accounts", "Discounts & promotions", "Admin order dashboard"] },
      { id: "custom-platform", name: "Custom Platform", amount: 75000, period: "once",
        priceNote: "deposit to start · projects from J$400,000",
        features: ["Bespoke web app", "Custom flows & integrations", "Scoped after your intake", "Balance billed in milestones"] },
    ],
  },
  "business-operating": {
    slug: "business-operating",
    tagline: "CRMs, dashboards, admin backoffices and internal tools that run the whole operation.",
    packages: [
      { id: "core-crm", name: "Core CRM", amount: 180000, period: "once",
        features: ["Contacts + sales pipeline", "Dashboard + reporting", "Roles & permissions", "Data export"] },
      { id: "operations-suite", name: "Operations Suite", amount: 320000, period: "once", popular: true,
        features: ["CRM + invoicing + projects", "Multi-user roles", "Automations + alerts", "Custom modules"] },
      { id: "enterprise-os", name: "Enterprise", amount: 90000, period: "once",
        priceNote: "deposit to start · projects from J$500,000",
        features: ["Full operating system", "Deep integrations", "Scoped after your intake", "Milestone billing"] },
    ],
  },
  "booking-reservation": {
    slug: "booking-reservation",
    tagline: "Appointment, excursion and transfer scheduling with automated confirmations.",
    packages: [
      { id: "booking-site", name: "Booking Site", amount: 90000, period: "once",
        features: ["Online appointments", "Automated confirmations", "Calendar + reminders", "Mobile-first"] },
      { id: "booking-platform", name: "Booking Platform", amount: 180000, period: "once", popular: true,
        features: ["Multi-service / multi-staff", "Payments + deposits", "Customer accounts", "Admin dashboard"] },
      { id: "booking-custom", name: "Custom", amount: 50000, period: "once",
        priceNote: "deposit to start · projects from J$300,000",
        features: ["Bespoke booking engine", "Integrations (maps, SMS, pay)", "Scoped after your intake", "Milestone billing"] },
    ],
  },
  "mobile-app": {
    slug: "mobile-app",
    tagline: "iOS & Android apps — installable web apps or full native builds shipped to both stores.",
    packages: [
      { id: "web-app", name: "Web App (PWA)", amount: 90000, period: "once",
        features: ["Installs from a link — no store", "Works offline", "Push notifications", "Built-in admin panel"] },
      { id: "native-app", name: "Native App", amount: 160000, period: "once", popular: true,
        features: ["iOS App Store + Google Play", "Store submission handled", "Native device features", "Admin dashboard included"] },
      { id: "app-bundle", name: "Web + Native Bundle", amount: 240000, period: "once",
        features: ["Website + installable app", "App Store + Play Store", "One project, one price"] },
    ],
  },
  "creative-technology": {
    slug: "creative-technology",
    tagline: "Automation, software architecture, AI-assisted workflows and connected infrastructure.",
    packages: [
      { id: "automation-starter", name: "Automation Starter", amount: 120000, period: "once",
        features: ["Workflow automation", "App + API integrations", "Email / alert pipelines", "Docs + handover"] },
      { id: "ai-architecture", name: "AI / Architecture Build", amount: 280000, period: "once", popular: true,
        features: ["AI-assisted workflows", "Custom system architecture", "Connected infrastructure", "Scale plan"] },
      { id: "creative-enterprise", name: "Enterprise", amount: 90000, period: "once",
        priceNote: "deposit to start · projects from J$500,000",
        features: ["Large-scale systems", "Any complexity / integration", "Scoped after your intake", "Milestone billing"] },
    ],
  },
  "social-media-marketing": {
    slug: "social-media-marketing",
    tagline: "Done-for-you content, paid ads & audience growth — three tiers, one trusted team. Billed monthly.",
    packages: [
      { id: "smm-starter", name: "Starter", amount: 30000, period: "month",
        features: ["IG + Facebook, fully managed", "12+ feed posts · up to 7 stories/wk", "1+ pro Reel / month", "Paid ad set-up + monthly report"] },
      { id: "smm-plus", name: "Plus", amount: 55000, period: "month", popular: true,
        features: ["20+ posts · 4 Reels / month", "3rd platform + community mgmt", "2 ad campaigns / month", "Bi-weekly reports + strategy call"] },
      { id: "smm-elite", name: "Elite", amount: 80000, period: "month",
        features: ["30+ posts · 8 Reels · daily stories", "Up to 5 platforms", "Influencer & UGC coordination", "Full-funnel A/B + retargeting ads"] },
    ],
  },
  "branding-design": {
    slug: "branding-design",
    tagline: "Logos, brand kits, ad creative and presentation-grade design that makes you look the part.",
    packages: [
      { id: "logo-essentials", name: "Logo & Essentials", amount: 25000, period: "once",
        features: ["Primary logo + variations", "Colour + type starter", "Social profile kit", "Print-ready files"] },
      { id: "brand-kit", name: "Brand Kit", amount: 60000, period: "once", popular: true,
        features: ["Full identity system", "Colour, type & voice", "Social + ad templates", "Brand guidelines"] },
      { id: "brand-web", name: "Brand + Web Launch", amount: 110000, period: "once",
        features: ["Full brand kit", "A launch website", "Ad creative set", "You own every file"] },
    ],
  },

  // ── Supreme Suite SaaS subscriptions ──────────────────────────────────────
  // Monthly recurring. Payment provisions a live workspace instantly.
  // Prices in JMD; workspace URL: supreme-suite.vercel.app/app/{slug}
  "supreme-suite": {
    slug: "supreme-suite",
    tagline: "White-label business operating system — workspace live the moment you pay.",
    packages: [
      {
        id: "starter",
        name: "Starter",
        amount: 8500,
        period: "month",
        features: [
          "1 user · branded workspace + website",
          "Bookings inbox + CRM pipeline",
          "Invoicing + basic reports",
          "Email support",
        ],
        priceNote: "first month · renews monthly",
      },
      {
        id: "pro",
        name: "Pro",
        amount: 18700,
        period: "month",
        popular: true,
        features: [
          "5 users · everything in Starter",
          "AI chatbot + voice agent",
          "Loyalty programme + campaigns",
          "Priority WhatsApp support",
        ],
        priceNote: "first month · renews monthly",
      },
      {
        id: "scale",
        name: "Scale",
        amount: 34000,
        period: "month",
        features: [
          "Unlimited users · everything in Pro",
          "Custom domain",
          "Data migration done for you",
          "Quarterly strategy call",
        ],
        priceNote: "first month · renews monthly",
      },
    ],
  },
};

export function getOffer(slug: string): ServiceOffer | undefined {
  return SERVICE_OFFERS[slug];
}

export function getPackage(slug: string, packageId: string): Package | undefined {
  return SERVICE_OFFERS[slug]?.packages.find((p) => p.id === packageId);
}

/** "J$30,000" */
export function formatJMD(amount: number): string {
  return `J$${amount.toLocaleString("en-JM")}`;
}

/** "J$30,000/mo" or "J$55,000" */
export function priceLabel(p: { amount: number; period: Period }): string {
  return `${formatJMD(p.amount)}${p.period === "month" ? "/mo" : ""}`;
}

/** Lowest package amount for a service — for the "from J$X" badge on cards. */
export function fromPrice(slug: string): string | undefined {
  const offer = SERVICE_OFFERS[slug];
  if (!offer || offer.packages.length === 0) return undefined;
  const min = Math.min(...offer.packages.map((p) => p.amount));
  const pkg = offer.packages.find((p) => p.amount === min)!;
  return `from ${formatJMD(min)}${pkg.period === "month" ? "/mo" : ""}`;
}
