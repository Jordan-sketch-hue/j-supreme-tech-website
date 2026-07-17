"use client";

import Link from "next/link";
import { Menu, MessageCircle, Moon, Sun, X } from "lucide-react";
import { useState, useEffect } from "react";

function DarkToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("jst-theme");
    if (stored === "dark") { setDark(true); document.documentElement.setAttribute("data-theme", "dark"); }
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("jst-theme", next ? "dark" : "light");
  };
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-500 hover:text-ink-900 hover:border-ink-900 transition-colors"
    >
      {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </button>
  );
}

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "services#services" },
  { label: "SaaS", href: "products" },
  { label: "Blog", href: "blog" },
  { label: "E-Books", href: "library" },
  { label: "Pricing", href: "pricing" },
  { label: "Market", href: "market" },
  { label: "About", href: "about" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white/80 backdrop-blur-xl">
      <nav className="shell flex items-center justify-between py-3.5">
        <Link
          href="/#home"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-900 text-[0.7rem] font-bold tracking-tight text-white font-mono">
            JST
          </span>
          <span className="leading-none">
            <span className="block font-display text-sm font-semibold tracking-tight text-ink-900">
              J Supreme Tech
            </span>
            <span className="mt-0.5 block font-mono text-[0.55rem] font-medium uppercase tracking-[0.2em] text-ink-400">
              Creative Technology
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex xl:gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={`/${link.href}`}
              className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-600 hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <DarkToggle />
          <Link
            href="/login"
            className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-600 hover:text-ink-900"
          >
            Sign in
          </Link>
          <Link href="/#contact" className="btn btn-dark">
            Start a Project
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-ink-900 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-line bg-white px-6 py-4 lg:hidden">
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={`/${link.href}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-700 hover:bg-ink-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-700 hover:bg-ink-100"
            >
              Sign in
            </Link>
            <div className="grid grid-cols-2 gap-2 pt-3">
              <a
                href="https://wa.me/16582182282"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="btn btn-dark"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
