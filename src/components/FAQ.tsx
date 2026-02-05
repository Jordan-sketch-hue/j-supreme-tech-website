'use client';

import { useState } from 'react';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is J Supreme Tech?',
        a: 'J Supreme Tech is a cutting-edge technology platform providing AI-powered tools, automation systems, and SaaS products designed to accelerate business growth and operational efficiency.',
      },
      {
        q: 'How do I get started?',
        a: 'Getting started is simple. Sign up for a free 14-day trial, no credit card required. Once registered, you will have immediate access to our full suite of tools and resources.',
      },
      {
        q: 'What industries do you serve?',
        a: 'We serve businesses across all industries including technology, finance, healthcare, e-commerce, and professional services. Our platform is designed to scale with your specific needs.',
      },
    ],
  },
  {
    category: 'Pricing & Billing',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise customers. All transactions are securely processed through Stripe.',
      },
      {
        q: 'Can I change my plan anytime?',
        a: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately, and billing is prorated accordingly.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'We offer a 30-day money-back guarantee. If you are not satisfied within the first 30 days, contact support for a full refund.',
      },
    ],
  },
  {
    category: 'Features & Support',
    questions: [
      {
        q: 'What makes your platform different?',
        a: 'Our platform combines advanced AI, enterprise-grade security, lightning-fast performance, and seamless integrations. We focus on delivering measurable ROI from day one.',
      },
      {
        q: 'What kind of support do you provide?',
        a: 'All plans include 24/7 email support. Pro and Enterprise plans get priority support with dedicated account managers and technical assistance.',
      },
      {
        q: 'Do you offer training?',
        a: 'Yes! We provide comprehensive documentation, video tutorials, live webinars, and personalized onboarding for Enterprise customers.',
      },
    ],
  },
  {
    category: 'Security & Compliance',
    questions: [
      {
        q: 'How secure is my data?',
        a: 'Your data is protected with bank-level 256-bit encryption, SOC 2 Type II compliance, regular security audits, and comprehensive backup systems.',
      },
      {
        q: 'Where is data stored?',
        a: 'Data is stored in enterprise-grade data centers across multiple regions for redundancy. We use AWS and Google Cloud infrastructure.',
      },
      {
        q: 'Are you GDPR compliant?',
        a: 'Yes, we are fully GDPR, CCPA, and HIPAA compliant. We take data privacy seriously and provide tools for data export and deletion.',
      },
    ],
  },
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to know about J Supreme Tech
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {faqs.map((category, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveCategory(index);
                setOpenIndex(null);
              }}
              className={`rounded-full px-6 py-3 font-semibold transition-all ${
                activeCategory === index
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="mt-12 space-y-4">
          {faqs[activeCategory].questions.map((faq, index) => (
            <div
              key={index}
              className="card-hover overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.q}</span>
                <span
                  className={`text-2xl text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <div className="px-6 text-gray-600">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a href="/contact" className="font-semibold text-blue-600 hover:text-blue-700">
              Contact our team
            </a>{' '}
            for personalized assistance.
          </p>
        </div>
      </div>
    </section>
  );
}
