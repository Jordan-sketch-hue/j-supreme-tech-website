'use client';

import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  features: string[];
  status: 'active' | 'beta' | 'coming-soon';
  icon: string;
  categoryColors: Record<string, string>;
  statusColors: Record<string, string>;
}

export function ProductCard({
  name,
  slug,
  description,
  category,
  features,
  status,
  icon,
  categoryColors,
  statusColors,
}: ProductCardProps) {
  const statusLabel = status === 'coming-soon' ? 'Coming Soon' : status.charAt(0).toUpperCase() + status.slice(1);

  const handleTryFree = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Redirect to free trial with product slug in URL
    window.location.href = `/free-trial?product=${slug}`;
  };

  return (
    <div className="h-full group">
      <Link href={`/products/${slug}`}>
        <div className="h-full cursor-pointer rounded-lg border border-gray-200 p-8 hover:shadow-xl transition-all hover:border-blue-300 bg-white overflow-hidden">
          {/* Icon and Status */}
          <div className="flex items-start justify-between">
            <div className="text-4xl group-hover:scale-110 transition-transform">
              {icon}
            </div>
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[status]}`}>
              {statusLabel}
            </span>
          </div>

          {/* Title and Category */}
          <h3 className="mt-4 text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[category]}`}>
            {category}
          </span>

          {/* Description */}
          <p className="mt-4 text-gray-600 line-clamp-2">{description}</p>

          {/* Features */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Key Features:
            </p>
            <ul className="mt-3 space-y-2">
              {features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 text-blue-600 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
              {features.length > 3 && (
                <li className="text-xs text-gray-500 italic">
                  +{features.length - 3} more features
                </li>
              )}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-8 inline-block text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
            View Details →
          </div>
        </div>
      </Link>
      
      {/* Try Free Button - Outside Link */}
      {status !== 'coming-soon' && (
        <button
          onClick={handleTryFree}
          className="mt-4 w-full rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 py-2.5 font-semibold text-white hover:shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700"
        >
          Try Free for 14 Days
        </button>
      )}
      {status === 'coming-soon' && (
        <button
          disabled
          className="mt-4 w-full rounded-lg bg-gray-200 py-2.5 font-semibold text-gray-400 cursor-not-allowed"
        >
          Coming Soon
        </button>
      )}
    </div>
  );
}
