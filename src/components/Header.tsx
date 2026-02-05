'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
            <span className="text-xl font-bold text-white">JS</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            J Supreme <span className="gradient-text">Tech</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 lg:flex">
          <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Products
          </Link>
          <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Services
          </Link>
          <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Resources
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Company
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center space-x-4 lg:flex">
          <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Sign In
          </Link>
          <Link href="/signup" className="btn-premium rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg">
            Get Started 
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
          <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <div className="space-y-1 px-6 py-4">
            <Link href="/products" className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50">
              Products
            </Link>
            <Link href="/services" className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50">
              Services
            </Link>
            <Link href="/blog" className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50">
              Resources
            </Link>
            <Link href="/pricing" className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50">
              Pricing
            </Link>
            <Link href="/about" className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50">
              Company
            </Link>
            <Link href="/contact" className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50">
              Contact
            </Link>
            <div className="pt-4">
              <Link href="/login" className="block rounded-lg px-4 py-3 text-center text-gray-700 hover:bg-gray-50">
                Sign In
              </Link>
              <Link href="/signup" className="btn-premium mt-2 block rounded-lg px-4 py-3 text-center font-semibold text-white">
                Get Started 
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
