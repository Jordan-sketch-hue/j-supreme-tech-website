import { NextResponse } from "next/server";
import { getWire } from "@/lib/blog";

// Public JSON feed of The Wire — consumed by the J Supreme Conglomerate app
// (and anything else that wants the curated feed). Rebuilt on each deploy;
// the daily task redeploys, so this stays current. CORS-open + short cache.

const SITE = "https://jsupremetech.online";

// Categories that have a licensed monochrome cover at /public/wire/<category>.jpg.
const COVER_CATEGORIES = new Set([
  "ai", "science", "tech", "graphics", "markets", "world", "education", "ideas",
]);

const LABELS: Record<string, string> = {
  ai: "AI", science: "Science", tech: "Tech", graphics: "Graphics",
  markets: "Markets", world: "World", education: "Education", ideas: "Ideas",
  marketing: "Marketing", trading: "Trading",
};

export const revalidate = 600;

export function GET() {
  const items = getWire().map((w) => ({
    ...w,
    label: LABELS[w.category] ?? "Signal",
    cover: COVER_CATEGORIES.has(w.category) ? `${SITE}/wire/${w.category}.jpg` : null,
  }));

  return NextResponse.json(
    { updated: items[0]?.date ?? null, count: items.length, items },
    {
      headers: {
        "access-control-allow-origin": "*",
        "cache-control": "public, s-maxage=600, stale-while-revalidate=86400",
      },
    },
  );
}
