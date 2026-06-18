import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/blog";
import { getEbookSlugs } from "@/lib/ebooks";
import { CATEGORY_ORDER } from "@/lib/blog-taxonomy";

const SITE = "https://jsupremetech.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/products",
    "/pricing",
    "/market",
    "/about",
    "/contact",
    "/blog",
    "/blog/wire",
    "/library",
    "/newsletter",
    "/terms",
    "/privacy",
    "/disclaimer",
    "/login",
    "/signup",
  ].map((p) => ({ url: `${SITE}${p}`, lastModified: now, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));

  const categories: MetadataRoute.Sitemap = CATEGORY_ORDER.map((c) => ({
    url: `${SITE}/blog/category/${c}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articles: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${SITE}/blog/${a.slug}`,
    lastModified: new Date(`${a.updated ?? a.date}T09:00:00Z`),
    changeFrequency: "monthly",
    priority: a.featured ? 0.9 : 0.8,
  }));

  const ebooks: MetadataRoute.Sitemap = getEbookSlugs().map((slug) => ({
    url: `${SITE}/library/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...categories, ...articles, ...ebooks];
}
