import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

const links = [
  ["Services", "/#services"],
  ["Systems Architecture", "/#architecture"],
  ["Work / Demos", "/#work"],
  ["Process", "/#process"],
  ["Pricing", "/#pricing"],
  ["Contact", "/#contact"],
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A855F7]/35 bg-[#7B2FFF]/15">
                <span className="text-sm font-black">JS</span>
              </div>
              <div>
                <h3 className="text-lg font-black">J Supreme Tech</h3>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A855F7]">Creative Technology & Digital Systems</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#B3B3B3]">
              Digital Solutions. Real Growth. Websites, apps, CRMs, booking systems, e-commerce platforms, automations, and scalable digital infrastructure.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.18em] text-white">Explore</h4>
            <ul className="mt-5 space-y-3">
              {links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#B3B3B3] hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.18em] text-white">Contact</h4>
            <div className="mt-5 space-y-3">
              <a href="https://wa.me/16582182282" className="flex items-center gap-3 text-sm text-[#B3B3B3] hover:text-white">
                <MessageCircle className="h-4 w-4 text-[#00D26A]" />
                658-218-2282
              </a>
              <a href="mailto:global.jsuprememarketing@gmail.com" className="flex items-center gap-3 text-sm text-[#B3B3B3] hover:text-white">
                <Mail className="h-4 w-4 text-[#A855F7]" />
                global.jsuprememarketing@gmail.com
              </a>
              <p className="text-sm text-[#B3B3B3]">Jamaica, Caribbean, Worldwide</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-sm text-[#B3B3B3]">
          <p>&copy; 2026 J Supreme Tech. Systems That Work. Growth That Lasts.</p>
        </div>
      </div>
    </footer>
  );
}
