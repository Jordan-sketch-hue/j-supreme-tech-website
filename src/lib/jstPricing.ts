/**
 * jstPricing.ts — J Supreme Tech's OWN launch pricing for the 13 SaaS systems.
 *
 * TIERED (no free plan; 3-day free trial). Two models the buyer can toggle on
 * /market:
 *   • "monthly"  — pure monthly, white-glove setup included.
 *   • "hybrid"   — a one-time setup fee, then a lower monthly (derived from the
 *                  monthly-only number so the two sets stay in lock-step).
 *
 * Source numbers below are the MONTHLY-ONLY price per tier (JMD). The hybrid set
 * is derived: setup ≈ 3 months up front, monthly drops ~40%. Tune any `monthly`
 * here and BOTH models update everywhere. Positioned from the competitor research
 * in marketAnalysis.ts (US$1 ≈ J$157).
 *
 * NOTE: these are the market-page launch figures. The SaaS product/checkout build
 * (separate agent + the in-app CRM/chatbot) may refine the in-product numbers.
 */

export const TRIAL_DAYS = 3;
export const NO_FREE_PLAN = true;

export type PricingModel = "monthly" | "hybrid";

export type JstTier = {
  name: "Starter" | "Growth" | "Premium";
  /** Monthly-only price (JMD/mo), setup included. */
  monthly: number;
  blurb: string;
  popular?: boolean;
};

/** Hybrid (setup + lower monthly) derived from the monthly-only price. */
export function hybridFor(monthly: number): { setup: number; monthly: number } {
  return {
    setup: Math.round((monthly * 3) / 5000) * 5000, // ~3 months up front
    monthly: Math.round((monthly * 0.6) / 1000) * 1000, // ~40% lower ongoing
  };
}

export function fmtJMD(n: number): string {
  return `J$${n.toLocaleString("en-JM")}`;
}

const TIER_BLURB = {
  Starter: "Entry — core modules, one location.",
  Growth: "Most chosen — the full toolkit as you scale.",
  Premium: "Unlimited — every module, priority support.",
} as const;

const t = (name: JstTier["name"], monthly: number, popular?: boolean): JstTier => ({
  name,
  monthly,
  blurb: TIER_BLURB[name],
  popular,
});

/** Monthly-only JMD price per tier, keyed by the marketAnalysis slug. */
export const JST_PRICING: Record<string, JstTier[]> = {
  "courier-delivery": [t("Starter", 15000), t("Growth", 30000, true), t("Premium", 55000)],
  "movers-storage": [t("Starter", 15000), t("Growth", 28000, true), t("Premium", 48000)],
  "warehouse-inventory": [t("Starter", 18000), t("Growth", 35000, true), t("Premium", 60000)],
  "property-management": [t("Starter", 12000), t("Growth", 24000, true), t("Premium", 45000)],
  "restaurant-hospitality": [t("Starter", 18000), t("Growth", 35000, true), t("Premium", 65000)],
  "beauty-salon": [t("Starter", 8000), t("Growth", 16000, true), t("Premium", 28000)],
  "appointment-setter": [t("Starter", 6000), t("Growth", 12000, true), t("Premium", 22000)],
  "tours-experiences": [t("Starter", 15000), t("Growth", 30000, true), t("Premium", 52000)],
  "school-academy": [t("Starter", 18000), t("Growth", 35000, true), t("Premium", 60000)],
  "loyalty-rewards": [t("Starter", 8000), t("Growth", 15000, true), t("Premium", 26000)],
  "analytics-dashboards": [t("Starter", 12000), t("Growth", 24000, true), t("Premium", 45000)],
  "ai-chatbot": [t("Starter", 10000), t("Growth", 20000, true), t("Premium", 38000)],
  "ai-voice-agent": [t("Starter", 15000), t("Growth", 30000, true), t("Premium", 55000)],
};

/** "from J$X/mo" entry badge for a system (lowest tier, current model). */
export function fromLabel(slug: string, model: PricingModel): string | undefined {
  const tiers = JST_PRICING[slug];
  if (!tiers || tiers.length === 0) return undefined;
  const lowest = tiers.reduce((a, b) => (a.monthly <= b.monthly ? a : b));
  const mo = model === "hybrid" ? hybridFor(lowest.monthly).monthly : lowest.monthly;
  return `from ${fmtJMD(mo)}/mo`;
}
