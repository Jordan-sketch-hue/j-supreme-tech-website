/**
 * Products page sections: animated use-case stories, the "full stack"
 * diagram and the stats band. CSS/SMIL motion only — server-rendered.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { CountUp } from "@/components/motion-kit";
import { suiteSystem } from "@/lib/supremeSuite";

/* ------------------------- stats band ------------------------- */

export function StatsBand() {
  const stats: { value: ReactNode; label: string }[] = [
    { value: <CountUp to={13} className="tabular-nums" />, label: "systems, live today" },
    { value: <><CountUp to={3} className="tabular-nums" /> surfaces</>, label: "CRM · website · AI staff" },
    { value: "24/7", label: "AI receptionist on duty" },
    { value: <><CountUp to={3} className="tabular-nums" />-day</>, label: "free trial, no card" },
    { value: "100%", label: "pages self-checked on /status" },
  ];
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((s) => (
        <div key={s.label} className="bg-white px-5 py-6 text-center">
          <p className="font-display text-3xl font-bold tracking-tight text-ink-900">{s.value}</p>
          <p className="mt-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-500">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------- use-case stories ------------------------- */

const STORIES: {
  slug: string;
  who: string;
  where: string;
  steps: { time: string; text: string }[];
  outcome: string;
}[] = [
  {
    slug: "salon",
    who: "Nail tech",
    where: "Kingston",
    steps: [
      { time: "9:02 AM", text: "DM comes in: “you free Friday?” — she's mid-set, hands full." },
      { time: "9:02 AM", text: "Her AI receptionist answers, offers 2:00 PM, takes a J$2,000 deposit." },
      { time: "THU 8 PM", text: "Reminder fires automatically. Client confirms with one tap." },
      { time: "FRI 2:00", text: "Client shows. Punch card stamps visit 7 of 10." },
    ],
    outcome: "No-shows nearly gone. Fridays fully booked.",
  },
  {
    slug: "courier",
    who: "Courier fleet",
    where: "Kingston → MoBay",
    steps: [
      { time: "8:40 AM", text: "32 packages booked through the public page before lunch." },
      { time: "9:15 AM", text: "Dispatch board batches Andre's route — he sees it on his phone." },
      { time: "12:42 PM", text: "Proof-of-delivery photo captured at every single door." },
      { time: "5:30 PM", text: "COD reconciled to the cent. Overdue invoices flagged." },
    ],
    outcome: "Every package tracked. Every dollar accounted for.",
  },
  {
    slug: "tours",
    who: "Tour operator",
    where: "Ocho Rios",
    steps: [
      { time: "7:18 AM", text: "Inquiry from the website: 4 guests, Dunn's River + Blue Hole." },
      { time: "7:31 AM", text: "Quote sent. Deposit link paid before breakfast ends." },
      { time: "DAY -1", text: "Trip manifest ready: hotel pickups, guide, guest count." },
      { time: "DAY +1", text: "Five-star review request fires after drop-off." },
    ],
    outcome: "From first inquiry to five-star review — one board.",
  },
];

export function UseCases() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {STORIES.map((story) => {
        const sys = suiteSystem(story.slug)!;
        const total = 13;
        return (
          <article key={story.slug} className="card card-hover flex flex-col p-6">
            <div className="flex items-center gap-2.5">
              <span className="live-dot h-2 w-2 rounded-full" style={{ background: sys.accent }} />
              <h3 className="font-display text-base font-semibold text-ink-900">{story.who}</h3>
              <span className="ml-auto font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-400">{story.where}</span>
            </div>

            <div className="relative mt-5 flex-1">
              {/* timeline rail */}
              <span className="absolute bottom-2 left-[3px] top-2 w-px bg-ink-100" />
              <span
                className="pm-filly absolute bottom-2 left-[3px] top-2 w-px"
                style={{ background: sys.accent, "--pm-dur": `${total}s` } as CSSProperties}
              />
              <ol className="space-y-4">
                {story.steps.map((step, i) => (
                  <li
                    key={i}
                    className="pm-step relative pl-5"
                    style={{ "--pm-d": `${i * 1.6}s`, "--pm-dur": `${total}s` } as CSSProperties}
                  >
                    <span className="absolute left-0 top-1 h-[7px] w-[7px] rounded-full" style={{ background: i === story.steps.length - 1 ? sys.accent : "#141414" }} />
                    <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em]" style={{ color: sys.accent }}>{step.time}</p>
                    <p className="mt-0.5 text-[0.83rem] leading-relaxed text-ink-600">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <p className="text-sm font-semibold text-ink-900">{story.outcome}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-ink-500">
                  {sys.name} · from <span className="font-display text-sm font-bold text-ink-900">US${sys.fromUsd}</span>/mo
                </p>
                <Link
                  href={`/products/${sys.slug}`}
                  className="inline-flex items-center gap-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink-600 hover:text-ink-900"
                >
                  See it <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ------------------------- full-stack diagram ------------------------- */

const NODE_PATHS = {
  site: "M 350 160 C 280 160, 230 120, 150 96",
  ai: "M 350 160 C 280 160, 230 200, 150 224",
  crm: "M 370 160 C 440 160, 490 160, 570 160",
};

export function FullStackDiagram() {
  return (
    <div className="card overflow-hidden">
      <div className="grid lg:grid-cols-[1.5fr_1fr]">
        <div className="relative border-b border-line bg-ink-50/50 lg:border-b-0 lg:border-r">
          <div className="grid-bg absolute inset-0" />
          <svg viewBox="0 0 720 320" className="relative h-full min-h-[280px] w-full" role="img" aria-label="One subscription: branded website, AI staff and CRM workspace, all connected">
            {/* connectors */}
            {Object.values(NODE_PATHS).map((d) => (
              <path key={d} d={d} fill="none" stroke="#cfcfcf" strokeWidth="1.5" strokeDasharray="5 5" className="pm-march" />
            ))}
            {/* travelling pulses (SMIL — zero JS) */}
            {Object.values(NODE_PATHS).map((d, i) => (
              <circle key={i} r="3.5" fill="#141414" className="pm-smil">
                <animateMotion dur={`${2.8 + i * 0.5}s`} repeatCount="indefinite" path={d} />
              </circle>
            ))}

            {/* center — your brand */}
            <g>
              <rect x="290" y="120" width="120" height="80" rx="16" fill="#141414" />
              <text x="350" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff" fontFamily="var(--font-display)">YOUR</text>
              <text x="350" y="170" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff" fontFamily="var(--font-display)">BRAND</text>
              <text x="350" y="188" textAnchor="middle" fontSize="7" fill="#a3a3a3" fontFamily="var(--font-mono)" letterSpacing="2">ONE LOGIN</text>
            </g>

            {/* node: branded website */}
            <g>
              <rect x="40" y="62" width="110" height="64" rx="12" fill="#ffffff" stroke="#e6e6e6" />
              <rect x="52" y="76" width="50" height="6" rx="3" fill="#141414" />
              <rect x="52" y="88" width="70" height="4" rx="2" fill="#e6e6e6" />
              <rect x="52" y="98" width="36" height="12" rx="6" fill="#141414" />
              <text x="95" y="142" textAnchor="middle" fontSize="9" fontWeight="600" fill="#3d3d3d" fontFamily="var(--font-mono)" letterSpacing="1.5">BRANDED SITE</text>
            </g>

            {/* node: AI staff */}
            <g>
              <rect x="40" y="192" width="110" height="64" rx="12" fill="#ffffff" stroke="#e6e6e6" />
              <rect x="52" y="206" width="56" height="12" rx="6" fill="#f4f4f4" />
              <rect x="64" y="224" width="56" height="12" rx="6" fill="#141414" />
              <circle cx="130" cy="212" r="4" fill="#141414">
                <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <text x="95" y="272" textAnchor="middle" fontSize="9" fontWeight="600" fill="#3d3d3d" fontFamily="var(--font-mono)" letterSpacing="1.5">AI STAFF 24/7</text>
            </g>

            {/* node: CRM workspace */}
            <g>
              <rect x="570" y="116" width="116" height="88" rx="12" fill="#ffffff" stroke="#e6e6e6" />
              <rect x="582" y="130" width="28" height="22" rx="4" fill="#f4f4f4" />
              <rect x="614" y="130" width="28" height="22" rx="4" fill="#f4f4f4" />
              <rect x="646" y="130" width="28" height="22" rx="4" fill="#141414" />
              <rect x="582" y="158" width="92" height="5" rx="2.5" fill="#e6e6e6" />
              <rect x="582" y="169" width="64" height="5" rx="2.5" fill="#e6e6e6" />
              <rect x="582" y="180" width="78" height="5" rx="2.5" fill="#cfcfcf" />
              <text x="628" y="220" textAnchor="middle" fontSize="9" fontWeight="600" fill="#3d3d3d" fontFamily="var(--font-mono)" letterSpacing="1.5">CRM WORKSPACE</text>
            </g>
          </svg>
        </div>

        <div className="flex flex-col justify-center gap-4 p-7">
          <p className="eyebrow no-rule">One subscription buys</p>
          <ul className="space-y-3">
            {[
              ["A full CRM workspace", "pipelines, invoices, customers, reports — the back office"],
              ["A branded public website", "your logo, your colors, your domain — taking bookings day one"],
              ["AI staff that never clock out", "chatbot + voice agent trained on your prices and policies"],
            ].map(([title, sub]) => (
              <li key={title} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink-950 text-[10px] font-bold text-white">✓</span>
                <span>
                  <span className="block text-sm font-semibold text-ink-900">{title}</span>
                  <span className="block text-xs leading-relaxed text-ink-500">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 border-t border-line pt-4">
            {["Custom domain", "Installable desktop app", "Self-checked /status", "Launch in minutes"].map((chip) => (
              <span key={chip} className="tag">{chip}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
