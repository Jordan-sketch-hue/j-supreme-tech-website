import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold">J Supreme Tech</h3>
            <p className="mt-2 text-sm text-gray-600">
              Engineering the future of intelligence
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-black">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-black">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/free-trial" className="text-sm text-gray-600 hover:text-black">
                  Free Trial
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-black">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-black">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-black">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-black">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-black">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2026 J Supreme Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
