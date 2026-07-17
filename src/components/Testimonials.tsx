import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";

const TESTIMONIALS = [
  {
    quote: "The platform they built for us handles bookings, payments, and driver dispatch — all in one system. We went live in weeks.",
    author: "BP Couriers",
    role: "Logistics Platform",
  },
  {
    quote: "J Supreme Tech didn't just build a website — they built our entire digital operation. CRM, admin panel, client portal. Everything connected.",
    author: "Ferguson Law",
    role: "Law Firm · Kingston, JA",
  },
  {
    quote: "Our social media presence transformed completely. The content system they built posts daily and drives real traffic to our programmes.",
    author: "The Language Cradle",
    role: "Education Institute",
  },
  {
    quote: "Professional, fast, and they actually understand Caribbean business. The site was live in under two weeks.",
    author: "Aboo Tours",
    role: "Tourism & Transfers",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-line bg-ink-50/40 py-20 md:py-28">
      <div className="shell">
        <div className="mb-12 text-center">
          <Reveal>
            <span className="eyebrow no-rule justify-center">Client feedback</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Built for real businesses.
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" amount={0.08}>
          {TESTIMONIALS.map((t, i) => (
            <RevealItem key={i}>
              <div className="card flex h-full flex-col p-6">
                <p className="flex-1 text-sm leading-relaxed text-ink-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-display text-sm font-semibold text-ink-900">{t.author}</p>
                  <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-400">{t.role}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
