'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { productsData } from '@/lib/productsConfig';
import { TrialRequest } from '@/types/trials';
import {
  TrialSecurityWrapper,
  TrialEnvironmentHeader,
  TrialExportBlocker,
  AIAssistantWidget,
  TrialLimitationBanner,
} from '@/components/TrialEnvironment';
import { RenderTrialEnvironment, getTrialEnvironment } from '@/lib/trialEnvironmentRegistry';
import { AlertCircle, BadgeCheck, Check, Loader2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  features: string[];
  description: string;
  icon: string;
  status: 'active' | 'beta' | 'coming-soon';
}

export default function TrialEnvironmentPage({
  params,
}: {
  params: Promise<{ trialId: string; productSlug: string }>;
}) {
  const [trialId, setTrialId] = useState<string>('');
  const [productSlug, setProductSlug] = useState<string>('');
  const [trial, setTrial] = useState<TrialRequest | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const { trialId: id, productSlug: slug } = await params;
        setTrialId(id);
        setProductSlug(slug);

        // Fetch trial details
        const response = await fetch(`/api/trials/request?trialId=${id}`);
        if (!response.ok) throw new Error('Trial not found');

        const data = await response.json();

        // Check if product is in trial
        if (!data.productSlugs.includes(slug)) {
          throw new Error('Product not in your trial');
        }

        // Check if trial is active
        if (new Date() > new Date(data.expiresAt)) {
          throw new Error('Your trial has expired');
        }

        setTrial(data);

        // Get product data
        const prod = productsData.find((p) => p.slug === slug);
        if (!prod) throw new Error('Product not found');
        setProduct(prod as Product);

        // Log login metric
        await fetch('/api/trials/request', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            trialId: id,
            action: 'logMetric',
            data: {
              productSlug: slug,
              metric: 'login',
            },
          }),
        }).catch(() => {}); // Silently fail if metric logging fails

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trial environment');
      } finally {
        setLoading(false);
      }
    };

    unwrapParams();
  }, [params]);

  // Track session time
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 0.0166); // 1/60 minute
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold text-gray-900">Launching trial environment...</h1>
          <p className="text-gray-600 mt-2">Setting up your secure sandbox</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product || !trial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <AlertCircle size={64} className="text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Trial</h1>
          <p className="text-red-600 mb-6">{error}</p>
          <Link
            href={`/trials/${trialId}/dashboard`}
            className="text-blue-600 hover:underline font-semibold"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const daysRemaining = Math.ceil(
    (new Date(trial.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  // Get trial environment component
  const trialEnvironment = getTrialEnvironment(productSlug);
  const hasProductSpecificEnvironment = !!trialEnvironment;

  return (
    <TrialSecurityWrapper>
      <TrialExportBlocker />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Navigation */}
          <div className="mb-6 flex justify-between items-center">
            <Link
              href={`/trials/${trialId}/dashboard`}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              ← Back to Dashboard
            </Link>
            <div className="text-right">
              <p className="text-xs text-gray-600 uppercase tracking-wide">Session Time</p>
              <p className="text-sm font-bold text-gray-900">
                {Math.floor(sessionTime)}m {Math.round((sessionTime % 1) * 60)}s
              </p>
            </div>
          </div>

          {/* Environment Header */}
          <TrialEnvironmentHeader
            productName={product.name}
            productIcon={product.icon}
            trialDaysLeft={daysRemaining}
          />

          {/* Limitation Banner */}
          <TrialLimitationBanner />

          {/* Product-Specific Trial Environment */}
          {hasProductSpecificEnvironment ? (
            <div className="mb-12 space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg px-4 py-3">
                <div className="text-sm font-semibold text-green-800 flex items-center gap-2">
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck size={18} className="text-green-700" />
                    Elite Trial Environment - {trialEnvironment.name}
                  </span>
                </div>
              </div>
              <RenderTrialEnvironment productSlug={productSlug} />
            </div>
          ) : (
            <GenericTrialEnvironment
              product={product}
              productSlug={productSlug}
              trialId={trialId}
              daysRemaining={daysRemaining}
            />
          )}
        </div>

        {/* AI Assistant */}
        <AIAssistantWidget />
      </main>
    </TrialSecurityWrapper>
  );
}

/**
 * Generic fallback trial environment for products without elite environments
 */
function GenericTrialEnvironment({
  product,
  productSlug,
  trialId,
  daysRemaining,
}: {
  product: Product;
  productSlug: string;
  trialId: string;
  daysRemaining: number;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to {product.name}</h1>
      <p className="text-gray-600 mb-8 text-lg">{product.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {product.features.map((feature, i) => (
          <div key={i} className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Check size={18} className="text-blue-600 mr-3 mt-1" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
        <p className="text-gray-600 mb-6">
          You have {daysRemaining} days left to try {product.name}. Explore all features and see if it's right for your needs.
        </p>
        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
          View Pricing & Upgrade
        </button>
      </div>
    </div>
  );
}
