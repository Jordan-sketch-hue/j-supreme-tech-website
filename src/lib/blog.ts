import "server-only";
import fs from "node:fs";
import path from "node:path";
import {
  type Article,
  type Block,
  type BlogCategory,
  type WireItem,
  CATEGORY_ORDER,
  estimateReadMinutes,
} from "./blog-taxonomy";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");
const WIRE_FILE = path.join(process.cwd(), "src", "content", "wire.json");

const VALID_CATEGORIES = new Set<string>(CATEGORY_ORDER);

/** Defensive guard — content is authored as JSON; never let one bad file
 *  break the whole index. Invalid files are skipped (logged in dev). */
function isArticle(x: unknown): x is Article {
  if (!x || typeof x !== "object") return false;
  const a = x as Record<string, unknown>;
  return (
    typeof a.slug === "string" &&
    typeof a.title === "string" &&
    typeof a.category === "string" &&
    VALID_CATEGORIES.has(a.category) &&
    typeof a.date === "string" &&
    Array.isArray(a.blocks) &&
    Array.isArray(a.tags) &&
    Array.isArray(a.keywords)
  );
}

let _cache: Article[] | null = null;

function loadAll(): Article[] {
  // Cache only in production builds — dev reads fresh so new content appears on reload.
  if (_cache && process.env.NODE_ENV === "production") return _cache;
  let files: string[] = [];
  try {
    files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
  } catch {
    _cache = [];
    return _cache;
  }

  const out: Article[] = [];
  const seen = new Set<string>();
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const parsed = JSON.parse(raw);
      if (!isArticle(parsed)) {
        if (process.env.NODE_ENV !== "production") console.warn(`[blog] skipped invalid article: ${file}`);
        continue;
      }
      if (seen.has(parsed.slug)) continue;
      seen.add(parsed.slug);
      // Normalise: ensure readMinutes + a motif fallback.
      if (!parsed.readMinutes || parsed.readMinutes < 1) {
        parsed.readMinutes = estimateReadMinutes(parsed.blocks as Block[]);
      }
      if (!parsed.motif) parsed.motif = "grid";
      out.push(parsed);
    } catch {
      if (process.env.NODE_ENV !== "production") console.warn(`[blog] failed to parse: ${file}`);
    }
  }

  out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  _cache = out;
  return out;
}

export function getAllArticles(): Article[] {
  return loadAll();
}

export function getArticle(slug: string): Article | null {
  return loadAll().find((a) => a.slug === slug) ?? null;
}

export function getArticleSlugs(): string[] {
  return loadAll().map((a) => a.slug);
}

export function getByCategory(category: BlogCategory): Article[] {
  return loadAll().filter((a) => a.category === category);
}

export function getFeatured(): Article | null {
  const all = loadAll();
  return all.find((a) => a.featured) ?? all[0] ?? null;
}

export function getLatest(limit = 6, excludeSlug?: string): Article[] {
  return loadAll()
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
}

/** Related: explicit `related` slugs first, then same-category, then shared tags. */
export function getRelated(article: Article, limit = 3): Article[] {
  const all = loadAll().filter((a) => a.slug !== article.slug);
  const picked = new Map<string, Article>();

  for (const slug of article.related ?? []) {
    const found = all.find((a) => a.slug === slug);
    if (found) picked.set(found.slug, found);
  }
  for (const a of all) {
    if (picked.size >= limit) break;
    if (a.category === article.category) picked.set(a.slug, a);
  }
  for (const a of all) {
    if (picked.size >= limit) break;
    if (a.tags.some((t) => article.tags.includes(t))) picked.set(a.slug, a);
  }
  return Array.from(picked.values()).slice(0, limit);
}

export function categoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const a of loadAll()) counts[a.category] = (counts[a.category] ?? 0) + 1;
  return counts;
}

/** Affiliate deep-dive articles (tagged "affiliate") — powers the /stack hub. */
export function getAffiliateArticles(limit = 12): Article[] {
  return loadAll()
    .filter((a) => a.tags.includes("affiliate"))
    .slice(0, limit);
}

/** Curated external news ("the wire") — links + our own commentary only. */
export function getWire(): WireItem[] {
  try {
    const raw = fs.readFileSync(WIRE_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((w) => w && typeof w.title === "string" && typeof w.url === "string")
      .sort((a: WireItem, b: WireItem) => (a.date < b.date ? 1 : -1));
  } catch {
    return [];
  }
}
