export const metadata = {
  title: 'Free Trial - J Supreme Tech',
  description: 'Start your free 14-day trial of J Supreme Tech products',
};

export default function FreeTrialPage() {
  const products = [
    {
      name: 'AutoFlow',
      description: 'Intelligent workflow automation',
      trialDays: 14,
      features: [
        'Up to 5 workflows',
        'Basic automation templates',
        'Email support',
      ],
    },
    {
      name: 'DataVault',
      description: 'Secure data management platform',
      trialDays: 14,
      features: ['Up to 10 GB storage', 'Basic analytics', 'Email support'],
    },
    {
      name: 'AIAssist',
      description: 'AI-powered assistant',
      trialDays: 7,
      features: ['100 API calls/day', 'Limited NLP features', 'Email support'],
    },
  ];

  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Start Your Free Trial
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              No credit card required. Full access to all features.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.name}
                className="rounded-lg border border-gray-200 p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-2 text-gray-600">{product.description}</p>

                <div className="mt-6 rounded-lg bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Free Trial
                  </p>
                  <p className="mt-1 text-2xl font-bold text-blue-600">
                    {product.trialDays} Days
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-700">
                    What's Included:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="mt-8 w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700">
                  Start {product.trialDays}-Day Trial
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-lg bg-gray-50 p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-6">
              {[
                {
                  q: 'Will I be charged when my trial ends?',
                  a: 'No, we will never charge your card unless you explicitly upgrade to a paid plan.',
                },
                {
                  q: 'Can I use multiple products in a single trial?',
                  a: 'Yes, you can access all products during your trial period.',
                },
                {
                  q: 'Can I extend my trial?',
                  a: 'Contact our support team to discuss options for extending your trial.',
                },
                {
                  q: 'What happens to my data after the trial?',
                  a: 'Your data is preserved for 30 days. Upgrade to a paid plan to keep your data.',
                },
              ].map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <p className="mt-2 text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
