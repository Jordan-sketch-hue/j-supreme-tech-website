import { Marquee } from "@/components/motion-kit";
import { Reveal } from "@/components/motion-kit";

const CLIENTS = [
  "Language Cradle",
  "Ship 2 Door JA",
  "Aboo Tours",
  "BP Couriers",
  "Ferguson Law",
  "The Cleanser JA",
  "Solace Auto Imports",
  "876 Luxury Car Wash",
  "Solid Trust Services",
  "Morris Pizza",
];

export function ClientLogoStrip() {
  return (
    <div className="overflow-hidden border-y border-line bg-ink-50/50 py-4">
      <Reveal>
        <div className="mb-3 text-center">
          <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ink-400">
            Trusted by brands across Jamaica &amp; the Caribbean
          </span>
        </div>
      </Reveal>
      <Marquee speed={30} gap="2.5rem">
        {CLIENTS.map((name) => (
          <span
            key={name}
            className="font-display text-sm font-semibold tracking-tight text-ink-400 transition-colors hover:text-ink-900"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
