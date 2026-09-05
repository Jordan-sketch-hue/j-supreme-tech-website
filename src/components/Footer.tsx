import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { NewsletterCompact } from "@/components/newsletter/forms";

const explore: [string, string][] = [
  ["Work", "/#work"],
  ["Services", "/services"],
  ["SAAS Supreme Suite", "/products"],
  ["Newsletter", "/blog"],
  ["Ebooks", "/library"],
  ["Market & Competition", "/market"],
  ["About", "/about"],
  ["Contact Us", "/contact"],
];

const legal: [string, string][] = [
  ["Legal Center", "/legal"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Disclaimer", "/disclaimer"],
  ["Disclosure", "/disclosure"],
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="shell relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[0.72rem] font-bold tracking-tight text-ink-950 font-mono">
                JST
              </span>
              <div className="leading-tight">
                <h3 className="font-display text-lg font-semibold">
                  J Supreme Tech
                </h3>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/55">
                  Creative Technology &amp; Digital Systems
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
              Digital Solutions. Real Growth. We design and build websites, apps,
              CRMs, booking engines, e-commerce platforms, automations, and
              scalable digital infrastructure — in a clean black-and-white house
              style.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://wa.me/16582182282"
                target="_blank"
                rel="noreferrer"
                className="btn btn-on-dark"
              >
                <MessageCircle className="h-4 w-4" />
                Start on WhatsApp
              </a>
            </div>

            <div className="mt-8 max-w-sm rounded-2xl border border-white/12 bg-white/[0.03] p-5">
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/55">
                The Communications Debrief
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Tech, marketing &amp; the markets — one clean dispatch from the studio. Join free.
              </p>
              <div className="mt-4">
                <NewsletterCompact />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/45">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {explore.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/45">
              Contact Us
            </h4>
            <div className="mt-5 space-y-4 text-sm">
              <a
                href="https://wa.me/16582182282"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                658-218-2282
              </a>
              <a
                href="mailto:global.jsuprememarketing@gmail.com"
                className="flex items-start gap-3 break-all text-white/70 hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 flex-none" />
                global.jsuprememarketing@gmail.com
              </a>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">
                Jamaica · Caribbean · Worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono uppercase tracking-[0.14em]">
            &copy; 2026 J Supreme Tech
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {legal.map(([label, href]) => (
              <Link key={label} href={href} className="font-mono uppercase tracking-[0.14em] hover:text-white">
                {label}
              </Link>
            ))}
          </div>
          <p className="font-mono uppercase tracking-[0.14em]">
            100+ clients served worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
