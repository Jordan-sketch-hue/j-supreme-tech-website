import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { CoverMotif } from "./blog-taxonomy";

export type EbookSection = { heading: string; paragraphs: string[]; bullets?: string[] };
export type EbookChapter = { title: string; intro?: string; sections: EbookSection[] };
export type Ebook = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  audience?: string;
  summary: string;
  coverMotif: CoverMotif;
  pages?: number;
  chapters: EbookChapter[];
  takeaways?: string[];
  price: number; // USD
  currency: string; // "USD"
  series?: string; // e.g. "Modern Technology & Its Applications"
  volume?: number; // volume number within a series
};

const DIR = path.join(process.cwd(), "src", "content", "ebooks");

// Paid e-books — priced in USD, fulfilled by bank transfer for now.
// Floor is $29.99; tiered up for the flagship titles.
const EBOOK_PRICES: Record<string, number> = {
  "the-automation-playbook": 29.99,
  "the-growth-stack": 49.99,
  "ship-like-a-studio": 79.99,
  // Modern Technology & Its Applications — the volumed series (entry-priced to collect).
  "mta-vol-1-stack-to-outcome": 29.99,
  "mta-vol-2-tech-moves-markets": 29.99,
  "mta-vol-3-compound-operator": 29.99,
  // Marketing
  "the-influence-engine": 49.99,
  "merging-skills-full-stack-marketer": 39.99,
};
const DEFAULT_PRICE = 29.99;

export function ebookPrice(slug: string): number {
  return EBOOK_PRICES[slug] ?? DEFAULT_PRICE;
}

export function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 2 }).format(amount);
}

function isEbook(x: unknown): x is Ebook {
  if (!x || typeof x !== "object") return false;
  const e = x as Record<string, unknown>;
  return typeof e.slug === "string" && typeof e.title === "string" && Array.isArray(e.chapters);
}

let _cache: Ebook[] | null = null;

export function getEbooks(): Ebook[] {
  if (_cache && process.env.NODE_ENV === "production") return _cache;
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
  } catch {
    _cache = [];
    return _cache;
  }
  const out: Ebook[] = [];
  for (const f of files) {
    try {
      const e = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      if (isEbook(e)) {
        e.price = ebookPrice(e.slug);
        e.currency = "USD";
        out.push(e);
      }
    } catch {
      /* skip malformed */
    }
  }
  // Stable order by title.
  out.sort((a, b) => a.title.localeCompare(b.title));
  _cache = out;
  return out;
}

export function getEbook(slug: string): Ebook | null {
  return getEbooks().find((e) => e.slug === slug) ?? null;
}

export function getEbookSlugs(): string[] {
  return getEbooks().map((e) => e.slug);
}

export type EbookSeries = { name: string; volumes: Ebook[] };

/** The Library, sectioned: ongoing volumed series first, then standalone titles. */
export function getLibrary(): { series: EbookSeries[]; standalone: Ebook[] } {
  const all = getEbooks();
  const seriesMap = new Map<string, Ebook[]>();
  const standalone: Ebook[] = [];
  for (const e of all) {
    if (e.series) {
      const list = seriesMap.get(e.series) ?? [];
      list.push(e);
      seriesMap.set(e.series, list);
    } else {
      standalone.push(e);
    }
  }
  const series: EbookSeries[] = Array.from(seriesMap.entries()).map(([name, volumes]) => ({
    name,
    volumes: volumes.sort((a, b) => (a.volume ?? 0) - (b.volume ?? 0)),
  }));
  return { series, standalone };
}

/** Does a rendered PDF exist in /public/library for this slug? */
export function ebookPdfExists(slug: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "library", `${slug}.pdf`));
  } catch {
    return false;
  }
}
