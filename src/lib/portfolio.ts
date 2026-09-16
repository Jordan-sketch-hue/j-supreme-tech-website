import {
  Boxes,
  CalendarClock,
  Cpu,
  LayoutDashboard,
  Megaphone,
  Smartphone,
  Sparkles,
  Store,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------
   Screenshots are SELF-CAPTURED into /public/showcase (webp) with
   popups/cookie banners dismissed — thum.io served stale captures
   with PWA install dialogs covering the product. To refresh, re-run
   the capture script (Temp\jst-shots\capture-portfolio.cjs) — file
   names derive from the host, so this mapping never changes.
------------------------------------------------------------------ */
const shotSlug = (host: string) => host.replace(/[^a-z0-9]+/gi, "-");

export function shotDesktop(host: string): string {
  return `/showcase/${shotSlug(host)}-d.webp`;
}
export function shotMobile(host: string): string {
  return `/showcase/${shotSlug(host)}-m.webp`;
}

/* ------------------------------- Projects ------------------------------- */
export const GROUPS = [
  "All",
  "Commerce & Retail",
  "Logistics & Mobility",
  "Business Systems",
  "Education",
  "Brand & Studio",
] as const;

export type Group = (typeof GROUPS)[number];
export type WorkType = "tech" | "marketing";

export type Project = {
  n: string;
  name: string;
  host: string;
  tag: string;
  group: Exclude<Group, "All">;
  blurb: string;
  mobile?: boolean;
  workType: WorkType;
};

export const PROJECTS: Project[] = [
  // Real client builds — live custom domains -------------------------
  {
    n: "01",
    name: "The Mover Guy",
    host: "themoverguy.online",
    tag: "Moving",
    group: "Logistics & Mobility",
    blurb: "Full moving platform — booking, pricing, and operations for Jamaica's top moving company.",
    workType: "tech",
  },
  {
    n: "02",
    name: "Solid Trust Courier",
    host: "solidtrustservices.com",
    tag: "Freight",
    group: "Logistics & Mobility",
    blurb: "End-to-end freight management — parcels, quotes, and warehouse portal.",
    workType: "tech",
  },
  {
    n: "03",
    name: "Ferguson Law",
    host: "fergusonlawja.com",
    tag: "Law Firm",
    group: "Business Systems",
    blurb: "Law firm platform — booking, admin CMS, chatbot, and online consultations.",
    workType: "tech",
  },
  {
    n: "04",
    name: "BP Couriers",
    host: "bpcouriers.online",
    tag: "Logistics",
    group: "Logistics & Mobility",
    blurb: "Same-day courier operating system — booking, dispatch, and tracking for Jamaica.",
    mobile: true,
    workType: "tech",
  },
  {
    n: "05",
    name: "Supreme OS",
    host: "jsupremeconglomerate.online",
    tag: "Custom CRM",
    group: "Business Systems",
    blurb: "All-in-one operator workspace — CRM, invoices, and projects under one roof.",
    workType: "tech",
  },
  {
    n: "06",
    name: "Language Cradle",
    host: "thelanguagecradle.com",
    tag: "Education",
    group: "Education",
    blurb: "Flagship language-learning institute with a CMS backoffice and role portal.",
    mobile: true,
    workType: "tech",
  },
  // Studio builds — showcasing platform depth ----------------------
  {
    n: "07",
    name: "RideLink Jamaica",
    host: "ridelink-jamaica.vercel.app",
    tag: "Ride-Hailing",
    group: "Logistics & Mobility",
    blurb: "Ride-hail and courier super app — rider, driver, and admin portals.",
    mobile: true,
    workType: "tech",
  },
  {
    n: "08",
    name: "Crown District JA",
    host: "crown-district-ja.vercel.app",
    tag: "Streetwear",
    group: "Commerce & Retail",
    blurb: "Premium streetwear storefront with lookbooks and an admin backoffice.",
    workType: "tech",
  },
  {
    n: "09",
    name: "Lingua Caribe",
    host: "lingua-caribe.vercel.app",
    tag: "B2B Edtech",
    group: "Education",
    blurb: "Corporate language-training OS for teams across the Caribbean.",
    workType: "tech",
  },
];

/* ------------------------------- Services ------------------------------- */
export type Service = {
  /** Maps to SERVICE_OFFERS in serviceOffers.ts for pricing + checkout. */
  slug: string;
  icon: LucideIcon;
  title: string;
  blurb: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "digital-presence",
    icon: Store,
    title: "Websites & Landing Pages",
    blurb:
      "Business websites, landing pages, and portfolios — built to convert, load fast, and rank on Google.",
    points: ["Business websites", "Landing pages", "Portfolios", "SEO-ready builds"],
  },
  {
    slug: "commerce-application",
    icon: Boxes,
    title: "Online Stores & Web Apps",
    blurb:
      "E-commerce stores and custom web applications with catalogues, cart, checkout, and payments built in.",
    points: ["Online storefronts", "Checkout & payments", "Inventory management", "Custom web apps"],
  },
  {
    slug: "business-operating",
    icon: LayoutDashboard,
    title: "CRMs & Business Dashboards",
    blurb:
      "Custom CRMs, admin panels, staff dashboards, and internal tools that run the whole operation.",
    points: ["CRMs", "Admin panels", "Staff dashboards", "Internal tools"],
  },
  {
    slug: "booking-reservation",
    icon: CalendarClock,
    title: "Booking & Scheduling Apps",
    blurb:
      "Online booking for appointments, excursions, and transfers — with automated confirmations and reminders.",
    points: ["Appointments", "Excursions & transfers", "Auto-confirmations", "Calendar sync"],
  },
  {
    slug: "mobile-app",
    icon: Smartphone,
    title: "Mobile Apps",
    blurb:
      "Native iOS and Android apps shipped to the App Store and Google Play — for customers or your own team.",
    points: ["iOS & Android", "App Store & Play", "Customer-facing apps", "Operations apps"],
  },
  {
    slug: "creative-technology",
    icon: Cpu,
    title: "Business Automation",
    blurb:
      "WhatsApp auto-responders, booking automation, CRM pipelines, invoice systems, social auto-posting, email sequences, client onboarding, and reporting dashboards — done for you, monthly.",
    points: ["WhatsApp auto-responders", "Booking & CRM automation", "Social auto-posting", "Email sequences & onboarding"],
  },
  {
    slug: "social-media-marketing",
    icon: Megaphone,
    title: "Social Media Marketing",
    blurb:
      "Done-for-you content, paid ads, and audience growth — managed monthly so your brand actually grows.",
    points: ["Content + strategy", "Reels & stories", "Paid ad campaigns", "Monthly reporting"],
  },
  {
    slug: "branding-design",
    icon: Sparkles,
    title: "Branding & Design",
    blurb:
      "Logos, brand kits, ad creative, and presentation-grade design that makes you look the part.",
    points: ["Brand identity", "Logos & kits", "Ad creative", "Print-ready files"],
  },
];

/* ------------------------------- Process ------------------------------- */
export const PROCESS: { step: string; title: string; blurb: string }[] = [
  { step: "01", title: "Discovery", blurb: "Free strategy call. Map goals, audience, and constraints." },
  { step: "02", title: "Research & Strategy", blurb: "Competitor audit, positioning, and success metrics." },
  { step: "03", title: "Brand & Design", blurb: "Logo, brand kit, UI/UX — the identity and the look, set first." },
  { step: "04", title: "System Architecture", blurb: "Data model, surfaces, integrations, and a scale plan." },
  { step: "05", title: "Development", blurb: "Production build — Next.js, Tailwind, Supabase, integrations." },
  { step: "06", title: "Testing & QA", blurb: "Cross-device QA, performance, accessibility, conversion." },
  { step: "07", title: "Launch & Deploy", blurb: "Vercel ship, domains, analytics, and monitoring." },
  { step: "08", title: "Marketing & Growth", blurb: "Social media, ad creative, and content — we drive traffic and scale on real data." },
];

/* --------------------- Marketing & Design — selected work --------------------- */
// Image samples shown in the Marketing & Design gallery (flyers, social creative,
// brand identity, a marketing-plan mockup). Files live in /public/marketing-samples.
export type MarketingSample = { src: string; title: string; tag: string; client: string };

// Selected CLIENT work first (real campaigns we ran for live brands), then a
// couple of our own pieces. Files live in /public/marketing-samples.
export const MARKETING_SAMPLES: MarketingSample[] = [
  // Feed posts
  { src: "/marketing-samples/bp-couriers-fast.png",       title: "BP Couriers — FAST.",             tag: "Feed",  client: "BP Couriers" },
  { src: "/marketing-samples/bp-couriers-reliable.png",   title: "BP Couriers — RELIABLE.",         tag: "Feed",  client: "BP Couriers" },
  { src: "/marketing-samples/bp-couriers-islandwide.png", title: "BP Couriers — ISLANDWIDE.",       tag: "Feed",  client: "BP Couriers" },
  { src: "/marketing-samples/ship2door-fresh-friday.png", title: "Ship 2 Door — Fresh Friday",      tag: "Feed",  client: "Ship 2 Door" },
  { src: "/marketing-samples/ship2door-fresh-start.png",  title: "Ship 2 Door — Fresh Start",       tag: "Feed",  client: "Ship 2 Door" },
  { src: "/marketing-samples/aboo-post-hero.png",         title: "Aboo Tours — Launch Post",        tag: "Feed",  client: "Aboo Tours" },
  { src: "/marketing-samples/aboo-post-tours.png",        title: "Aboo Tours — Tours",              tag: "Feed",  client: "Aboo Tours" },
  { src: "/marketing-samples/aboo-escape-post.png",       title: "Aboo Tours — Escape Campaign",   tag: "Feed",  client: "Aboo Tours" },
  { src: "/marketing-samples/876-wash-club.png",          title: "876 Car Wash — Wash Club",        tag: "Feed",  client: "876 Car Wash" },
  // Stories
  { src: "/marketing-samples/aboo-story-hero.png",        title: "Aboo Tours — Story",              tag: "Story", client: "Aboo Tours" },
  { src: "/marketing-samples/ship2door-story.png",        title: "Ship 2 Door — Story",             tag: "Story", client: "Ship 2 Door" },
  { src: "/marketing-samples/876-story-wash-club.png",    title: "876 Car Wash — Story",            tag: "Story", client: "876 Car Wash" },
];

/* ------------------------------- Stats ------------------------------- */
export const STATS: { value: string; label: string }[] = [
  { value: "100+", label: "Live platforms shipped" },
  { value: "100+", label: "Apps & systems built" },
  { value: "13", label: "Ready-made SaaS systems" },
  { value: "100+", label: "Clients served worldwide" },
];
