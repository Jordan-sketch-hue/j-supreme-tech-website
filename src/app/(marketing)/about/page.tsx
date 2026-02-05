export const metadata = {
  title: 'About - J Supreme Tech',
  description: 'Learn about J Supreme Tech mission and values',
};

export default function AboutPage() {
  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900">About J Supreme Tech</h1>

          <div className="mt-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 text-lg text-gray-600">
                To empower businesses with intelligent, scalable technology solutions that
                drive growth, efficiency, and innovation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              <p className="mt-4 text-lg text-gray-600">
                A world where technology is intuitive, accessible, and transforms how
                organizations operate. We believe that supreme engineering means building
                for simplicity, reliability, and impact.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  {
                    title: 'Excellence',
                    description: 'We never compromise on quality or performance',
                  },
                  {
                    title: 'Innovation',
                    description:
                      'We continuously push boundaries and explore new possibilities',
                  },
                  {
                    title: 'Reliability',
                    description: 'Our systems are built to scale and perform under pressure',
                  },
                  {
                    title: 'Transparency',
                    description: 'We believe in honest communication with our customers',
                  },
                ].map((value) => (
                  <div key={value.title} className="rounded-lg border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900">{value.title}</h3>
                    <p className="mt-2 text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
              <p className="mt-4 text-lg text-gray-600">
                Founded in 2024, J Supreme Tech emerged from a simple belief: that
                businesses deserved better tools. Our founding team saw the gap between
                traditional software and what the modern enterprise needed—intelligent,
                scalable, and built for the future.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Today, we partner with hundreds of companies globally, helping them
                automate, scale, and innovate. Our team of engineers, designers, and
                product experts are committed to delivering excellence in every solution
                we build.
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-8">
              <h2 className="text-2xl font-bold text-gray-900">Join Our Team</h2>
              <p className="mt-4 text-gray-600">
                We're always looking for talented engineers, designers, and product
                professionals who share our passion for excellence.
              </p>
              <button className="mt-6 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700">
                View Open Positions
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
