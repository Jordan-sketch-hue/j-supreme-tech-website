/* ============================================================
   THE SIGNAL — J Supreme Tech editorial taxonomy & content model
   Client-safe (no fs, no server-only). Types + category registry
   + small pure helpers shared by loader, renderer and routes.
   ============================================================ */

export type BlogCategory =
  | "tech"
  | "marketing"
  | "trading"
  | "automation"
  | "studio"
  | "dispatch";

export type CoverMotif =
  | "grid"
  | "orbit"
  | "stack"
  | "wave"
  | "circuit"
  | "pulse"
  | "ledger"
  | "nodes"
  | "aperture"
  | "signal";

/** Inline strings support a tiny, safe markdown subset:
 *  **bold**  *italic*  `code`  [label](href) */
export type Block =
  | { type: "lead"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; variant?: "info" | "warn" | "insight"; title?: string; text: string }
  | { type: "code"; lang?: string; code: string }
  | { type: "figure"; motif: CoverMotif; caption?: string }
  | { type: "stat"; items: { value: string; label: string }[] }
  | { type: "divider" }
  | { type: "callforward"; text: string; cta?: { label: string; href: string } };

export type Article = {
  slug: string;
  category: BlogCategory;
  title: string;
  deck: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  readMinutes: number;
  kicker?: string;
  tags: string[];
  keywords: string[];
  featured?: boolean;
  motif: CoverMotif;
  blocks: Block[];
  faq?: { q: string; a: string }[];
  related?: string[];
};

export type WireItem = {
  title: string;
  source: string;
  url: string;
  summary: string; // our own one-line commentary, NOT republished text
  category: BlogCategory | "world";
  date: string;
};

export type CategoryMeta = {
  key: BlogCategory;
  label: string;
  short: string;
  tagline: string;
  blurb: string;
  motif: CoverMotif;
};

export const CATEGORIES: Record<BlogCategory, CategoryMeta> = {
  tech: {
    key: "tech",
    label: "Technology",
    short: "Tech",
    tagline: "Engineering, in the open.",
    blurb:
      "How the systems are actually built — architecture, the stack, the trade-offs and the post-mortems behind every platform we ship.",
    motif: "circuit",
  },
  marketing: {
    key: "marketing",
    label: "Marketing & Growth",
    short: "Marketing",
    tagline: "Attention, engineered.",
    blurb:
      "Positioning, funnels, SEO, creative systems and the growth machinery that turns a launch into a pipeline.",
    motif: "wave",
  },
  trading: {
    key: "trading",
    label: "Trading & Markets",
    short: "Trading",
    tagline: "Signal over noise.",
    blurb:
      "Market structure, data tooling, dashboards and the software side of trading — educational, never financial advice.",
    motif: "ledger",
  },
  automation: {
    key: "automation",
    label: "Automation & AI",
    short: "Automation",
    tagline: "Systems that run without you.",
    blurb:
      "Agents, pipelines, AI staff and the operating leverage that lets a small studio move like a large one.",
    motif: "nodes",
  },
  studio: {
    key: "studio",
    label: "Inside the Studio",
    short: "Studio",
    tagline: "How we work, why we work.",
    blurb:
      "The operating system of the studio — process, principles, the way decisions get made and what we are building toward.",
    motif: "aperture",
  },
  dispatch: {
    key: "dispatch",
    label: "Dispatches",
    short: "Dispatch",
    tagline: "What shipped, and how.",
    blurb:
      "Production logs from real builds — the problem, the fix, the launch. Newest first, straight from the bench.",
    motif: "pulse",
  },
};

export const CATEGORY_ORDER: BlogCategory[] = [
  "tech",
  "marketing",
  "trading",
  "automation",
  "studio",
  "dispatch",
];

export function categoryMeta(key: string): CategoryMeta | null {
  return (CATEGORIES as Record<string, CategoryMeta>)[key] ?? null;
}

export function formatDate(iso: string): string {
  // Parse as UTC-safe to avoid TZ drift on a yyyy-mm-dd string.
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

/** Estimate reading minutes from an article's blocks (fallback if not set). */
export function estimateReadMinutes(blocks: Block[]): number {
  let words = 0;
  for (const b of blocks) {
    if ("text" in b && typeof b.text === "string") words += b.text.split(/\s+/).length;
    if ("items" in b && Array.isArray(b.items)) {
      for (const it of b.items) words += String(it).split(/\s+/).length;
    }
    if (b.type === "code") words += b.code.split(/\s+/).length;
  }
  return Math.max(1, Math.round(words / 220));
}

/** Slugify a heading's text into a stable anchor id. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64);
}

/** Pull H2 headings out of an article for a table of contents. */
export function tableOfContents(blocks: Block[]): { id: string; text: string }[] {
  return blocks
    .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: headingId(b.text), text: b.text }));
}
