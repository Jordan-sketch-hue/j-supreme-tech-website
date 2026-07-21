'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart3, BookOpen, Check, GraduationCap, Lightbulb, Loader2, MessageCircle, XCircle } from 'lucide-react';
import { IconRenderer } from '@/components/IconRenderer';
import { productsData } from '@/lib/productsConfig';
import { TrialRequest } from '@/types/trials';

export default function TrialDashboardPage({ params }: { params: Promise<{ trialId: string }> }) {
  const [trialId, setTrialId] = useState<string>('');
  const [trial, setTrial] = useState<TrialRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

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
          if (data.productSlugs.length > 0) {
            setActiveProduct(data.productSlugs[0]);
          }
          return;
        }

        if (localTrial) {
          setTrial(localTrial);
          if (localTrial.productSlugs.length > 0) {
            setActiveProduct(localTrial.productSlugs[0]);
          }
          return;
        }

        throw new Error('Trial not found');
      } catch (err) {
        if (localTrial) {
          setTrial(localTrial);
          if (localTrial.productSlugs.length > 0) {
            setActiveProduct(localTrial.productSlugs[0]);
          }
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
          <h1 className="text-2xl font-bold text-gray-900">Loading your trial dashboard...</h1>
        </div>
      </div>
    );
  }

  if (error || !trial) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <XCircle className="text-red-600 mx-auto mb-4" size={56} />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Error</h1>
          <p className="text-red-600 mb-6">{error}</p>
          <Link href="/products" className="text-blue-600 hover:underline font-semibold">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const selectedProducts = productsData.filter((p) => trial.productSlugs.includes(p.slug));
  const activeProductData = selectedProducts.find((p) => p.slug === activeProduct);
  const daysRemaining = Math.ceil(
    (new Date(trial.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const progressPercent = Math.max(
    0,
    100 - (daysRemaining / 14) * 100
  );

  const isExpired = daysRemaining <= 0;
  const isExpiring = daysRemaining <= 1 && daysRemaining > 0;

  async function handleUpgrade() {
    if (!trial) return;
    await fetch("/api/trials/notify-upgrade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trialId,
        email: trial.email,
        firstName: trial.firstName,
        company: trial.company,
        productSlugs: trial.productSlugs,
      }),
    }).catch(() => {});
    const slug = trial.productSlugs[0] ?? "";
    window.location.href = `https://suite.jsupremetech.online/start${slug ? `?system=${slug}` : ""}`;
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Expiry banner */}
        {(isExpired || isExpiring) && (
          <div className={`mb-8 rounded-2xl p-6 text-white ${isExpired ? "bg-red-600" : "bg-amber-500"}`}>
            <h2 className="text-xl font-bold mb-1">
              {isExpired ? "Your trial has ended" : "Your trial expires today"}
            </h2>
            <p className="text-sm opacity-90 mb-4">
              {isExpired
                ? "Upgrade to a paid plan to keep your data, branding, and AI staff — nothing is deleted for 7 days."
                : "Last chance — upgrade now to continue without interruption."}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleUpgrade}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 transition"
              >
                Upgrade now →
              </button>
              <a
                href={`https://wa.me/16582182282?text=${encodeURIComponent(`Hi Jordan, my Supreme Suite trial (${trialId}) just expired and I want to upgrade. Company: ${trial.company}`)}`}
                target="_blank" rel="noreferrer"
                className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                WhatsApp Jordan
              </a>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">Trial Dashboard</h1>
              <p className="text-xl text-gray-600">
                Welcome back, {trial.firstName}! Explore your {selectedProducts.length} products.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Company: <span className="font-semibold text-gray-700">{trial.company}</span>
              </p>
            </div>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Back to Products
            </Link>
          </div>

          {/* Trial Status Card */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div>
                <p className="text-blue-100 text-sm uppercase tracking-wide mb-2">Status</p>
                <p className="text-3xl font-bold inline-flex items-center gap-2">
                  Active <Check size={20} className="text-white" />
                </p>
              </div>
              <div>
                <p className="text-blue-100 text-sm uppercase tracking-wide mb-2">Days Left</p>
                <p className="text-3xl font-bold">{daysRemaining}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm uppercase tracking-wide mb-2">Products</p>
                <p className="text-3xl font-bold">{selectedProducts.length}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm uppercase tracking-wide mb-2">Usage</p>
                <p className="text-3xl font-bold">60%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Trial Progress</span>
                <span>{Math.round(progressPercent)}% Complete</span>
              </div>
              <div className="w-full bg-blue-400 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Product List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Products</h2>

              <div className="space-y-3">
                {selectedProducts.map((product) => (
                  <button
                    key={product.slug}
                    onClick={() => setActiveProduct(product.slug)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      activeProduct === product.slug
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <IconRenderer iconName={product.icon} size={24} className="text-blue-600 mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-semibold py-2 hover:bg-blue-50 px-3 rounded">
                    <span className="inline-flex items-center gap-2">
                      <BookOpen size={14} /> Documentation
                    </span>
                  </button>
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-semibold py-2 hover:bg-blue-50 px-3 rounded">
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle size={14} /> Chat Support
                    </span>
                  </button>
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-semibold py-2 hover:bg-blue-50 px-3 rounded">
                    <span className="inline-flex items-center gap-2">
                      <GraduationCap size={14} /> Tutorials
                    </span>
                  </button>
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-semibold py-2 hover:bg-blue-50 px-3 rounded">
                    <span className="inline-flex items-center gap-2">
                      <BarChart3 size={14} /> Analytics
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeProductData && (
              <div className="space-y-6">
                {/* Product Header */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="mb-4">
                        <IconRenderer iconName={activeProductData.icon} size={56} className="text-blue-600" />
                      </div>
                      <h2 className="text-4xl font-bold text-gray-900">{activeProductData.name}</h2>
                      <p className="text-gray-600 mt-2">{activeProductData.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                        <span className="inline-flex items-center gap-2">
                          Trial Access <Check size={16} className="text-green-700" />
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-2">
                        Features Included
                      </p>
                      <p className="text-lg font-bold text-gray-900">{activeProductData.features.length}</p>
                      <p className="text-sm text-gray-600 mt-1">All features unlocked</p>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <p className="text-xs text-indigo-600 uppercase tracking-wide font-semibold mb-2">
                        Demo Data
                      </p>
                      <p className="text-lg font-bold text-gray-900">Ready</p>
                      <p className="text-sm text-gray-600 mt-1">Pre-loaded for your use case</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-xs text-purple-600 uppercase tracking-wide font-semibold mb-2">
                        Support
                      </p>
                      <p className="text-lg font-bold text-gray-900">24/7</p>
                      <p className="text-sm text-gray-600 mt-1">Live chat support available</p>
                    </div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeProductData.features.map((feature, index) => (
                      <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
                        <Check size={18} className="text-blue-600 mr-3 mt-1" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Launch Trial Button */}
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                  <p className="mb-6 text-blue-100">
                    Launch the interactive trial environment and start exploring {activeProductData.name}
                  </p>
                  <Link
                    href={`/trials/${trialId}/products/${activeProduct}`}
                    className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Launch Trial Environment →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trial Tips Section */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-8">
          <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-yellow-700" /> Trial Tips
          </h3>
          <ul className="text-yellow-800 space-y-2">
            {[
              'Explore all features - everything is unlocked during your trial',
              'Check out the documentation - it has helpful guides and best practices',
              'Play with the demo data - modify it to match your actual use case',
              'Use AI suggestions - they personalize based on your actions',
              'Save your work - it persists until your trial expires',
              'Contact support - our team can help you get the most out of your trial',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check size={16} className="text-yellow-700 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
