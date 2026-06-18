import { type Article, CATEGORIES, formatDate } from "@/lib/blog-taxonomy";

const SITE = "https://jsupremetech.online";
const ORG = {
  "@type": "Organization",
  name: "J Supreme Tech",
  url: SITE,
  logo: `${SITE}/icon.svg`,
  sameAs: ["https://wa.me/16582182282"],
};

export function ArticleJsonLd({ article }: { article: Article }) {
  const url = `${SITE}/blog/${article.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": url,
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      author: { "@type": "Person", name: article.author },
      publisher: ORG,
      mainEntityOfPage: url,
      articleSection: CATEGORIES[article.category].label,
      keywords: article.keywords.join(", "),
      image: `${url}/opengraph-image`,
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "The Signal", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 2, name: CATEGORIES[article.category].label, item: `${SITE}/blog/category/${article.category}` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];
  if (article.faq && article.faq.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}

export function BlogJsonLd({ description }: { description: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE}/blog`,
          name: "The Signal — J Supreme Tech",
          description,
          url: `${SITE}/blog`,
          publisher: ORG,
        }),
      }}
    />
  );
}

export { SITE, formatDate };
