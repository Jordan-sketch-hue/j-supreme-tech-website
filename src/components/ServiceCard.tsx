import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

export type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  eyebrow: string;
  description: string;
  points: string[];
};

export function ServiceCard({ icon: Icon, title, eyebrow, description, points }: ServiceCardProps) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur hover:border-[#A855F7]/55 hover:bg-white/[0.065] hover:shadow-[0_0_70px_rgba(123,47,255,0.18)]">
      <div className="flex items-start justify-between gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#A855F7]/25 bg-[#7B2FFF]/15 text-[#A855F7] shadow-[0_0_30px_rgba(123,47,255,0.16)]">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#B3B3B3]">
          {eyebrow}
        </span>
      </div>
      <h3 className="mt-7 text-2xl font-black tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-[#B3B3B3]">{description}</p>
      <ul className="mt-6 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm text-white/86">
            <Check className="h-4 w-4 shrink-0 text-[#00D26A]" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
