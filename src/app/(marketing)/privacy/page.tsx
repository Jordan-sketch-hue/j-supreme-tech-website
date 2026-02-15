export const metadata = {
  title: 'Privacy Policy - J Supreme Tech',
  description: 'Privacy Policy for J Supreme Tech website and services',
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-4 text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="mt-12 space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
              <p className="mt-4">
                Welcome to J Supreme Tech ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
              <p className="mt-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Name and contact information (email address, phone number)</li>
                <li>Payment and billing information</li>
                <li>Account credentials</li>
                <li>Communications with us</li>
                <li>Any other information you choose to provide</li>
              </ul>
              <p className="mt-4">
                We also automatically collect certain information when you visit our website:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information</li>
                <li>Cookies and similar technologies</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
              <p className="mt-4">
                We use the information we collect to:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
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

            <section>
              <h2 className="text-2xl font-bold text-gray-900">4. Google AdSense</h2>
              <p className="mt-4">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet.
              </p>
              <p className="mt-4">
                You may opt out of personalized advertising by visiting{' '}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Ads Settings
                </a>
                {' '}or{' '}
                <a 
                  href="http://www.aboutads.info/choices/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  www.aboutads.info
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">5. Cookies and Tracking Technologies</h2>
              <p className="mt-4">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
              </p>
              <p className="mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">6. Data Sharing and Disclosure</h2>
              <p className="mt-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>With Your Consent:</strong> With your explicit permission for other purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">7. Data Security</h2>
              <p className="mt-4">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">8. Your Privacy Rights</h2>
              <p className="mt-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">9. Children's Privacy</h2>
              <p className="mt-4">
                Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">10. International Data Transfers</h2>
              <p className="mt-4">
                Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">11. Changes to This Privacy Policy</h2>
              <p className="mt-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">12. Contact Us</h2>
              <p className="mt-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="mt-4 space-y-2">
                <li><strong>Email:</strong> global.jsuprememarketing@gmail.com</li>
                <li><strong>Phone:</strong> 658-218-2282</li>
                <li><strong>Address:</strong> Kingston, Jamaica</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
