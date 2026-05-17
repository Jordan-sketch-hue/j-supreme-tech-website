"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Services", "#services"],
  ["Architecture", "#architecture"],
  ["Work", "#work"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/72 text-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/#home" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A855F7]/35 bg-[#7B2FFF]/15 shadow-[0_0_35px_rgba(123,47,255,0.25)]">
            <span className="text-sm font-black tracking-tight text-white">JS</span>
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-black uppercase tracking-[0.18em] text-white">J Supreme</span>
            <span className="block text-xs font-bold uppercase tracking-[0.22em] text-[#A855F7]">Tech Systems</span>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <Link key={label} href={`/${href}`} className="text-sm font-semibold text-[#B3B3B3] hover:text-white">
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="https://wa.me/16582182282" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-white hover:border-[#00D26A]/50">
            <MessageCircle className="h-4 w-4 text-[#00D26A]" />
            WhatsApp
          </a>
          <Link href="/#contact" className="premium-button rounded-xl px-5 py-2.5 text-sm font-bold text-white">
            Start a Project
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] lg:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileMenuOpen ? (
        <div className="border-t border-white/10 bg-[#050505] px-6 py-4 lg:hidden">
          <div className="space-y-1">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={`/${href}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#B3B3B3] hover:bg-white/[0.05] hover:text-white"
              >
                {label}
              </Link>
            ))}
            <a
              href="https://wa.me/16582182282"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#00D26A]/30 bg-[#00D26A]/10 px-4 py-3 text-sm font-bold text-white"
            >
              <MessageCircle className="h-4 w-4 text-[#00D26A]" />
              WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
