/*
  Affiliate partner registry — the curated "tools we use" layer.

  Only partners with `live: true` AND a real `href` (no REPLACE_ME) render on the site.
  Everything ships disabled so we never publish a dead or untagged link. Workflow per partner:
    1. Apply to the program (see `program`) under jordanmorrisr@gmail.com.
    2. Paste your real tracked link into `href` (replace the REPLACE_ME marker).
    3. Flip `live: true`.

  `topics` maps each partner to the blog categories where it's contextually relevant, so the
  per-article "tools we use" block auto-selects the right partners for old AND future posts
  (see AffiliateTools). `commission`/`cookie`/`program` are reference, mirrored in
  docs/MONETIZATION_SOP.md. Curate ruthlessly: only tools JST genuinely uses to build/run
  client systems — credibility is the entire value of this channel.

  Terms verified June 2026 (subject to program changes — re-check at signup).
*/

import type { BlogCategory } from "@/lib/blog-taxonomy";

export type AffiliateCategory =
  | "hosting"
  | "infrastructure"
  | "design"
  | "productivity"
  | "ecommerce"
  | "crm"
  | "seo"
  | "marketing";

export type Affiliate = {
  id: string;
  name: string;
  /** One tight line — what JST uses it for. No marketing fluff. */
  tagline: string;
  category: AffiliateCategory;
  /** Blog categories where this partner is relevant (drives per-article selection). */
  topics: BlogCategory[];
  /** The tracked affiliate URL. Until set, contains REPLACE_ME and won't render. */
  href: string;
  /** Where to apply for the program (reference only). */
  program: string;
  /** Commission terms (reference only). */
  commission: string;
  /** Cookie window (reference only). */
  cookie: string;
  /** Render gate. Keep false until href is a real tracked link. */
  live: boolean;
};

export const AFFILIATES: Affiliate[] = [
  {
    id: "namecheap",
    name: "Namecheap",
    tagline: "Where we register and manage every client domain.",
    category: "infrastructure",
    // Domains/DNS/SSL underpin every build, so this partner is relevant across the
    // whole publication — it intentionally surfaces on every article's "stack" block.
    topics: ["tech", "marketing", "trading", "automation", "studio", "dispatch"],
    href: "https://namecheap.pxf.io/c/7420688/1632743/5618",
    program: "https://www.namecheap.com/affiliates/",
    commission: "25–38% tiered (domains, hosting, SSL); $100 min payout, PayPal/Payoneer",
    cookie: "120 days",
    live: true,
  },
  {
    id: "hostinger",
    name: "Hostinger",
    tagline: "Fast, low-cost hosting we point smaller clients to.",
    category: "hosting",
    topics: ["tech", "marketing", "dispatch"],
    href: "https://www.hostinger.com/?REPLACE_ME_ref",
    program: "https://www.hostinger.com/affiliates",
    commission: "40–60% per sale (~$100+ avg); PayPal > $100",
    cookie: "30 days",
    live: false,
  },
  {
    id: "cloudways",
    name: "Cloudways",
    tagline: "Managed cloud hosting for heavier WordPress builds.",
    category: "hosting",
    topics: ["tech"],
    href: "https://www.cloudways.com/en/?id=REPLACE_ME",
    program: "https://www.cloudways.com/en/affiliate-program.php",
    commission: "Up to $125/sale or hybrid recurring",
    cookie: "90 days",
    live: false,
  },
  {
    id: "vercel",
    name: "Vercel",
    tagline: "Our default deployment platform for Next.js apps.",
    category: "infrastructure",
    topics: ["tech", "studio"],
    href: "https://vercel.com/?REPLACE_ME",
    program: "https://vercel.com/partners (Solution / referral partner)",
    commission: "Partner program (referral / revenue share)",
    cookie: "—",
    live: false,
  },
  {
    id: "webflow",
    name: "Webflow",
    tagline: "Visual site builds when full custom code isn't needed.",
    category: "design",
    topics: ["tech", "marketing"],
    href: "https://webflow.com/?REPLACE_ME",
    program: "https://webflow.com/partners/affiliates",
    commission: "50% of first-year subscription (up to 12 months)",
    cookie: "90 days",
    live: false,
  },
  {
    id: "framer",
    name: "Framer",
    tagline: "Rapid marketing sites and prototypes.",
    category: "design",
    topics: ["tech", "marketing"],
    href: "https://www.framer.com/?via=REPLACE_ME",
    program: "https://www.framer.com/partners/",
    commission: "~50% first-year recurring",
    cookie: "—",
    live: false,
  },
  {
    id: "shopify",
    name: "Shopify",
    tagline: "The commerce backbone we build storefronts on.",
    category: "ecommerce",
    topics: ["dispatch", "studio"],
    href: "https://www.shopify.com/?ref=REPLACE_ME",
    program: "https://www.shopify.com/affiliates",
    commission: "Fixed bounty per qualifying merchant referral",
    cookie: "30 days",
    live: false,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    tagline: "CRM + marketing automation we wire into client ops.",
    category: "crm",
    topics: ["marketing", "automation", "studio"],
    href: "https://www.hubspot.com/?REPLACE_ME",
    program: "https://www.hubspot.com/partners/affiliates",
    commission: "30% recurring (up to 1 year) — tiered bonuses",
    cookie: "180 days",
    live: false,
  },
  {
    id: "notion",
    name: "Notion",
    tagline: "How we run docs, SOPs and client wikis.",
    category: "productivity",
    topics: ["studio", "automation", "trading"],
    href: "https://affiliate.notion.so/REPLACE_ME",
    program: "https://www.notion.so/affiliates",
    commission: "Up to 50% for 12 months",
    cookie: "90 days",
    live: false,
  },
  {
    id: "kit",
    name: "Kit (ConvertKit)",
    tagline: "The email engine behind newsletters we set up.",
    category: "marketing",
    topics: ["automation", "marketing"],
    href: "https://kit.com/?ref=REPLACE_ME",
    program: "https://kit.com/affiliate",
    commission: "30% recurring",
    cookie: "—",
    live: false,
  },
  {
    id: "semrush",
    name: "Semrush",
    tagline: "The SEO + content toolkit behind our growth work.",
    category: "seo",
    topics: ["marketing"],
    href: "https://www.semrush.com/?REPLACE_ME",
    program: "https://www.semrush.com/lp/affiliate-program/ (Impact)",
    commission: "$200 per sale + $10 per trial (Impact)",
    cookie: "120 days",
    live: false,
  },
];

/** Partners that are safe to display: live + real (un-replaced) link. */
export function liveAffiliates(): Affiliate[] {
  return AFFILIATES.filter((a) => a.live && !a.href.includes("REPLACE_ME"));
}

/**
 * Live partners relevant to a blog category, best-effort. Falls back to a sensible
 * general set so an article in an off-topic category still shows our core tools.
 * `limit` caps how many cards render (keeps the block tight).
 */
export function affiliatesForTopic(category?: BlogCategory, limit = 4): Affiliate[] {
  const live = liveAffiliates();
  if (!live.length) return [];
  const relevant = category ? live.filter((a) => a.topics.includes(category)) : [];
  const pool = relevant.length ? relevant : live;
  return pool.slice(0, limit);
}

/** Look up one partner by id (for inline AffiliateLink usage in articles). */
export function affiliate(id: string): Affiliate | undefined {
  return AFFILIATES.find((a) => a.id === id);
}
