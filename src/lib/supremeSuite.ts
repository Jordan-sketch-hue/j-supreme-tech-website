/**
 * Supreme Suite — J Supreme Tech's REAL SaaS product line.
 * 13 white-label business systems, live at supreme-suite.vercel.app.
 * This file is the single source for the /products pages, the homepage band
 * and the /market cross-links. Slugs match the platform's system slugs, so
 * every CTA deep-links straight into the live product (sales page, instant
 * demo workspace, branded example site, or the real 3-day trial wizard).
 *
 * Official product names from JST Strategy 2026.
 */

export const SUITE_URL = "https://suite.jsupremetech.online";

export type SuiteCategory =
  | "Operations & Logistics"
  | "Booking & Appointments"
  | "Education"
  | "Growth & Retention"
  | "AI & Intelligence";

export interface SuiteSystem {
  slug: string; // matches the Supreme Suite platform slug
  name: string;
  shortName: string;
  category: SuiteCategory;
  accent: string;
  tagline: string;
  blurb: string;
  features: string[];
  fromUsd: number; // Starter monthly
  badge?: "Popular" | "New" | "Flagship";
}

export const SUITE_SYSTEMS: SuiteSystem[] = [
  // ── Operations & Logistics ────────────────────────────────────────────────
  {
    slug: "courier",
    name: "FleetRun",
    shortName: "FleetRun",
    category: "Operations & Logistics",
    accent: "#2563eb",
    tagline: "Driver dispatch, order tracking, client notifications, route management.",
    blurb:
      "A complete delivery back office: booking intake, dispatch pipeline, driver assignment, COD tracking and customer notifications — wrapped in your brand with a public booking site.",
    features: [
      "Dispatch pipeline from request to proof-of-delivery",
      "Public booking page wired into your inbox",
      "COD + invoice tracking with paid/overdue states",
      "AI assistant that quotes and books pickups 24/7",
    ],
    fromUsd: 49,
    badge: "Popular",
  },
  {
    slug: "movers",
    name: "HaulBase",
    shortName: "HaulBase",
    category: "Operations & Logistics",
    accent: "#d97706",
    tagline: "Job scheduling, crew management, storage unit tracking, client intake.",
    blurb:
      "Quotes, surveys, crew scheduling, storage units and packing-supply inventory for moving companies — plus a branded site that books jobs while your trucks roll.",
    features: [
      "Quote → survey → move-day pipeline",
      "Storage-unit and packing-inventory tracking",
      "Crew & truck scheduling calendar",
      "Estimates, invoices and deposits",
    ],
    fromUsd: 59,
    badge: "Popular",
  },
  {
    slug: "warehouse",
    name: "StockOps",
    shortName: "StockOps",
    category: "Operations & Logistics",
    accent: "#475569",
    tagline: "Real-time stock management, purchase orders, low-stock alerts.",
    blurb:
      "A lean WMS for 3PLs and wholesalers: orders through pick/pack/ship, SKU-level stock with reorder alerts, B2B customers and revenue reporting.",
    features: [
      "Received → picking → packing → shipped pipeline",
      "SKU inventory with low-stock alerts",
      "B2B customer accounts & POs",
      "Throughput and revenue reports",
    ],
    fromUsd: 79,
  },
  {
    slug: "property",
    name: "DwellDesk",
    shortName: "DwellDesk",
    category: "Operations & Logistics",
    accent: "#0d9488",
    tagline: "Tenant management, lease tracking, maintenance requests, rent collection.",
    blurb:
      "Tenants, leases, rent invoicing and a maintenance work-order pipeline — with a public site that takes applications, viewings and repair requests.",
    features: [
      "Maintenance work-order pipeline with priorities",
      "Tenant & owner directory",
      "Rent invoices with overdue tracking",
      "Applications and viewing requests from your site",
    ],
    fromUsd: 89,
  },
  {
    slug: "restaurant",
    name: "TableFlow",
    shortName: "TableFlow",
    category: "Operations & Logistics",
    accent: "#dc2626",
    tagline: "Table management, reservation booking, order tracking, waitlist.",
    blurb:
      "Orders, table reservations, kitchen stock and loyalty for restaurants — from placed to served to paid, with a site that takes bookings and event requests.",
    features: [
      "Order pipeline: placed → preparing → served",
      "Reservations & private-event requests",
      "Kitchen inventory with reorder alerts",
      "Built-in loyalty for regulars",
    ],
    fromUsd: 69,
    badge: "New",
  },
  // ── Booking & Appointments ────────────────────────────────────────────────
  {
    slug: "salon",
    name: "GlowDesk",
    shortName: "GlowDesk",
    category: "Booking & Appointments",
    accent: "#db2777",
    tagline: "Appointment scheduling, stylist management, client history, retail tracking.",
    blurb:
      "Built for nail techs, lash artists, barbers and stylists: deposit-first booking, client style history, loyalty punch cards and an AI receptionist that books while you work.",
    features: [
      "Deposit-first booking that kills no-shows",
      "Client cards with service & style history",
      "Punch-card loyalty built in",
      "AI receptionist answers and books 24/7",
    ],
    fromUsd: 35,
    badge: "Flagship",
  },
  {
    slug: "appointments",
    name: "SlotIQ",
    shortName: "SlotIQ",
    category: "Booking & Appointments",
    accent: "#7c3aed",
    tagline: "Multi-staff, multi-location, automated reminders, waitlist.",
    blurb:
      "For consultants, clinics, barbers — anyone who runs on appointments. Requests, confirmations, reminders and fees on one calendar, with a booking site included.",
    features: [
      "Requested → confirmed → completed pipeline",
      "Calendar with bookings & manual events",
      "Reminder and confirmation messages",
      "Per-appointment fees and invoicing",
    ],
    fromUsd: 39,
    badge: "Popular",
  },
  {
    slug: "tours",
    name: "TourBase",
    shortName: "TourBase",
    category: "Booking & Appointments",
    accent: "#059669",
    tagline: "Group booking, itinerary management, guide scheduling, payment collection.",
    blurb:
      "Tour operators and transfer services: inquiries, quotes, deposits and trip-day logistics — guests, pickups, guides — plus a site that sells your experiences.",
    features: [
      "Inquiry → quoted → deposit → confirmed pipeline",
      "Guest counts, hotels and pickup logistics",
      "Deposits, balances and invoices",
      "Branded experiences site with booking form",
    ],
    fromUsd: 49,
  },
  // ── Education ─────────────────────────────────────────────────────────────
  {
    slug: "school",
    name: "EnrollIQ",
    shortName: "EnrollIQ",
    category: "Education",
    accent: "#1d4ed8",
    tagline: "Student enrollment, class scheduling, fee collection, parent comms.",
    blurb:
      "Private academies and tutoring schools: enrollment pipeline, programs and schedules, guardians, tuition invoicing — and a site that takes applications.",
    features: [
      "Applied → assessed → enrolled pipeline",
      "Programs, levels and schedules",
      "Guardian contacts & messaging",
      "Tuition invoicing with overdue tracking",
    ],
    fromUsd: 59,
  },
  // ── Growth & Retention ────────────────────────────────────────────────────
  {
    slug: "loyalty",
    name: "PunchPro",
    shortName: "PunchPro",
    category: "Growth & Retention",
    accent: "#ea580c",
    tagline: "Digital punch cards, points tracking, tiered rewards, retention campaigns.",
    blurb:
      "Points, tiers and digital punch cards for any business — standalone, or bolted onto any other Supreme Suite system. Campaigns included.",
    features: [
      "Points engine with Bronze/Silver/Gold tiers",
      "Digital punch cards ('10 visits, 1 free')",
      "Campaigns: double points, birthdays, win-backs",
      "Works standalone or as an add-on",
    ],
    fromUsd: 29,
  },
  // ── AI & Intelligence ─────────────────────────────────────────────────────
  {
    slug: "dashboards",
    name: "SignalBoard",
    shortName: "SignalBoard",
    category: "AI & Intelligence",
    accent: "#0891b2",
    tagline: "Cross-platform performance, revenue, engagement, conversions unified.",
    blurb:
      "A BI workspace for operators: KPI dashboards from your data or any Supreme Suite system, published to your team — analyst-grade clarity without hiring an analyst.",
    features: [
      "KPI cards, trends, funnels and comparisons",
      "Feed it CSV exports from anything",
      "Native hookup to every Suite system",
      "Read-only boards for staff & partners",
    ],
    fromUsd: 45,
  },
  {
    slug: "chatbot",
    name: "DeskBot",
    shortName: "DeskBot",
    category: "AI & Intelligence",
    accent: "#8b5cf6",
    tagline: "No-code chatbot trained on business content, converts visitors to leads 24/7.",
    blurb:
      "Train a branded AI assistant on your prices, hours and services. It answers instantly on your website and captures bookings with a human touch — try it live in any demo.",
    features: [
      "Trained on YOUR prices, services and policies",
      "Slot-filling booking capture, straight to your CRM",
      "Smart hand-off to a human when needed",
      "Full transcripts and sentiment in your workspace",
    ],
    fromUsd: 39,
    badge: "New",
  },
  {
    slug: "voice",
    name: "RingPilot",
    shortName: "RingPilot",
    category: "AI & Intelligence",
    accent: "#16a34a",
    tagline: "Handles inbound calls, qualifies leads, books appointments autonomously.",
    blurb:
      "A voice receptionist that greets callers, answers questions out loud and captures bookings — every call logged and summarized. Try a live call in your browser right now.",
    features: [
      "Natural voice conversations — no install to demo",
      "Books appointments mid-call into your pipeline",
      "Every call logged with an AI summary",
      "Voicemail capture when a human is needed",
    ],
    fromUsd: 59,
    badge: "New",
  },
];

export const SUITE_CATEGORIES: SuiteCategory[] = [
  "Operations & Logistics",
  "Booking & Appointments",
  "Education",
  "Growth & Retention",
  "AI & Intelligence",
];

export function suiteSystem(slug: string): SuiteSystem | undefined {
  return SUITE_SYSTEMS.find((s) => s.slug === slug);
}

/** Deep links into the live platform. */
export const suiteLinks = {
  catalog: SUITE_URL,
  status: `${SUITE_URL}/status`,
  sales: (slug: string) => `${SUITE_URL}/systems/${slug}`,
  demo: (slug: string) => `${SUITE_URL}/app/demo-${slug}`,
  exampleSite: (slug: string) => `${SUITE_URL}/site/demo-${slug}`,
  trial: (slug?: string) => (slug ? `${SUITE_URL}/start?system=${slug}` : `${SUITE_URL}/start`),
};

/** Pricing ladder mirrors the platform (Starter base · Pro ≈2.2× · Scale ≈4×). */
export function suiteTiers(fromUsd: number) {
  return [
    { tier: "Starter", monthly: fromUsd, blurb: "Solo operators getting organized" },
    { tier: "Pro", monthly: Math.round(fromUsd * 2.2), blurb: "Teams — adds AI chatbot + voice agent + loyalty" },
    { tier: "Scale", monthly: Math.round(fromUsd * 4), blurb: "Multi-branch — custom domain + done-for-you migration" },
  ];
}

/** Legacy /products slugs (the old placeholder catalog) → nearest real system. */
export const LEGACY_PRODUCT_MAP: Record<string, string> = {
  appointmentpro: "appointments",
  crmsync: "appointments",
  autoflow: "dashboards",
  insighthub: "dashboards",
  datavault: "dashboards",
  investmentanalyzer: "dashboards",
  financeflow: "dashboards",
  aiassist: "chatbot",
  "chatgpt-enterprise": "chatbot",
  supporthub: "chatbot",
  marketingmax: "loyalty",
  "seo-optimizer": "loyalty",
};
