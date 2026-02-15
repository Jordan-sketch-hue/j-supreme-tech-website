'use client';

import { useState, useMemo, useEffect } from 'react';
import { productsData } from '@/lib/productsConfig';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  industry: string;
  productSlugs: string[];
  useCases: Record<string, string>;
  agreeToTerms: boolean;
}

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Retail',
  'Manufacturing',
  'Education',
  'Hospitality',
  'Real Estate',
  'Legal',
  'Marketing',
  'Consulting',
  'Other',
];

const useCasesByProduct: Record<string, Array<{ id: string; name: string; description: string }>> = {
  'AutoFlow': [
    { id: 'uc1', name: 'Process Automation', description: 'Automate repetitive business processes' },
    { id: 'uc2', name: 'Workflow Optimization', description: 'Streamline team workflows' },
    { id: 'uc3', name: 'Integration Setup', description: 'Connect multiple tools together' },
  ],
  'AppointmentPro': [
    { id: 'uc1', name: 'Healthcare Scheduling', description: 'Manage patient appointments' },
    { id: 'uc2', name: 'Salon Booking', description: 'Book beauty services' },
    { id: 'uc3', name: 'Consultation', description: 'Schedule one-on-one consultations' },
  ],
  'TradeBotElite': [
    { id: 'uc1', name: 'Day Trading', description: 'Automated intraday trading' },
    { id: 'uc2', name: 'Swing Trading', description: 'Medium-term trading strategies' },
    { id: 'uc3', name: 'Portfolio Rebalancing', description: 'Automatic portfolio management' },
  ],
  'CryptoBot Pro': [
    { id: 'uc1', name: 'Spot Trading', description: 'Automated spot trading' },
    { id: 'uc2', name: 'Futures Trading', description: 'Manage cryptocurrency futures' },
    { id: 'uc3', name: 'Portfolio Management', description: 'Multi-exchange portfolio tracking' },
  ],
  'DataVault': [
    { id: 'uc1', name: 'Data Security', description: 'Secure sensitive data storage' },
    { id: 'uc2', name: 'Compliance', description: 'Meet regulatory requirements' },
    { id: 'uc3', name: 'Analytics', description: 'Analyze encrypted data' },
  ],
  'InsightHub': [
    { id: 'uc1', name: 'Business Analytics', description: 'Track business metrics' },
    { id: 'uc2', name: 'Sales Analytics', description: 'Monitor sales performance' },
    { id: 'uc3', name: 'Customer Insights', description: 'Understand customer behavior' },
  ],
  'AIAssist': [
    { id: 'uc1', name: 'Customer Support', description: 'AI-powered support chatbot' },
    { id: 'uc2', name: 'Content Generation', description: 'Generate content automatically' },
    { id: 'uc3', name: 'Data Analysis', description: 'Analyze business data with AI' },
  ],
  'ChatGPT Enterprise': [
    { id: 'uc1', name: 'Team Collaboration', description: 'AI assistant for your team' },
    { id: 'uc2', name: 'Knowledge Management', description: 'Organize team knowledge' },
    { id: 'uc3', name: 'Training', description: 'AI-powered employee training' },
  ],
  'CodeDeploy': [
    { id: 'uc1', name: 'CI/CD Pipeline', description: 'Automated deployment pipeline' },
    { id: 'uc2', name: 'Version Management', description: 'Manage code versions' },
    { id: 'uc3', name: 'Rollback Strategy', description: 'Quick disaster recovery' },
  ],
  'CloudMonitor': [
    { id: 'uc1', name: 'Infrastructure Monitoring', description: 'Monitor cloud resources' },
    { id: 'uc2', name: 'Performance Tracking', description: 'Track system performance' },
    { id: 'uc3', name: 'Cost Optimization', description: 'Reduce cloud expenses' },
  ],
  'MarketingMax': [
    { id: 'uc1', name: 'Email Campaigns', description: 'Automated email marketing' },
    { id: 'uc2', name: 'Lead Nurturing', description: 'Nurture sales leads' },
    { id: 'uc3', name: 'Campaign Analytics', description: 'Measure campaign success' },
  ],
  'SEO Optimizer': [
    { id: 'uc1', name: 'Keyword Research', description: 'Find profitable keywords' },
    { id: 'uc2', name: 'Rank Tracking', description: 'Monitor search rankings' },
    { id: 'uc3', name: 'Competitor Analysis', description: 'Analyze competitor SEO' },
  ],
  'FinanceFlow': [
    { id: 'uc1', name: 'Invoice Management', description: 'Create and track invoices' },
    { id: 'uc2', name: 'Expense Tracking', description: 'Monitor business expenses' },
    { id: 'uc3', name: 'Financial Reporting', description: 'Generate financial reports' },
  ],
  'InvestmentAnalyzer': [
    { id: 'uc1', name: 'Portfolio Tracking', description: 'Track investment portfolio' },
    { id: 'uc2', name: 'Risk Analysis', description: 'Analyze portfolio risk' },
    { id: 'uc3', name: 'Asset Allocation', description: 'Optimize asset allocation' },
  ],
  'CRMSync': [
    { id: 'uc1', name: 'Sales Pipeline', description: 'Manage sales pipeline' },
    { id: 'uc2', name: 'Customer Management', description: 'Centralize customer data' },
    { id: 'uc3', name: 'Team Collaboration', description: 'Improve team collaboration' },
  ],
  'SupportHub': [
    { id: 'uc1', name: 'Ticket Management', description: 'Manage support tickets' },
    { id: 'uc2', name: 'Live Chat', description: 'Provide live chat support' },
    { id: 'uc3', name: 'Knowledge Base', description: 'Build customer knowledge base' },
  ],
};

export function TrialRequestForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    industry: '',
    productSlugs: [],
    useCases: {},
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Pre-select product from URL query parameter
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    
    if (product && productsData.some(p => p.slug === product)) {
      setFormData(prev => ({
        ...prev,
        productSlugs: [product],
      }));
    }
  }, []);

  const selectedProducts = useMemo(() => {
    return productsData.filter((p) => formData.productSlugs.includes(p.slug));
  }, [formData.productSlugs]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (formData.productSlugs.length === 0) newErrors.products = 'Select at least one product';
    if (!formData.agreeToTerms) newErrors.terms = 'You must agree to terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/trials/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit trial request');

      const data = await response.json();
      setSuccess(true);
      onSuccess?.();

      // Redirect to trial setup page after 2 seconds
      setTimeout(() => {
        window.location.href = `/trials/${data.trialId}/setup`;
      }, 2000);
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const toggleProduct = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      productSlugs: prev.productSlugs.includes(slug)
        ? prev.productSlugs.filter((s) => s !== slug)
        : [...prev.productSlugs, slug],
      // Clear use case for removed product
      useCases: prev.productSlugs.includes(slug)
        ? { ...prev.useCases, [slug]: '' }
        : prev.useCases,
    }));
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-900 mb-2">Trial Request Received!</h2>
        <p className="text-green-700 mb-4">
          Setting up your personalized trial environments. Redirecting in 2 seconds...
        </p>
        <div className="animate-pulse text-green-600">⏳ Preparing your trial access...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Start Your Free Trial</h1>
        <p className="text-lg text-gray-600">
          Experience our products risk-free. No credit card required. 14-day trial access.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="john@company.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.company
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Your Company"
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Industry *
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.industry
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
            </div>
          </div>
        </div>

        {/* Product Selection */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Products to Trial *</h2>
          {errors.products && <p className="text-red-500 text-sm mb-4">{errors.products}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {productsData.map((product) => (
              <button
                key={product.slug}
                type="button"
                onClick={() => toggleProduct(product.slug)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.productSlugs.includes(product.slug)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">{product.icon}</div>
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                {formData.productSlugs.includes(product.slug) && (
                  <div className="text-blue-600 font-bold mt-2">✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        {selectedProducts.length > 0 && (
          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Use Cases</h2>
            <p className="text-gray-600 mb-6">
              Select the primary use case for each product (optional)
            </p>

            <div className="space-y-6">
              {selectedProducts.map((product) => (
                <div key={product.slug} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">{product.icon}</span>
                    {product.name}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {useCasesByProduct[product.slug]?.map((uc) => (
                      <button
                        key={uc.id}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            useCases: {
                              ...formData.useCases,
                              [product.slug]: uc.id,
                            },
                          })
                        }
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          formData.useCases[product.slug] === uc.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-blue-300'
                        }`}
                      >
                        <p className="font-semibold text-gray-900">{uc.name}</p>
                        <p className="text-sm text-gray-600">{uc.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terms */}
        <div className="border-t pt-6">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              className="mt-1 w-4 h-4"
            />
            <span className="ml-3 text-sm text-gray-700">
              I agree to the{' '}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              *
            </span>
          </label>
          {errors.terms && <p className="text-red-500 text-sm mt-2">{errors.terms}</p>}
        </div>

        {/* Submit */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{errors.submit}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2">⏳</span> Setting up your trial...
            </span>
          ) : (
            'Get Free Trial Access'
          )}
        </button>
      </form>
    </div>
  );
}
