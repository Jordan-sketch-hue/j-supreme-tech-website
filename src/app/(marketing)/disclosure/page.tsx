import Link from "next/link";

export const metadata = {
  title: "Advertising & Affiliate Disclosure — J Supreme Tech",
  description:
    "How J Supreme Tech uses display advertising and affiliate links on The Signal, and how that affects you.",
  alternates: { canonical: "/disclosure" },
};

export default function DisclosurePage() {
  return (
    <main className="bg-white text-ink-900">
      <section className="py-20 md:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-5 text-4xl font-display font-semibold tracking-tight text-ink-900 md:text-5xl">
              Advertising &amp; Affiliate Disclosure
            </h1>
            <p className="mt-4 font-mono text-sm text-ink-500">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <div className="mt-12 space-y-12 text-ink-700 leading-7">
              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">
                  Plain-English summary
                </h2>
                <p className="mt-4">
                  Some pages on this site — primarily our editorial blog, <em>The Signal</em>, and our
                  free Library — carry advertising and a small number of affiliate links. Our paid
                  services, pricing, and product pages do not. We keep monetization off the parts of the
                  site where you make buying decisions about working with us.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">
                  Display advertising (Google AdSense)
                </h2>
                <p className="mt-4">
                  We use Google AdSense to display ads on editorial pages. Google and its partners may
                  use cookies to serve ads based on your prior visits to this and other websites. You can
                  opt out of personalized advertising at any time via{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline decoration-ink-300 underline-offset-4 hover:decoration-ink-900"
                  >
                    Google Ad Settings
                  </a>
                  , or learn more at{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline decoration-ink-300 underline-offset-4 hover:decoration-ink-900"
                  >
                    Google&apos;s advertising policies
                  </a>
                  . If you decline cookies in our banner, we request non-personalized ads instead.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">
                  Affiliate links
                </h2>
                <p className="mt-4">
                  Some outbound links to third-party tools are affiliate links. If you click one and sign
                  up or make a purchase, J Supreme Tech may earn a commission &mdash; at no additional cost
                  to you. We only recommend products and services we genuinely use to build and operate our
                  own systems and our clients&apos;. A recommendation is never paid placement; the commission
                  does not change our editorial opinion, and we disclose affiliate blocks wherever they appear.
                </p>
              </section>

              <div className="hairline" />

              <section>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink-900">
                  Questions
                </h2>
                <p className="mt-4">
                  For anything about advertising or partnerships on this site, see our{" "}
                  <Link href="/privacy" className="underline decoration-ink-300 underline-offset-4 hover:decoration-ink-900">
                    Privacy Policy
                  </Link>{" "}
                  or reach us via the{" "}
                  <Link href="/contact" className="underline decoration-ink-300 underline-offset-4 hover:decoration-ink-900">
                    contact page
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
