export const metadata = {
  title: 'Terms of Service - J Supreme Tech',
  description: 'Terms of Service for J Supreme Tech website and services',
};

export default function TermsPage() {
  return (
    <main className="bg-white text-ink-900">
      <section className="py-20 md:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-5 text-4xl font-display font-semibold tracking-tight text-ink-900 md:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 font-mono text-sm text-ink-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="mt-12 space-y-12 text-ink-700 leading-7">
              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">1. Acceptance of Terms</h2>
                <p className="mt-4">
                  By accessing and using the J Supreme Tech website and services ("Services"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">2. Description of Services</h2>
                <p className="mt-4">
                  J Supreme Tech provides technology solutions, software development, consulting services, and related digital products. We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time without notice.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">3. User Accounts</h2>
                <p className="mt-4">
                  To access certain features of our Services, you may be required to create an account. You agree to:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">4. Acceptable Use</h2>
                <p className="mt-4">
                  You agree not to use our Services to:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful code, viruses, or malware</li>
                  <li>Engage in unauthorized access or data mining</li>
                  <li>Harass, abuse, or harm others</li>
                  <li>Impersonate any person or entity</li>
                  <li>Interfere with or disrupt our Services</li>
                  <li>Collect user information without consent</li>
                </ul>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">5. Intellectual Property</h2>
                <p className="mt-4">
                  All content, features, and functionality of our Services, including but not limited to text, graphics, logos, software, and trademarks, are the exclusive property of J Supreme Tech or its licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p className="mt-4">
                  You may not copy, modify, distribute, sell, or lease any part of our Services without our express written permission.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">6. Payment Terms</h2>
                <p className="mt-4">
                  If you purchase services or products from us:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                  <li>You agree to pay all fees and charges as described at the time of purchase</li>
                  <li>All payments are processed securely through our payment processor</li>
                  <li>Prices are subject to change with notice</li>
                  <li>You are responsible for any applicable taxes</li>
                  <li>Refunds are subject to our refund policy</li>
                </ul>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">7. Subscriptions and Renewals</h2>
                <p className="mt-4">
                  Subscription services automatically renew at the end of each billing period unless you cancel before the renewal date. You authorize us to charge your payment method for recurring subscription fees.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">8. Cancellation and Refunds</h2>
                <p className="mt-4">
                  You may cancel your subscription at any time through your account settings. Refunds are provided in accordance with our refund policy and applicable consumer protection laws. Services purchased on a one-time basis are generally non-refundable unless otherwise stated.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">9. Third-Party Services and Links</h2>
                <p className="mt-4">
                  Our Services may contain links to third-party websites or integrate with third-party services. We are not responsible for the content, privacy policies, or practices of any third-party sites. Your use of third-party services is at your own risk.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">10. Disclaimer of Warranties</h2>
                <p className="mt-4">
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p className="mt-4">
                  We do not warrant that our Services will be uninterrupted, error-free, or completely secure.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">11. Limitation of Liability</h2>
                <p className="mt-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, J SUPREME TECH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES.
                </p>
                <p className="mt-4">
                  Our total liability shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">12. Indemnification</h2>
                <p className="mt-4">
                  You agree to indemnify, defend, and hold harmless J Supreme Tech and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your use of our Services or violation of these Terms.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">13. Termination</h2>
                <p className="mt-4">
                  We reserve the right to suspend or terminate your access to our Services at any time, with or without notice, for any reason, including violation of these Terms. Upon termination, your right to use our Services will immediately cease.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">14. Governing Law</h2>
                <p className="mt-4">
                  These Terms shall be governed by and construed in accordance with the laws of Jamaica, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Kingston, Jamaica.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">15. Dispute Resolution</h2>
                <p className="mt-4">
                  Any disputes arising from these Terms or your use of our Services shall first be resolved through good faith negotiations. If negotiations fail, disputes may be resolved through binding arbitration or in the courts of Jamaica.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">16. Changes to Terms</h2>
                <p className="mt-4">
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of our Services after changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">17. Severability</h2>
                <p className="mt-4">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">18. Entire Agreement</h2>
                <p className="mt-4">
                  These Terms constitute the entire agreement between you and J Supreme Tech regarding your use of our Services and supersede all prior agreements and understandings.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">19. E-books &amp; Digital Products</h2>
                <p className="mt-4">
                  Our Library offers digital e-books for purchase. By buying an e-book you acknowledge and agree that:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                  <li>Your purchase grants a <strong className="font-semibold text-ink-900">single-user, non-exclusive, non-transferable license</strong> for your personal or internal business use. You may not resell, redistribute, share, sub-license, publicly post, or otherwise make available the file or its download link.</li>
                  <li>E-books are <strong className="font-semibold text-ink-900">delivered electronically</strong> via a secure, time-limited download link sent to the email you provide, after payment has been received and confirmed. Orders paid by bank transfer are fulfilled once the transfer clears.</li>
                  <li>Because digital goods are delivered electronically and cannot be returned, <strong className="font-semibold text-ink-900">all e-book sales are final and non-refundable</strong> once the download link has been issued, except where a refund is required by applicable law or where a file is defective and we are unable to provide a working copy.</li>
                  <li>Prices are listed in <strong className="font-semibold text-ink-900">US dollars (USD)</strong> unless stated otherwise. You are responsible for any bank, transfer, or currency-conversion fees and any applicable taxes.</li>
                  <li>E-book content is provided for general informational and educational purposes only (see our <a href="/disclaimer" className="underline hover:text-ink-600">Disclaimer</a>). We retain all intellectual-property rights in the e-books and their contents.</li>
                </ul>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">20. Contact Information</h2>
                <p className="mt-4">
                  If you have any questions about these Terms of Service, please contact us:
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
