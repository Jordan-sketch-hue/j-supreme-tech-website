import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageViewConversion } from '@/components/GoogleConversions';
import { IconRenderer } from '@/components/IconRenderer';
import { productsData } from '@/lib/productsConfig';

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} - J Supreme Tech`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <PageViewConversion />
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/products" className="text-blue-600 hover:text-blue-700 font-semibold">
              ← Back to Products
            </Link>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="mb-4">
              <IconRenderer iconName={product.icon} size={48} className="text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.description}</p>
            <span className="mt-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900">
              {product.category}
            </span>
          </div>

          {/* Status Badge */}
          {product.status === 'coming-soon' && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800">
                <strong>Coming Soon:</strong> This product is currently in development. Sign up for early access!
              </p>
            </div>
          )}
          {product.status === 'beta' && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">
                <strong>Beta:</strong> This product is in beta testing. We would love your feedback!
              </p>
            </div>
          )}

          {/* Long Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {product.name}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{product.longDescription}</p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <span className="text-blue-600 font-bold mr-3 text-xl">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.pricing && (
                <>
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-4">
                      ${product.pricing.starter}
                      <span className="text-lg text-gray-600">/mo</span>
                    </p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                      Get Started
                    </button>
                    <p className="text-sm text-gray-600">Perfect for individuals and small teams</p>
                  </div>

                  <div className="border-2 border-blue-600 rounded-lg p-6 shadow-lg relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Professional</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-4">
                      ${product.pricing.professional}
                      <span className="text-lg text-gray-600">/mo</span>
                    </p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                      Get Started
                    </button>
                    <p className="text-sm text-gray-600">Ideal for growing businesses</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-4">
                      ${product.pricing.enterprise}
                      <span className="text-lg text-gray-600">/mo</span>
                    </p>
                    <button className="w-full bg-gray-200 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors mb-4">
                      Contact Sales
                    </button>
                    <p className="text-sm text-gray-600">Custom solutions for enterprises</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-6">
              {product.status === 'coming-soon'
                ? 'Sign up for early access to get notified when this product launches.'
                : 'Start your free trial today and experience the benefits of ' + product.name}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {product.status !== 'coming-soon' && (
                <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Free Trial
                </button>
              )}
              <button className={product.status === 'coming-soon' ? 'bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors' : 'bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors'}>
                {product.status === 'coming-soon' ? 'Notify Me' : 'Schedule Demo'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
