export const metadata = {
  title: 'Privacy Policy - J Supreme Tech',
  description: 'Privacy Policy for J Supreme Tech website and services',
};

export default function PrivacyPage() {
  return (
    <main className="bg-white text-ink-900">
      <section className="py-20 md:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-5 text-4xl font-display font-semibold tracking-tight text-ink-900 md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 font-mono text-sm text-ink-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="mt-12 space-y-12 text-ink-700 leading-7">
              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">1. Introduction</h2>
                <p className="mt-4">
                  Welcome to J Supreme Tech ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">2. Information We Collect</h2>
                <p className="mt-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Payment and billing information</li>
                  <li>Account credentials</li>
                  <li>Communications with us</li>
                  <li>Any other information you choose to provide</li>
                </ul>
                <p className="mt-4">
                  We also automatically collect certain information when you visit our website:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                  <li>Log data (IP address, browser type, pages visited)</li>
                  <li>Device information</li>
                  <li>Cookies and similar technologies</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">3. How We Use Your Information</h2>
                <p className="mt-4">
                  We use the information we collect to:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues and fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">4. Google AdSense</h2>
                <p className="mt-4">
                  We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet.
                </p>
                <p className="mt-4">
                  You may opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink-900 underline underline-offset-4 hover:text-ink-600"
                  >
                    Google Ads Settings
                  </a>
                  {' '}or{' '}
                  <a
                    href="http://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink-900 underline underline-offset-4 hover:text-ink-600"
                  >
                    www.aboutads.info
                  </a>.
                </p>
                <p className="mt-4">
                  We also use a small number of affiliate links on our editorial pages. If you click one
                  and sign up or purchase, we may earn a commission at no additional cost to you. We only
                  recommend tools we actually use. See our{' '}
                  <a
                    href="/disclosure"
                    className="font-medium text-ink-900 underline underline-offset-4 hover:text-ink-600"
                  >
                    Advertising &amp; Affiliate Disclosure
                  </a>{' '}
                  for the full details. We do not run ads or affiliate links on our pricing, product, or
                  checkout pages.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">5. Cookies and Tracking Technologies</h2>
                <p className="mt-4">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
                </p>
                <p className="mt-4">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">6. Data Sharing and Disclosure</h2>
                <p className="mt-4">
                  We may share your information in the following circumstances:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                  <li><strong className="font-semibold text-ink-900">Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
                  <li><strong className="font-semibold text-ink-900">Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
                  <li><strong className="font-semibold text-ink-900">Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong className="font-semibold text-ink-900">With Your Consent:</strong> With your explicit permission for other purposes</li>
                </ul>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">7. Data Security</h2>
                <p className="mt-4">
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">8. Your Privacy Rights</h2>
                <p className="mt-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">9. Children's Privacy</h2>
                <p className="mt-4">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">10. International Data Transfers</h2>
                <p className="mt-4">
                  Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">11. Changes to This Privacy Policy</h2>
                <p className="mt-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">12. Email Marketing &amp; In Today&apos;s World:</h2>
                <p className="mt-4">
                  When you subscribe to our newsletter (&ldquo;In Today&apos;s World:&rdquo;) or request an e-book, we collect your email address and, optionally, your name. To document your consent and comply with anti-spam law, we also record the date and time of your sign-up and the IP address and browser used at the moment of consent.
                </p>
                <p className="mt-4">
                  We operate on a <strong className="font-semibold text-ink-900">double opt-in</strong> basis: after you subscribe, we email you a confirmation link, and you only join the list once you confirm. We use this information solely to send you our newsletter, e-books you requested, and occasional updates about our work — we <strong className="font-semibold text-ink-900">never sell, rent, or trade your email address</strong>.
                </p>
                <p className="mt-4">
                  Every email we send includes a one-click <strong className="font-semibold text-ink-900">unsubscribe</strong> link; you may withdraw consent at any time, and we will stop sending marketing email promptly. Our handling of marketing email is designed to align with the U.S. CAN-SPAM Act, Canada&rsquo;s Anti-Spam Legislation (CASL), and the EU/UK GDPR. Email delivery is handled by our processor <span className="font-mono text-ink-700">Resend</span>, and subscriber records are stored with our processor <span className="font-mono text-ink-700">Supabase</span>; both process data on our behalf under their respective terms. To unsubscribe or request deletion of your subscriber record, use the link in any email or contact us below.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">13. Contact Us</h2>
                <p className="mt-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="mt-4 space-y-2">
                  <li><strong className="font-semibold text-ink-900">Email:</strong> <span className="font-mono text-ink-700">global.jsuprememarketing@gmail.com</span></li>
                  <li><strong className="font-semibold text-ink-900">Phone:</strong> <span className="font-mono text-ink-700">658-218-2282</span></li>
                  <li><strong className="font-semibold text-ink-900">Address:</strong> Kingston, Jamaica</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
