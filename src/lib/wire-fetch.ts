type WireCategory = "ai" | "science" | "tech" | "graphics" | "markets" | "world" | "education" | "ideas" | "marketing" | "trading";

type LiveWireItem = {
  title: string;
  source: string;
  url: string;
  summary: string;
  category: WireCategory;
  date: string;
};

interface HNItem {
  id: number;
  title: string;
  url?: string;
  by: string;
  time: number;
  score: number;
  type: string;
}

function inferCategory(title: string): WireCategory {
  const t = title.toLowerCase();
  if (/\bai\b|gpt|llm|claude|openai|anthropic|gemini|deepmind|neural|language model/.test(t)) return "ai";
  if (/market|stock|ipo|funding|revenue|valuation|finance|economy|inflation|crypto|bitcoin/.test(t)) return "markets";
  if (/science|research|study|physics|biology|chemistry|space|nasa|brain|genome/.test(t)) return "science";
  if (/design|graphics|render|3d|blender|figma|ui\/ux|animation/.test(t)) return "graphics";
  if (/education|school|university|learn|teach|coursera|course/.test(t)) return "education";
  if (/trade|trading|forex|futures|commodity/.test(t)) return "trading";
  if (/marketing|seo|social media|brand|ads|campaign/.test(t)) return "marketing";
  if (/world|politics|government|policy|law|regulation|eu|china|jamaica|caribbean/.test(t)) return "world";
  return "tech";
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "Hacker News";
  }
}

export async function fetchLiveWire(limit = 20): Promise<LiveWireItem[]> {
  try {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];

    const ids: number[] = await res.json();
    const top = ids.slice(0, 40);

    const items = await Promise.all(
      top.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
          next: { revalidate: 3600 },
        })
          .then((r) => r.json() as Promise<HNItem>)
          .catch(() => null)
      )
    );

    const date = new Date().toISOString().split("T")[0];

    return items
      .filter((item): item is HNItem => !!item && !!item.url && item.type === "story" && item.score > 30)
      .slice(0, limit)
      .map((item) => ({
        title: item.title,
        source: getDomain(item.url!),
        url: item.url!,
        summary: `${item.score} points on Hacker News · submitted by ${item.by}`,
        category: inferCategory(item.title),
        date,
      }));
  } catch {
    return [];
  }
}
