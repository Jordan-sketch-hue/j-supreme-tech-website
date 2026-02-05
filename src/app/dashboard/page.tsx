import Link from 'next/link';

export const metadata = {
  title: 'Dashboard - J Supreme Tech',
  description: 'Manage your subscriptions and account',
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-gray-200 bg-white md:block">
          <nav className="space-y-1 p-6">
            <Link
              href="/dashboard"
              className="block rounded-lg bg-blue-50 px-4 py-2 text-blue-600 font-semibold"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/subscriptions"
              className="block rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              Subscriptions
            </Link>
            <Link
              href="/dashboard/billing"
              className="block rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              Billing
            </Link>
            <Link
              href="/dashboard/settings"
              className="block rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              Settings
            </Link>
            <Link
              href="/dashboard/api-keys"
              className="block rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              API Keys
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="border-b border-gray-200 bg-white px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back! Here's what's happening.</p>
          </div>

          <div className="p-8">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <p className="text-sm font-semibold text-gray-600">Active Subscriptions</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">2</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <p className="text-sm font-semibold text-gray-600">Monthly Spend</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">$129</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <p className="text-sm font-semibold text-gray-600">Trials Available</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">1</p>
              </div>
            </div>

            {/* Subscriptions */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900">Your Subscriptions</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <div>
                    <p className="font-semibold text-gray-900">AutoFlow Pro</p>
                    <p className="text-sm text-gray-600">$99/month</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-900">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">DataVault Starter</p>
                    <p className="text-sm text-gray-600">$29/month</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-900">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
                >
                  Browse Products
                </Link>
                <Link
                  href="/dashboard/billing"
                  className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50"
                >
                  Update Billing
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50"
                >
                  Account Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
