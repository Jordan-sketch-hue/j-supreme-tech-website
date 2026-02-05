import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Technology at the Supreme Level
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            AI-powered tools, automation systems, and SaaS products designed to help you build faster, think smarter, and scale supreme.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/free-trial"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start Free Trial
            </Link>
            <Link
              href="/products"
              className="rounded-lg border-2 border-gray-300 px-8 py-3 font-semibold text-gray-900 hover:border-gray-400"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900">What We Build</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: 'AI-Powered Tools',
                description:
                  'Intelligent automation that learns and scales with your business needs.',
              },
              {
                title: 'SaaS Products',
                description:
                  'Modern, subscription-based software solutions ready to deploy immediately.',
              },
              {
                title: 'Custom Integration',
                description:
                  'Seamless API development and third-party integrations for your systems.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-gray-200 p-8"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold">Ready to Build the Future?</h2>
          <p className="mt-4 text-lg opacity-90">
            Join hundreds of companies leveraging J Supreme Tech for intelligence and scale.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-gray-100"
          >
            Book a Consultation
          </Link>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Trusted by Leading Companies
          </h2>
          <div className="mt-12 text-center text-gray-600">
            <p>Logos and testimonials will be added here</p>
          </div>
        </div>
      </section>
    </main>
  );
}
