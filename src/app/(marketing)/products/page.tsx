import Link from 'next/link';

export const metadata = {
  title: 'Products - J Supreme Tech',
  description: 'Explore our AI-powered SaaS products and tools',
};

const products = [
  {
    id: 1,
    name: 'AutoFlow',
    slug: 'autoflow',
    description: 'Intelligent workflow automation system',
    category: 'Automation',
    features: ['Process automation', 'Scheduled tasks', 'Error handling'],
    status: 'active',
  },
  {
    id: 2,
    name: 'DataVault',
    slug: 'datavault',
    description: 'Secure data management and analytics platform',
    category: 'Data',
    features: ['Data encryption', 'Real-time analytics', 'Compliance ready'],
    status: 'active',
  },
  {
    id: 3,
    name: 'AIAssist',
    slug: 'aiassist',
    description: 'AI-powered assistant for your team',
    category: 'AI',
    features: ['Natural language processing', 'Smart suggestions', 'API access'],
    status: 'beta',
  },
  {
    id: 4,
    name: 'CodeDeploy',
    slug: 'codedeploy',
    description: 'Automated code deployment and versioning',
    category: 'DevOps',
    features: ['CI/CD pipeline', 'Version control', 'Rollback support'],
    status: 'coming-soon',
  },
];

export default function ProductsPage() {
  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-4 text-lg text-gray-600">
            Powerful SaaS solutions designed for growth and efficiency
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className="h-full cursor-pointer rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {product.name}
                      </h3>
                      <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-900">
                        {product.status}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600">{product.description}</p>

                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-700">
                      Features:
                    </p>
                    <ul className="mt-2 space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center text-gray-600">
                          <span className="mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 inline-block text-blue-600 font-semibold hover:text-blue-700">
                    View Details →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
