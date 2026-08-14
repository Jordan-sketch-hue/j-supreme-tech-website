"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const NAV = [
  { label: "Work", href: "/#work" },
  {
    label: "Solutions",
    children: [
      { label: "Websites", href: "/solutions/websites" },
      { label: "Web Apps", href: "/solutions/web-apps" },
      { label: "Mobile Apps", href: "/solutions/mobile-apps" },
      { label: "CRMs", href: "/solutions/crms" },
      { label: "E-Commerce", href: "/solutions/ecommerce" },
      { label: "Booking Systems", href: "/solutions/booking-systems" },
      { label: "Automation", href: "/solutions/automation" },
      { label: "AI Systems", href: "/solutions/ai-systems" },
      { label: "Marketing & Creative", href: "/solutions/marketing-creative" },
    ],
  },
  {
    label: "Products",
    children: [
      { label: "Supreme Suite", href: "/products" },
      { label: "AXIOM", href: "/axiom" },
      { label: "Ready-Made Systems", href: "/products#ready-made" },
      { label: "Shop", href: "/gumroad" },
    ],
  },
  {
    label: "Insights",
    children: [
      { label: "The Signal", href: "/blog" },
      { label: "Library", href: "/library" },
      { label: "Market", href: "/market" },
    ],
  },
  {
    label: "Studio",
    children: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/#contact" },
      { label: "Sign In", href: "/login" },
    ],
  },
];

function Dropdown({
  label,
  children,
}: {
  label: string;
  children: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="nav-link flex items-center gap-1"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/95 py-1.5 shadow-2xl backdrop-blur-xl">
          {/* spectrum top accent */}
          <div className="h-[2px] w-full" style={{ background: "var(--sp-h)" }} />
          {children.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-xl"
          : "bg-[#080808]"
      }`}
    >
      <nav className="shell flex items-center justify-between py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[0.62rem] font-bold tracking-tight text-black font-mono">
            JST
          </span>
          <span className="hidden sm:block leading-none">
            <span className="block font-display text-[0.82rem] font-semibold tracking-tight text-white">
              J Supreme Tech
            </span>
            <span className="mt-0.5 block font-mono text-[0.5rem] font-medium uppercase tracking-[0.2em] text-white/35">
              Creative Technology
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <Dropdown key={item.label} label={item.label} children={item.children} />
            ) : (
              <Link key={item.label} href={item.href!} className="nav-link">
                {item.label}
              </Link>
            ),
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#contact"
            className="relative overflow-hidden rounded-full bg-white px-5 py-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] text-black transition-all hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Start a Project →
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* spectrum bottom line */}
      <div className="h-[4px] w-full flex-none" style={{ background: "var(--sp-h)" }} />

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/10 bg-[#080808] px-6 py-4 lg:hidden">
          <div className="space-y-0.5">
            {NAV.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <p className="px-3 pb-1 pt-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/30">
                      {item.label}
                    </p>
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-white/70 hover:bg-white/5 hover:text-white"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full bg-white py-3 text-center font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] text-black"
              >
                Start a Project →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
