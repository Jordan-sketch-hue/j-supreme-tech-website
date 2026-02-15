export const metadata = {
  title: 'Disclaimer - J Supreme Tech',
  description: 'Legal disclaimer for J Supreme Tech website and services',
};

export default function DisclaimerPage() {
  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900">Disclaimer</h1>
          <p className="mt-4 text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="mt-12 space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900">Website Disclaimer</h2>
              <p className="mt-4">
                The information provided by J Supreme Tech ("we," "us," or "our") on this website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">External Links Disclaimer</h2>
              <p className="mt-4">
                This website may contain links to external websites that are not provided or maintained by or in any way affiliated with J Supreme Tech. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Professional Disclaimer</h2>
              <p className="mt-4">
                The content on this website is provided for general information purposes only and should not be considered as professional advice. We recommend that you consult with appropriate professionals before acting on any information provided on this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Testimonials Disclaimer</h2>
              <p className="mt-4">
                Any testimonials, case studies, or examples shown on this website are based on individual experiences and results may vary. We do not guarantee that you will achieve similar results or outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Technical Information Disclaimer</h2>
              <p className="mt-4">
                While we strive to provide accurate technical information and solutions, technology is constantly evolving. The information provided may become outdated, and we do not commit to updating all content to reflect the latest developments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Affiliate Disclaimer</h2>
              <p className="mt-4">
                This website may contain affiliate links to products or services. We may receive a commission for purchases made through these links at no additional cost to you. We only recommend products and services that we believe will provide value to our users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Advertising Disclaimer</h2>
              <p className="mt-4">
                This website uses Google AdSense to display advertisements. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. These ads are not endorsed by J Supreme Tech unless explicitly stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Errors and Omissions Disclaimer</h2>
              <p className="mt-4">
                While we have made every attempt to ensure that the information contained in this website has been obtained from reliable sources, J Supreme Tech is not responsible for any errors or omissions or for the results obtained from the use of this information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Fair Use Disclaimer</h2>
              <p className="mt-4">
                This website may use copyrighted material which has not always been specifically authorized by the copyright owner. We believe this constitutes a "fair use" of any such copyrighted material as provided for in copyright law. If you wish to use copyrighted material from this site for purposes that go beyond "fair use," you must obtain permission from the copyright owner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Views Expressed Disclaimer</h2>
              <p className="mt-4">
                The website may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of J Supreme Tech. Any content provided by our bloggers or authors are of their opinion and are not intended to malign any religion, ethnic group, club, organization, company, individual, or anyone or anything.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">No Guarantees Disclaimer</h2>
              <p className="mt-4">
                We do not guarantee any specific results from using our services or following advice on this website. Your success depends on many factors including your background, dedication, motivation, and business savvy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Liability Disclaimer</h2>
              <p className="mt-4">
                Under no circumstance shall J Supreme Tech have any liability to you for any loss or damage of any kind incurred as a result of the use of this website or reliance on any information provided on the website. Your use of the website and your reliance on any information on the website is solely at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Changes to This Disclaimer</h2>
              <p className="mt-4">
                We reserve the right to update or modify this Disclaimer at any time without prior notice. Your continued use of this website after any changes indicates your acceptance of the modified Disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              <p className="mt-4">
                If you have any questions about this Disclaimer, please contact us:
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
