export const metadata = {
  title: 'Blog - J Supreme Tech',
  description: 'Insights on AI, automation, and SaaS development',
};

const posts = [
  {
    id: 1,
    title: 'The Future of AI in Business Automation',
    slug: 'future-of-ai-automation',
    excerpt:
      'Explore how AI is transforming business processes and what it means for your organization.',
    category: 'AI',
    author: 'John Developer',
    date: '2026-02-01',
    readTime: 8,
  },
  {
    id: 2,
    title: 'Building Scalable SaaS Products',
    slug: 'building-scalable-saas',
    excerpt:
      'Best practices for architecting SaaS solutions that can grow with your user base.',
    category: 'SaaS',
    author: 'Sarah Tech',
    date: '2026-01-28',
    readTime: 12,
  },
  {
    id: 3,
    title: 'Zero-Downtime Deployments: A Guide',
    slug: 'zero-downtime-deployments',
    excerpt:
      'Learn techniques for deploying updates without affecting your users or services.',
    category: 'DevOps',
    author: 'Mike Cloud',
    date: '2026-01-25',
    readTime: 10,
  },
];

export default function BlogPage() {
  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
          <p className="mt-4 text-lg text-gray-600">
            Insights on technology, AI, automation, and building products.
          </p>

          <div className="mt-12 space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border-b border-gray-200 pb-8 last:border-b-0"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-900">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-600">
                        {post.readTime} min read
                      </span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-gray-600">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                      <span>By {post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-blue-50 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              Get Updates in Your Inbox
            </h3>
            <p className="mt-2 text-gray-600">
              Subscribe to our newsletter for insights and updates.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              className="mt-4 w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2"
            />
            <button className="mt-4 block w-full max-w-sm rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
