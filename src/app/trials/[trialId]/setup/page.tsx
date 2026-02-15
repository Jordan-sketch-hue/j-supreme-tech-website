'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BadgeCheck, Check, Loader2, Lightbulb, Moon, Rocket, Sparkles, Sun, Target, XCircle } from 'lucide-react';
import { IconRenderer } from '@/components/IconRenderer';
import { productsData } from '@/lib/productsConfig';
import { TrialRequest } from '@/types/trials';

export default function TrialSetupPage({ params }: { params: Promise<{ trialId: string }> }) {
  const [trialId, setTrialId] = useState<string>('');
  const [trial, setTrial] = useState<TrialRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [setupStep, setSetupStep] = useState(0);

  const getLocalTrial = (id: string): TrialRequest | null => {
    const raw = localStorage.getItem(`trial:${id}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as TrialRequest;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const unwrapParams = async () => {
      const { trialId: id } = await params;
      setTrialId(id);

      const localTrial = getLocalTrial(id);

      try {
        const response = await fetch(`/api/trials/request?trialId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setTrial(data);
          setError(null);
          return;
        }

        if (localTrial) {
          setTrial(localTrial);
          setError(null);
          return;
        }

        throw new Error('Trial not found');
      } catch (err) {
        if (localTrial) {
          setTrial(localTrial);
          setError(null);
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load trial');
        }
      } finally {
        setLoading(false);
      }
    };

    unwrapParams();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold text-gray-900">Setting up your trial...</h1>
          <p className="text-gray-600 mt-2">Preparing your personalized environments</p>
        </div>
      </div>
    );
  }

  if (error || !trial) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <XCircle className="text-red-600 mx-auto mb-4" size={56} />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Trial Setup Failed</h1>
          <p className="text-red-600 mb-6">{error || 'Unable to find your trial'}</p>
          <Link href="/products" className="text-blue-600 hover:underline font-semibold">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const selectedProducts = productsData.filter((p) => trial.productSlugs.includes(p.slug));
  const daysRemaining = Math.ceil(
    (new Date(trial.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const setupSteps = [
    {
      title: 'Welcome',
      description: 'Get ready to experience our products',
    },
    {
      title: 'Product Overview',
      description: 'Learn about each product you selected',
    },
    {
      title: 'Customization',
      description: 'Personalize your trial experience',
    },
    {
      title: 'Launch Trial',
      description: 'Start exploring your products',
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Trial Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <span className="inline-flex items-center gap-3">
              <Sparkles size={32} className="text-blue-600" />
              Welcome, {trial.firstName}!
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your 14-day trial is ready. Let's get started!
          </p>

          {/* Trial Info Card */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-blue-100 text-sm uppercase tracking-wide">Status</p>
                <p className="text-2xl font-bold">Active</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm uppercase tracking-wide">Days Remaining</p>
                <p className="text-2xl font-bold">{daysRemaining} Days</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm uppercase tracking-wide">Products Selected</p>
                <p className="text-2xl font-bold">{selectedProducts.length} Products</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-400">
              <p className="text-sm text-blue-100 flex items-center gap-2">
                <Lightbulb size={16} className="text-blue-100" />
                Access all product features without limitations during your trial
              </p>
            </div>
          </div>
        </div>

        {/* Setup Progress */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Setup Progress</h2>
          <div className="flex justify-between items-center">
            {setupSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                    index <= setupStep
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index <= setupStep ? <Check size={18} /> : index + 1}
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-2">{step.title}</p>
                {index < setupSteps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 mt-6 ${
                      index < setupStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content by Step */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {setupStep === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <Sparkles size={48} className="text-blue-600 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to your Trial!</h2>
                <p className="text-gray-600 mb-6">
                  You've selected {selectedProducts.length} amazing products. This setup wizard will help you
                  get the most out of your trial experience.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 py-4 px-6 rounded mb-6">
                  <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <Sparkles size={18} className="text-blue-700" /> What to Expect
                  </h3>
                  <ul className="text-blue-800 space-y-2 text-sm">
                    {[
                      'Full access to all product features',
                      'Pre-loaded demo data matching your use cases',
                      'Personalized onboarding for each product',
                      'AI-powered suggestions and guidance',
                      'No credit card required',
                      '24/7 support during your trial',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check size={16} className="text-blue-700 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSetupStep(1)}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next: View Your Products →
                </button>
              </div>
            )}

            {setupStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Your Selected Products</h2>

                {selectedProducts.map((product) => {
                  const useCase = trial.useCases[product.slug];

                  return (
                    <div key={product.slug} className="bg-white rounded-lg shadow-lg p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="mb-2">
                            <IconRenderer iconName={product.icon} size={40} className="text-blue-600" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                          <p className="text-gray-600 mt-1">{product.category}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                          Ready
                        </span>
                      </div>

                      <p className="text-gray-600 mb-6">{product.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <Target size={16} className="text-blue-600" /> Your Use Case
                          </h4>
                          <p className="text-gray-700 text-sm">
                            {useCase
                              ? `Using for: ${useCase}`
                              : 'Exploring general features'}
                          </p>
                        </div>

                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <BadgeCheck size={16} className="text-indigo-600" /> Access Ready
                          </h4>
                          <p className="text-gray-700 text-sm">
                            Your secure environment is provisioned
                          </p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600">
                          <strong>Starter Features Included:</strong> {product.features.slice(0, 3).join(', ')}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-between">
                  <button
                    onClick={() => setSetupStep(0)}
                    className="text-blue-600 font-bold py-3 px-8 hover:text-blue-700"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setSetupStep(2)}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next: Customize →
                  </button>
                </div>
              </div>
            )}

            {setupStep === 2 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Customize Your Trial</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Preferred Theme
                    </label>
                    <div className="flex gap-4">
                      {['light', 'dark'].map((theme) => (
                        <button
                          key={theme}
                          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            theme === 'light'
                              ? 'bg-gray-100 text-gray-900 border-2 border-blue-600'
                              : 'bg-gray-900 text-white border-2 border-gray-300'
                          }`}
                        >
                          <span className="inline-flex items-center gap-2">
                            {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
                            {theme === 'light' ? 'Light' : 'Dark'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Timezone
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>UTC</option>
                      <option>EST</option>
                      <option>CST</option>
                      <option>MST</option>
                      <option>PST</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Pre-load Demo Data
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="ml-2 text-gray-700">
                        Load sample data for your use cases (recommended)
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      AI Suggestions
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="ml-2 text-gray-700">
                        Enable AI-powered tips and recommendations
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setSetupStep(1)}
                    className="text-blue-600 font-bold py-3 px-8 hover:text-blue-700"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setSetupStep(3)}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Launch Trial →
                  </button>
                </div>
              </div>
            )}

            {setupStep === 3 && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <Rocket size={48} className="text-blue-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Launch!</h2>
                <p className="text-gray-600 mb-8">
                  Your trial environments are fully configured and ready to explore.
                </p>

                <div className="bg-green-50 border-l-4 border-green-600 py-4 px-6 rounded mb-8">
                  <p className="text-green-800 font-semibold flex items-center gap-2">
                    <Check size={16} className="text-green-700" />
                    All features unlocked for {selectedProducts.length} products
                  </p>
                  <p className="text-green-700 text-sm mt-2">
                    Demo data loaded. AI guidance enabled. You're all set!
                  </p>
                </div>

                <Link
                  href={`/trials/${trialId}/dashboard`}
                  className="bg-blue-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                  Go to Trial Dashboard →
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Trial Summary</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Your Email</p>
                  <p className="font-semibold text-gray-900">{trial.email}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Company</p>
                  <p className="font-semibold text-gray-900">{trial.company}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Industry</p>
                  <p className="font-semibold text-gray-900">{trial.industry}</p>
                </div>

                <div className="border-t pt-6">
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-3">
                    Products Selected
                  </p>
                  <div className="space-y-2">
                    {selectedProducts.map((p) => (
                      <div key={p.slug} className="flex items-center">
                        <IconRenderer iconName={p.icon} size={18} className="text-blue-600 mr-2" />
                        <span className="text-sm text-gray-700">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6 bg-blue-50 -mx-6 px-6 py-6 rounded-b-lg mt-6">
                  <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-3">
                    Need Help?
                  </p>
                  <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Chat with Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
