'use client';

import { useCallback } from 'react';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  resultCount: number;
  totalCount: number;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  resultCount,
  totalCount,
}: ProductFiltersProps) {
  const handleClearFilters = useCallback(() => {
    onCategoryChange('All Products');
    onSearchChange('');
  }, [onCategoryChange, onSearchChange]);

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-12">
      {/* Search Bar */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Search Products
        </label>
        <input
          type="text"
          placeholder="Search by name, description, or features..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Category Filters */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Filter by Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results and Clear */}
      <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{resultCount}</span> of{' '}
          <span className="font-semibold">{totalCount}</span> products
        </p>
        {(selectedCategory !== 'All Products' || searchTerm) && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
