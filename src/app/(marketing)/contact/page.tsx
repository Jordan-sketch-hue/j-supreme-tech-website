export const metadata = {
  title: 'Contact - J Supreme Tech',
  description: 'Get in touch with the J Supreme Tech team',
};

export default function ContactPage() {
  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions? Our team is ready to help.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Contact Form */}
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Company
                  </label>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Tell us about your project"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <p className="mt-2 text-gray-600">hello@jsupreme.tech</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                <p className="mt-2 text-gray-600">+1 (555) 123-4567</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Office</h3>
                <p className="mt-2 text-gray-600">
                  123 Tech Street
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Hours</h3>
                <p className="mt-2 text-gray-600">
                  Monday - Friday: 9am - 6pm PST
                  <br />
                  Saturday & Sunday: Closed
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="font-semibold text-gray-900">Want a quick call?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Schedule a 30-minute consultation with our team.
                </p>
                <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
