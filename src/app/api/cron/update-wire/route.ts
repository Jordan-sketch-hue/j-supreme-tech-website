import { NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const WIRE_PATH = resolve(process.cwd(), "src/content/wire.json");
const API_KEY = process.env.NEWSDATA_API_KEY;

const FEEDS = [
  {
    q: "artificial intelligence OR OpenAI OR Anthropic OR Claude OR LLM",
    category: "ai", max: 4,
    domains: "techcrunch.com,theverge.com,venturebeat.com,wired.com,arstechnica.com",
  },
  {
    q: "Apple OR Samsung OR cybersecurity OR startup OR software launch",
    category: "tech", max: 3,
    domains: "techcrunch.com,engadget.com,zdnet.com,arstechnica.com,theverge.com",
  },
  {
    q: "global economy OR trade war OR geopolitics OR inflation OR conflict",
    category: "world", max: 2,
    domains: "reuters.com,bbc.com,apnews.com,axios.com,economist.com",
  },
  {
    q: "stock market OR venture capital OR IPO OR fintech OR earnings",
    category: "business", max: 2,
    domains: "fortune.com,cnbc.com,reuters.com,ft.com,axios.com",
  },
  {
    q: "science discovery OR space OR climate OR health OR breakthrough",
    category: "science", max: 1,
    domains: "bbc.com,reuters.com,apnews.com,arstechnica.com,wired.com",
  },
] as const;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function fetchFeed(q: string, max: number, domains: string) {
  const params = new URLSearchParams({
    apikey: API_KEY!,
    q,
    language: "en",
    domainurl: domains,
    size: String(Math.min(max + 6, 10)),
  });
  const res = await fetch(`https://newsdata.io/api/1/latest?${params}`);
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  if (data.status !== "success") throw new Error(JSON.stringify(data));
  return (data.results ?? []) as Record<string, string>[];
}

function mapArticle(a: Record<string, string>, category: string) {
  return {
    title: (a.title ?? "").replace(/ [-–|] [^-–|]+$/, "").trim(),
    source: a.source_id ?? a.source_name ?? "News",
    url: a.link,
    summary: (a.description ?? a.content ?? "").slice(0, 400).trim(),
    category,
    date: today(),
  };
}

export async function GET(request: Request) {
  // Vercel cron auth check
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "NEWSDATA_API_KEY not set" }, { status: 500 });
  }

  const seen = new Set<string>();
  const stories: ReturnType<typeof mapArticle>[] = [];

  for (const { q, category, max, domains } of FEEDS) {
    await sleep(1500);
    try {
      const results = await fetchFeed(q, max, domains);
      let added = 0;
      for (const a of results) {
        if (added >= max) break;
        if (!a.link || seen.has(a.link)) continue;
        if (!a.title || !a.description) continue;
        if ((a.description ?? "").length < 60) continue;
        seen.add(a.link);
        stories.push(mapArticle(a, category));
        added++;
      }
    } catch (err) {
      console.warn(`[cron/update-wire] ${category} failed:`, err);
    }
  }

  if (stories.length === 0) {
    return NextResponse.json({ error: "No stories fetched" }, { status: 500 });
  }

  await writeFile(WIRE_PATH, JSON.stringify(stories, null, 2) + "\n");

  return NextResponse.json({ ok: true, count: stories.length, date: today() });
}
