export const metadata = {
  title: 'Pricing - J Supreme Tech',
  description: 'Simple, transparent pricing for all our products',
};

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Up to 5 projects',
        'Basic automation',
        '5 GB storage',
        'Email support',
        'API access (rate limited)',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        'Unlimited projects',
        'Advanced automation',
        '500 GB storage',
        'Priority support',
        'Full API access',
        'Custom integrations',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom SLA',
        'On-premise deployment',
        'Advanced security',
        'Custom features',
      ],
      highlighted: false,
      customPricing: true,
    },
  ];

  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that works for you. Always transparent, no hidden fees.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg border-2 p-8 ${
                  plan.highlighted
                    ? 'border-blue-600 bg-blue-50 shadow-lg'
                    : 'border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-block rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>

                <div className="mt-6">
                  {plan.customPricing ? (
                    <p className="text-3xl font-bold text-gray-900">Custom</p>
                  ) : (
                    <>
                      <p className="text-4xl font-bold text-gray-900">
                        ${plan.monthlyPrice}
                        <span className="text-lg text-gray-600">/mo</span>
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        or ${plan.yearlyPrice}/year (save 17%)
                      </p>
                    </>
                  )}
                </div>

                <button
                  className={`mt-8 w-full rounded-lg py-2 font-semibold transition ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border-2 border-gray-300 text-gray-900 hover:border-gray-400'
                  }`}
                >
                  {plan.customPricing ? 'Contact Sales' : 'Get Started'}
                </button>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="mr-3 text-blue-600">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
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
                  q: 'Can I change plans anytime?',
                  a: 'Yes, you can upgrade or downgrade at any time. Changes take effect at your next billing cycle.',
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Yes! All plans come with a 14-day free trial. No credit card required.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.',
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
