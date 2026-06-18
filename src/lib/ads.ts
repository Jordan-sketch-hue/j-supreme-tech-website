/*
  Monetization config — single source of truth for the site's ad + affiliate layer.

  Two revenue streams, coordinated and gated:
    1. Google AdSense (display)   — passive, fills automatically once approved.
    2. Affiliate partners         — curated "tools we use", contextual, higher EPC.

  BRAND POLICY (enforced by `adsAllowedOnPath`): ads/affiliate units appear ONLY on
  editorial / free-content surfaces. They are NEVER rendered on the sales funnel
  (products, pricing, market, checkout, free-trial), on authenticated app surfaces
  (account, dashboard, admin, trials), or on legal pages. This protects the premium
  B2B brand and the high-ticket conversion path — a $4 ad click is not worth a lost
  $4,000 lead.

  Everything degrades gracefully: with no NEXT_PUBLIC_ADSENSE_CLIENT set, the
  AdSlot renders a quiet placeholder in dev and nothing in prod, so the site is
  safe to ship before Google approval and the snippet can be flipped on by env var.
*/

/** AdSense publisher id, e.g. "ca-pub-1234567890123456". Set in Vercel env once approved. */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

/** Whether the AdSense script + units should be active at all. */
export const ADS_ENABLED = ADSENSE_CLIENT.startsWith("ca-pub-");

/**
 * Ad unit slot ids created in the AdSense dashboard (post-approval).
 * Until a slot exists, Auto-format responsive units simply collapse — safe to leave blank.
 */
export const AD_SLOTS = {
  inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE ?? "",
  articleFoot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLEFOOT ?? "",
  feed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FEED ?? "",
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;

/**
 * Path-level placement policy. Returns true only for editorial / free surfaces.
 * Keep this conservative: when in doubt, do NOT monetize the page.
 */
export function adsAllowedOnPath(pathname: string): boolean {
  if (!pathname) return false;
  const p = pathname.toLowerCase();

  // Hard deny-list — sales funnel, app, legal, auth. Never monetize these.
  const DENY = [
    "/products", "/pricing", "/market", "/services", "/free-trial", "/start",
    "/contact", "/checkout", "/pay", "/account", "/dashboard", "/admin",
    "/trials", "/login", "/signup", "/forgot-password",
    "/privacy", "/terms", "/disclaimer", "/disclosure",
  ];
  if (DENY.some((d) => p === d || p.startsWith(d + "/"))) return false;

  // Allow-list — editorial / free content only.
  const ALLOW = ["/blog", "/library", "/newsletter"];
  return ALLOW.some((a) => p === a || p.startsWith(a + "/"));
}

/**
 * FTC + AdSense disclosure copy reused across the ad/affiliate UI and the
 * /disclosure page so the language stays consistent everywhere.
 */
export const DISCLOSURE = {
  ads: "Some pages on this site display ads served by Google. Google may use cookies to show ads based on your prior visits; you can manage this in your Google Ad Settings.",
  affiliate:
    "Some links on this site are affiliate links. If you click through and sign up or buy, J Supreme Tech may earn a commission at no extra cost to you. We only recommend tools we actually use to build and run our own systems.",
} as const;
