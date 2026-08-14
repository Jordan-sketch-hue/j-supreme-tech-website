import { Marquee } from "@/components/motion-kit";

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
  "Ferguson H.O.M.E.",
  "Keltec Promotions",
];

export function ClientLogoStrip() {
  return (
    <div className="overflow-hidden border-b border-line bg-white py-3">
      <Marquee speed={28} gap="3rem">
        {CLIENTS.map((name) => (
          <span
            key={name}
            className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-black transition-colors"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
