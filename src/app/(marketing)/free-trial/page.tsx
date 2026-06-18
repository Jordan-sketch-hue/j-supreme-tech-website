import { redirect } from "next/navigation";
import { LEGACY_PRODUCT_MAP, suiteLinks, suiteSystem } from "@/lib/supremeSuite";

/**
 * /free-trial now funnels into the REAL trial system — the Supreme Suite
 * onboarding wizard (3-day full-product trial, no card). The old in-page
 * simulated trial is retired; legacy ?product= slugs map to their nearest
 * real system so every old link still lands somewhere sensible.
 */
export default async function FreeTrialPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  const mapped = product ? (suiteSystem(product)?.slug ?? LEGACY_PRODUCT_MAP[product]) : undefined;
  redirect(suiteLinks.trial(mapped));
}
