import { getAllArticles } from "@/lib/blog";
import { CATEGORIES } from "@/lib/blog-taxonomy";

const SITE = "https://jsupremetech.online";

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const articles = getAllArticles();
  const items = articles
    .map((a) => {
      const url = `${SITE}/blog/${a.slug}`;
      const pub = new Date(`${a.date}T09:00:00Z`).toUTCString();
      return `    <item>
      <title>${escape(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      <category>${escape(CATEGORIES[a.category].label)}</category>
      <dc:creator>${escape(a.author)}</dc:creator>
      <description>${escape(a.excerpt || a.deck)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Signal — J Supreme Tech</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Engineering, marketing and the markets — production logs, playbooks and research from the J Supreme Tech studio.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
