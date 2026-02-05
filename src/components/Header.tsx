import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-black">
          JST
        </Link>

        <div className="hidden space-x-8 md:flex">
          <Link href="/products" className="text-sm font-medium hover:text-blue-600">
            Products
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-blue-600">
            Services
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-blue-600">
            Blog
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-blue-600">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-blue-600">
            Contact
          </Link>
        </div>

        <div className="flex space-x-4">
          <Link
            href="/login"
            className="text-sm font-medium hover:text-blue-600"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
