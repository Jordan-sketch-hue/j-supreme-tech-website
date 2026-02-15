'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PageViewConversion } from '@/components/GoogleConversions';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductCard } from '@/components/ProductCard';
import { productsData, categories, categoryColors, statusColors } from '@/lib/productsConfig';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const categoryMatch = selectedCategory === 'All Products' || product.category === selectedCategory;
      const searchMatch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <main>
      <PageViewConversion />
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
            <p className="mt-4 text-lg text-gray-600">
              Powerful SaaS solutions designed for growth and efficiency across all markets
            </p>
            
            {/* Free Trial CTA Banner */}
            <div className="mt-12 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 inline-block">
              <p className="text-white text-lg font-semibold mb-4">
                🎉 Try all products free for 14 days!
              </p>
              <Link href="/free-trial" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors">
                Start Your Free Trial Now
              </Link>
            </div>
          </div>

          {/* Product Filters */}
          <div className="mt-12">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              resultCount={filteredProducts.length}
              totalCount={productsData.length}
            />
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  categoryColors={categoryColors}
                  statusColors={statusColors}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600 mb-4">No products found matching your search.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Products');
                  setSearchTerm('');
                }}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
