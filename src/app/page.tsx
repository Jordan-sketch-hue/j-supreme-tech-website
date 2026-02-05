import Link from 'next/link';
import { FAQ } from '@/components/FAQ';
import { AppointmentScheduler } from '@/components/AppointmentScheduler';

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section - Premium Gradient */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-6 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/50 px-4 py-2 text-sm font-semibold text-blue-700 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              Now Available: AI-Powered Automation Suite
            </div>

            {/* Headline */}
            <h1 className="mt-8 text-6xl font-bold leading-tight text-gray-900 md:text-7xl lg:text-8xl">
              Technology at the{' '}
              <span className="gradient-text">Supreme</span> Level
            </h1>

            {/* Subheading */}
            <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600 md:text-2xl">
              Leverage cutting-edge AI automation, intelligent systems, and scalable SaaS products
              to accelerate growth and unlock unprecedented efficiency.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/free-trial"
                className="btn-premium group rounded-full px-8 py-4 text-lg font-semibold text-white shadow-2xl"
              >
                Start Free Trial
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/products"
                className="rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg hover:border-gray-400"
              >
                Explore Solutions
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-sm font-semibold text-gray-600">TRUSTED BY INDUSTRY LEADERS</div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-24 rounded bg-gray-200" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Modern Design */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900">
              Intelligent Solutions for <span className="gradient-text">Modern Business</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Engineered for performance, designed for scale
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Automation',
                description: 'Advanced machine learning algorithms that adapt and optimize workflows in real-time.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: '⚡',
                title: 'Lightning-Fast Performance',
                description: 'Optimized infrastructure delivering sub-second response times at global scale.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: '🔒',
                title: 'Enterprise-Grade Security',
                description: 'Bank-level encryption, SOC 2 compliance, and comprehensive audit trails.',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: '📊',
                title: 'Advanced Analytics',
                description: 'Real-time insights and predictive analytics powered by proprietary algorithms.',
                gradient: 'from-orange-500 to-red-500',
              },
              {
                icon: '🔗',
                title: 'Seamless Integrations',
                description: 'Connect with 1000+ platforms through our robust API and pre-built connectors.',
                gradient: 'from-indigo-500 to-blue-500',
              },
              {
                icon: '🚀',
                title: 'Infinite Scalability',
                description: 'Architected on cloud-native infrastructure that grows with your ambitions.',
                gradient: 'from-pink-500 to-rose-500',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card-hover group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8"
              >
                <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl transition-all group-hover:scale-150`} />
                <div className="relative">
                  <div className="text-5xl">{feature.icon}</div>
                  <h3 className="mt-4 text-2xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="mt-3 text-gray-600">{feature.description}</p>
                  <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            {[
              { value: '10M+', label: 'API Calls Daily' },
              { value: '99.99%', label: 'Uptime SLA' },
              { value: '150+', label: 'Countries Served' },
              { value: '<100ms', label: 'Avg Response Time' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold">{stat.value}</div>
                <div className="mt-2 text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900">
              Trusted by <span className="gradient-text">Innovators</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              See what industry leaders are saying
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                quote: "J Supreme Tech transformed our operations. The AI automation saved us 40 hours per week.",
                author: "Sarah Chen",
                role: "CTO, TechCorp",
                avatar: "SC",
              },
              {
                quote: "Best investment we've made. The ROI was immediate and the support team is exceptional.",
                author: "Michael Rodriguez",
                role: "CEO, GrowthLabs",
                avatar: "MR",
              },
              {
                quote: "Enterprise-grade reliability with startup-level agility. Exactly what we needed.",
                author: "Emily Watson",
                role: "VP Engineering, DataFlow",
                avatar: "EW",
              },
            ].map((testimonial, index) => (
              <div key={index} className="card-hover rounded-2xl border border-gray-200 bg-white p-8">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="mt-4 text-lg text-gray-700">{testimonial.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-semibold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Scheduler */}
      <AppointmentScheduler />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-6 text-xl opacity-90">
            Join thousands of companies leveraging J Supreme Tech for unparalleled growth.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/free-trial"
              className="btn-premium rounded-full px-8 py-4 text-lg font-semibold text-white shadow-2xl"
            >
              Start Your Free Trial
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white hover:bg-white/10"
            >
              Schedule a Demo
            </Link>
          </div>
          <p className="mt-8 text-sm opacity-70">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </main>
  );
}
