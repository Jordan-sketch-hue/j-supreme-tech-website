'use client';

import { useState } from 'react';

export default function LegalPage() {
  const [tab, setTab] = useState<'terms' | 'privacy' | 'refunds' | 'disclaimer'>('terms');

  return (
    <main className="bg-white text-ink-900">
      <section className="py-20 md:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-5 text-4xl font-display font-semibold tracking-tight text-ink-900 md:text-5xl">
              Legal Center
            </h1>
            <p className="mt-4 font-mono text-sm text-ink-500">
              Effective Date: January 1, 2026 &nbsp;·&nbsp; Last Updated: July 16, 2026
            </p>
            <p className="mt-3 text-ink-600 leading-7">
              These policies govern all services rendered by J Supreme Tech (a division of J Supreme Conglomerate)
              on or after January 1, 2026. By engaging our services — including initiating contact, signing a
              proposal, making any payment, or receiving any deliverable — you agree to be bound by all terms below.
              This document is also available upon written request to{' '}
              <a href="mailto:hello@jsupremetech.online" className="underline underline-offset-4">hello@jsupremetech.online</a>.
            </p>

            {/* Tab bar */}
            <div className="mt-10 flex gap-1 rounded-lg border border-ink-200 p-1 w-fit">
              {(['terms', 'privacy', 'refunds', 'disclaimer'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                    tab === t
                      ? 'bg-ink-900 text-white'
                      : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {t === 'terms' ? 'Terms of Service' : t === 'privacy' ? 'Privacy Policy' : t === 'refunds' ? 'Payments & Refunds' : 'Disclaimer'}
                </button>
              ))}
            </div>

            <div className="mt-12 space-y-12 text-ink-700 leading-7">

              {/* ── TERMS OF SERVICE ── */}
              {tab === 'terms' && (
                <>
                  <Section title="1. Acceptance of Terms">
                    By accessing and using the J Supreme Tech website and services ("Services"), you accept and agree to be bound
                    by these Terms of Service ("Terms"). If you do not agree, do not use our Services. Engagement — including
                    verbal, written, or payment-based — constitutes acceptance regardless of whether a formal contract has been signed.
                  </Section>

                  <Section title="2. Description of Services">
                    J Supreme Tech provides technology solutions, software development, web design, digital marketing, consulting,
                    and related digital products and services. We reserve the right to modify, suspend, or discontinue any aspect
                    of our Services at any time without notice.
                  </Section>

                  <Section title="3. Payment Terms">
                    <p>All fees are due as outlined in your proposal, invoice, or service agreement. By making payment you acknowledge:</p>
                    <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                      <li>All quoted prices are in USD unless otherwise specified.</li>
                      <li>You are responsible for any applicable taxes, bank fees, or currency-conversion charges.</li>
                      <li>Retainer and recurring fees are billed on the agreed cycle and auto-renew until cancelled in writing.</li>
                      <li>Prices are subject to change with 30 days' notice for ongoing engagements.</li>
                    </ul>
                  </Section>

                  <Section title="4. Intellectual Property">
                    All content, code, graphics, trademarks, and deliverables produced by J Supreme Tech remain the intellectual
                    property of J Supreme Tech until payment is received in full. Upon full payment, client-specific deliverables
                    are licensed to the client for their stated purpose. We retain the right to display all work in our portfolio
                    unless otherwise agreed in writing.
                  </Section>

                  <Section title="5. Acceptable Use">
                    <p>You agree not to use our Services to:</p>
                    <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe on intellectual property rights of any party</li>
                      <li>Transmit harmful code, viruses, or malware</li>
                      <li>Engage in unauthorized access, scraping, or data mining</li>
                      <li>Harass, abuse, or harm others</li>
                      <li>Impersonate any person or entity</li>
                    </ul>
                  </Section>

                  <Section title="6. Third-Party Services">
                    Our Services may integrate with third-party platforms (Stripe, Supabase, Vercel, Meta, etc.). We are not
                    responsible for the content, uptime, or policies of third-party services. Your use of third-party integrations
                    is subject to their respective terms.
                  </Section>

                  <Section title="7. Termination">
                    We reserve the right to suspend or terminate your access to our Services at any time, with or without notice,
                    for any reason including violation of these Terms. Upon termination, outstanding balances remain due. No refund
                    shall be issued for work already performed.
                  </Section>

                  <Section title="8. Limitation of Liability">
                    To the maximum extent permitted by law, J Supreme Tech (a division of J Supreme Conglomerate) shall not be
                    liable for any indirect, incidental, consequential, or punitive damages — including lost revenue, data loss,
                    reputational harm, or business interruption — even if advised of the possibility of such damages. Our total
                    aggregate liability shall not exceed the fees paid by the client in the thirty (30) days preceding the claim.
                  </Section>

                  <Section title="9. No Warranty">
                    Services are provided &ldquo;as-is&rdquo; and &ldquo;as-available.&rdquo; We make no guarantees of specific
                    outcomes including but not limited to search engine rankings, social media growth, revenue increases, App Store
                    or Play Store approval, uptime guarantees for third-party platforms, or any return on investment.
                  </Section>

                  <Section title="10. Indemnification">
                    You agree to indemnify, defend, and hold harmless J Supreme Tech and its officers, directors, employees, and
                    agents from any claims, liabilities, damages, losses, and expenses — including reasonable legal fees — arising
                    from your use of our Services, your violation of these Terms, or any content you provide to us.
                  </Section>

                  <Section title="11. Governing Law & Dispute Resolution">
                    These Terms are governed by the laws of Jamaica. Any dispute shall first be submitted to good-faith
                    negotiation. If unresolved within 30 days, disputes shall be resolved by binding arbitration in Kingston,
                    Jamaica. You waive any right to a jury trial or class action in connection with any dispute arising from
                    these Terms.
                  </Section>

                  <Section title="12. Severability & Entire Agreement">
                    If any provision of these Terms is found unenforceable, it shall be modified to the minimum extent necessary
                    to make it enforceable; all remaining provisions remain in full force. These Terms, together with any signed
                    proposal or service agreement, constitute the entire agreement between the parties and supersede all prior
                    understandings.
                  </Section>

                  <ContactBlock />
                </>
              )}

              {/* ── PAYMENTS & REFUNDS ── */}
              {tab === 'refunds' && (
                <>
                  <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-5">
                    <p className="font-semibold text-red-900 text-sm uppercase tracking-widest mb-2">Important — Read Before Paying</p>
                    <p className="text-red-800">
                      All deposits, retainer payments, and project fees paid to J Supreme Tech are <strong>non-refundable</strong>.
                      Payment constitutes unconditional acceptance of scope and these terms.
                    </p>
                  </div>

                  <Section title="1. Non-Refundable Deposits">
                    All deposits are non-refundable under any circumstances. Deposits secure your project slot and cover initial
                    scoping, research, and planning work performed prior to full project kickoff. By paying a deposit you
                    acknowledge that this work begins immediately and that the deposit cannot be recovered if you later cancel,
                    change direction, or fail to provide required materials.
                  </Section>

                  <Section title="2. Project Fees & Retainers">
                    <p>All project fees and monthly retainer payments are non-refundable. Specifically:</p>
                    <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                      <li>Partial deliveries do not entitle the client to a refund of any amount paid.</li>
                      <li>In the event of client-initiated cancellation at any stage, all fees paid remain with J Supreme Tech as compensation for time, resources, and opportunity cost.</li>
                      <li>If a project is paused by the client for more than 30 days without written notice, it may be treated as cancelled and remaining balance may become due.</li>
                      <li>Retainers cancelled mid-cycle are not prorated; the full cycle amount is retained.</li>
                    </ul>
                  </Section>

                  <Section title="3. Digital Products & E-books">
                    All digital product sales (e-books, templates, toolkits, courses) are final and non-refundable once the
                    download link or access credentials have been issued. Because digital goods are delivered electronically and
                    cannot be physically returned, no refund will be issued except where a file is defective and we are unable to
                    provide a working replacement within 72 hours.
                  </Section>

                  <Section title="4. Subscriptions">
                    Subscription services (SaaS products, Supreme Suite, monthly retainers) automatically renew at the end of
                    each billing period. You may cancel at any time before the next renewal date. Cancellation stops future
                    charges; it does not trigger a refund for the current period already billed.
                  </Section>

                  <Section title="5. Chargebacks & Disputes">
                    Initiating a chargeback or payment dispute in lieu of contacting us first is considered a breach of these
                    Terms. We reserve the right to suspend all services immediately upon notification of a chargeback and to
                    pursue recovery of the disputed amount plus any associated fees. We encourage clients to contact us at{' '}
                    <a href="mailto:hello@jsupremetech.online" className="underline underline-offset-4">hello@jsupremetech.online</a>{' '}
                    before escalating to their payment provider.
                  </Section>

                  <Section title="6. Exceptions">
                    Refunds may only be considered — at our sole discretion — in cases where J Supreme Tech has not commenced
                    any work and the client cancels in writing within 48 hours of payment. No exceptions apply beyond this window.
                  </Section>

                  <Section title="7. Privacy of Financial Data">
                    Payment processing is handled by our payment processors (Stripe, WiPay, or other providers). J Supreme Tech
                    does not store your card number or full payment credentials. All financial data is subject to our Privacy
                    Policy and to the respective processor's terms.
                  </Section>

                  <ContactBlock />
                </>
              )}

              {/* ── PRIVACY POLICY ── */}
              {tab === 'privacy' && (
                <>
                  <Section title="1. Introduction">
                    J Supreme Tech ("we," "our," or "us") is committed to protecting your personal information. This Privacy
                    Policy explains how we collect, use, disclose, and safeguard information when you visit our website or
                    engage our services. This policy is available at jsupremetech.online/legal and upon written request.
                  </Section>

                  <Section title="2. Information We Collect">
                    <p>Information you provide directly:</p>
                    <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                      <li>Name, email address, and phone number</li>
                      <li>Payment and billing information (processed by third-party providers — we do not store card details)</li>
                      <li>Account credentials</li>
                      <li>Communications, proposals, and project briefs</li>
                    </ul>
                    <p className="mt-4">Information collected automatically:</p>
                    <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                      <li>IP address, browser type, pages visited, time on site</li>
                      <li>Device and OS information</li>
                      <li>Cookies and analytics data (Vercel Analytics, Google AdSense)</li>
                    </ul>
                  </Section>

                  <Section title="3. How We Use Your Information">
                    <ul className="list-disc space-y-2 pl-6 marker:text-ink-400">
                      <li>Deliver and improve our services</li>
                      <li>Process payments and send invoices</li>
                      <li>Send project updates and support communications</li>
                      <li>Send marketing emails (with your consent; unsubscribe any time)</li>
                      <li>Comply with legal obligations</li>
                      <li>Detect and prevent fraud</li>
                    </ul>
                  </Section>

                  <Section title="4. Google AdSense & Affiliate Links">
                    We use Google AdSense on editorial pages. AdSense uses cookies to serve personalized ads. You may opt out
                    at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Google Ads Settings</a>.
                    We also use a small number of affiliate links on editorial pages; if you click and purchase, we may earn a
                    commission at no cost to you. See our <a href="/legal#disclosure" className="underline underline-offset-4">Disclosure</a> for full details.
                    We do not run ads or affiliate links on pricing or checkout pages.
                  </Section>

                  <Section title="5. Data Sharing">
                    <p>We may share your information with:</p>
                    <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                      <li><strong className="font-semibold text-ink-900">Service Providers:</strong> Supabase (database), Resend (email), Stripe/WiPay (payments), Vercel (hosting)</li>
                      <li><strong className="font-semibold text-ink-900">Legal Requirements:</strong> When required by law or to protect our rights</li>
                      <li><strong className="font-semibold text-ink-900">Business Transfers:</strong> In connection with any merger or acquisition</li>
                    </ul>
                    <p className="mt-4">We never sell, rent, or trade your personal data to third parties for their marketing purposes.</p>
                  </Section>

                  <Section title="6. Email Marketing">
                    We operate on a double opt-in basis. After subscribing you receive a confirmation link; you are only added
                    to our list once you confirm. Every email includes a one-click unsubscribe. We comply with CAN-SPAM, CASL,
                    and GDPR where applicable. Email is handled by <span className="font-mono text-ink-700">Resend</span>;
                    subscriber records are stored in <span className="font-mono text-ink-700">Supabase</span>.
                  </Section>

                  <Section title="7. Data Security">
                    We implement industry-standard technical and organizational security measures. No transmission over the
                    internet is 100% secure. We cannot guarantee absolute security but commit to prompt notification of any
                    breach affecting your data.
                  </Section>

                  <Section title="8. Your Rights">
                    <p>You may request to:</p>
                    <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-ink-400">
                      <li>Access a copy of your personal data</li>
                      <li>Correct inaccurate data</li>
                      <li>Request deletion of your data</li>
                      <li>Withdraw marketing consent at any time</li>
                    </ul>
                    <p className="mt-4">Submit requests to <a href="mailto:hello@jsupremetech.online" className="underline underline-offset-4">hello@jsupremetech.online</a>.</p>
                  </Section>

                  <Section title="9. Children's Privacy">
                    Our Services are not directed to children under 13. We do not knowingly collect personal information from
                    children under 13.
                  </Section>

                  <Section title="10. Policy Updates">
                    We may update this Privacy Policy at any time. The "Last Updated" date at the top of this page reflects
                    the most recent revision. Continued use of our Services after an update constitutes acceptance.
                  </Section>

                  <ContactBlock />
                </>
              )}

              {/* ── DISCLAIMER ── */}
              {tab === 'disclaimer' && (
                <>
                  <Section title="1. General Disclaimer">
                    The information provided on jsupremetech.online — including blog posts, e-books, case studies, marketing
                    materials, and service descriptions — is for general informational and educational purposes only. It does not
                    constitute professional legal, financial, accounting, or investment advice. Always seek the advice of a
                    qualified professional before acting on any information found on this site.
                  </Section>

                  <Section title="2. Results Disclaimer">
                    Any results, testimonials, case studies, or income figures referenced on this website are not guarantees
                    of future performance. Individual results will vary based on market conditions, client execution, industry,
                    budget, and many other factors outside our control. No specific outcome is promised or implied.
                  </Section>

                  <Section title="3. App Store & Platform Approvals">
                    J Supreme Tech does not guarantee approval of any application, listing, or account on third-party platforms
                    including but not limited to Apple App Store, Google Play Store, Meta Business Suite, Google Ads, or any
                    other marketplace. Approval decisions are made solely by those platforms and are beyond our control.
                    Fees paid for development or submission are non-refundable regardless of platform decision.
                  </Section>

                  <Section title="4. Third-Party Links">
                    This website may contain links to external sites. J Supreme Tech is not responsible for the accuracy,
                    content, privacy practices, or availability of any third-party website. Links do not constitute endorsement.
                  </Section>

                  <Section title="5. Accuracy of Information">
                    While we strive to keep all information on this site current and accurate, we make no representations or
                    warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability
                    of any information, products, services, or related graphics. Any reliance is strictly at your own risk.
                  </Section>

                  <Section title="6. Advertising & Affiliate Disclosure">
                    This site participates in affiliate programs and displays Google AdSense advertisements on editorial pages.
                    We may earn commissions on qualifying purchases at no additional cost to you. All advertising relationships
                    are disclosed in accordance with FTC guidelines. Sponsored content is clearly labelled. We only recommend
                    products and tools we have evaluated and would use ourselves.
                  </Section>

                  <ContactBlock />
                </>
              )}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <section>
        <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">{title}</h2>
        <div className="mt-4">{children}</div>
      </section>
      <div className="hairline" />
    </>
  );
}

function ContactBlock() {
  return (
    <section>
      <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">Contact</h2>
      <p className="mt-4">For legal inquiries, data requests, or to obtain a copy of this policy:</p>
      <ul className="mt-4 space-y-2">
        <li><strong className="font-semibold text-ink-900">Email:</strong> <span className="font-mono text-ink-700">hello@jsupremetech.online</span></li>
        <li><strong className="font-semibold text-ink-900">Phone:</strong> <span className="font-mono text-ink-700">(658) 218-2282</span></li>
        <li><strong className="font-semibold text-ink-900">Address:</strong> Kingston, Jamaica</li>
      </ul>
    </section>
  );
}
