import Link from 'next/link';

export const metadata = {
  title: 'Services - J Supreme Tech',
  description: 'Custom software development and consulting services',
};

const services = [
  {
    id: 1,
    name: 'Custom Software Development',
    slug: 'custom-software',
    description: 'Tailored software solutions built for your specific needs',
    features: [
      'Full-stack development',
      'Technology agnostic',
      'Scalable architecture',
    ],
    timeline: '8-16 weeks',
  },
  {
    id: 2,
    name: 'AI & Automation Systems',
    slug: 'ai-automation',
    description: 'Intelligent automation to streamline your operations',
    features: [
      'Process automation',
      'ML model development',
      'Intelligent workflows',
    ],
    timeline: '6-12 weeks',
  },
  {
    id: 3,
    name: 'API Development & Integration',
    slug: 'api-development',
    description: 'Build robust APIs and integrate third-party systems',
    features: ['RESTful APIs', 'Third-party integrations', 'API security'],
    timeline: '4-8 weeks',
  },
  {
    id: 4,
    name: 'SaaS MVP Development',
    slug: 'saas-mvp',
    description: 'Launch your SaaS product with a solid MVP foundation',
    features: ['User authentication', 'Payment integration', 'Analytics'],
    timeline: '12-20 weeks',
  },
  {
    id: 5,
    name: 'Website & Web App Engineering',
    slug: 'web-engineering',
    description: 'Modern, performant web applications and websites',
    features: ['Responsive design', 'SEO optimization', 'Performance tuning'],
    timeline: '4-12 weeks',
  },
  {
    id: 6,
    name: 'Cloud Hosting & Scaling',
    slug: 'cloud-hosting',
    description: 'Infrastructure setup, scaling, and management',
    features: ['Cloud architecture', 'DevOps setup', 'Monitoring & alerts'],
    timeline: '2-4 weeks',
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-4 text-lg text-gray-600">
            Professional services to bring your vision to life
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  {service.name}
                </h3>
                <p className="mt-4 text-gray-600">{service.description}</p>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-700">What's Included:</p>
                  <ul className="mt-2 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Typical Timeline: <span className="font-semibold">{service.timeline}</span>
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="mt-6 inline-block text-blue-600 font-semibold hover:text-blue-700"
                >
                  Book Consultation →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
