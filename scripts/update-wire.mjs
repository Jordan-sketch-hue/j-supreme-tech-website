/**
 * Fetches curated top stories via NewsData.io and updates src/content/wire.json.
 * Run: node scripts/update-wire.mjs
 * Cron: trigger /api/cron/update-wire (set NEWSDATA_API_KEY in Vercel env)
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WIRE_PATH = resolve(__dirname, "../src/content/wire.json");
const API_KEY = process.env.NEWSDATA_API_KEY;

if (!API_KEY) {
  console.error("Missing NEWSDATA_API_KEY — add it to .env.local");
  process.exit(1);
}

// Each query targets a specific category with focused keywords
// domainurl: max 5 domains on free tier — pick category-appropriate sources
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
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function fetchFeed(q, max, domains) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    q,
    language: "en",
    domainurl: domains,
    size: String(Math.min(max + 6, 10)), // fetch extra to filter junk; API max = 10
  });
  const url = `https://newsdata.io/api/1/latest?${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const data = await res.json();
  if (data.status !== "success") throw new Error(JSON.stringify(data));
  return data.results ?? [];
}

function mapArticle(article, category) {
  const source = article.source_id ?? article.source_name ?? "News";
  const summary = (article.description ?? article.content ?? "").slice(0, 400).trim();
  return {
    title: (article.title ?? "").replace(/ [-–|] [^-–|]+$/, "").trim(),
    source,
    url: article.link,
    summary,
    category,
    date: today(),
  };
}

async function run() {
  const seen = new Set();
  const stories = [];

  for (const { q, category, max, domains } of FEEDS) {
    await sleep(1500); // NewsData.io free: ~1 req/sec
    try {
      const results = await fetchFeed(q, max, domains);
      let added = 0;
      for (const a of results) {
        if (added >= max) break;
        if (!a.link || seen.has(a.link)) continue;
        if (!a.title || !a.description) continue;
        if ((a.description ?? "").length < 60) continue; // skip stub descriptions
        // source_id check removed — domainurl param already filters to quality sources
        seen.add(a.link);
        stories.push(mapArticle(a, category));
        added++;
      }
      console.log(`  ${category}: ${added} stories`);
    } catch (err) {
      console.warn(`  ${category}: FAILED — ${err.message}`);
    }
  }

  if (stories.length === 0) {
    console.error("No stories fetched — keeping existing wire.json unchanged");
    process.exit(1);
  }

  writeFileSync(WIRE_PATH, JSON.stringify(stories, null, 2) + "\n");
  console.log(`\nwire.json updated — ${stories.length} stories (${today()})`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
