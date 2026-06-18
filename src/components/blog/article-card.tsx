import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Article, CATEGORIES, formatDate } from "@/lib/blog-taxonomy";
import { Cover } from "./cover";

export function ArticleCard({ article, size = "md" }: { article: Article; size?: "sm" | "md" | "lg" }) {
  const cat = CATEGORIES[article.category];
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="card card-hover h-full overflow-hidden">
        <div className={`relative ${size === "lg" ? "aspect-[16/9]" : "aspect-[16/10]"} border-b border-line`}>
          <Cover motif={article.motif} seed={article.slug} className="h-full w-full" label={article.title} />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-line bg-white/90 px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ink-700 backdrop-blur">
            {cat.short}
          </span>
        </div>
        <div className={size === "lg" ? "p-7" : "p-5 sm:p-6"}>
          <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400">
            <span>{formatDate(article.date)}</span>
            <span aria-hidden>·</span>
            <span>{article.readMinutes} min</span>
          </div>
          <h3 className={`mt-2.5 font-display font-semibold tracking-tight text-ink-900 ${size === "lg" ? "text-2xl" : "text-lg"}`}>
            {article.title}
          </h3>
          <p className={`mt-2 leading-relaxed text-ink-600 ${size === "lg" ? "text-[0.98rem]" : "text-sm line-clamp-2"}`}>
            {article.deck}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-500 transition group-hover:text-ink-900">
            Read <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
