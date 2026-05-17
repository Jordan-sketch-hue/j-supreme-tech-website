import Link from "next/link";
import { Check } from "lucide-react";

export type PricingCardProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export function PricingCard({ title, price, description, features, featured }: PricingCardProps) {
  return (
    <article className={`rounded-3xl border p-6 ${featured ? "border-[#A855F7]/70 bg-[#7B2FFF]/12 shadow-[0_0_90px_rgba(123,47,255,0.24)]" : "border-white/10 bg-white/[0.045]"}`}>
      {featured ? (
        <p className="mb-5 inline-flex rounded-full border border-[#A855F7]/50 bg-[#A855F7]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#A855F7]">
          Recommended
        </p>
      ) : null}
      <h3 className="text-2xl font-black tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-4xl font-black text-white">{price}</p>
      <p className="mt-4 text-sm leading-6 text-[#B3B3B3]">{description}</p>
      <ul className="mt-7 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-white/86">
            <Check className="h-4 w-4 shrink-0 text-[#00D26A]" />
            {feature}
          </li>
        ))}
      </ul>
      <Link href="#contact" className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold ${featured ? "premium-button text-white" : "border border-white/10 bg-white/[0.04] text-white hover:border-[#A855F7]/60"}`}>
        Start a Project
      </Link>
    </article>
  );
}
