/**
 * Animated "live layout" screens for every Supreme Suite system.
 * Pure CSS/SVG motion (pm-* classes from products-motion.css) — no hooks,
 * so these render server-side inside catalog cards and hydrate for free
 * inside the client showreel/tour.
 */
import type { CSSProperties, ReactNode } from "react";
import { suiteSystem } from "@/lib/supremeSuite";

/* ============================ primitives ============================ */

function Stub({ w = "60%", h = 4, tone = "bg-ink-200", className = "" }: { w?: string; h?: number; tone?: string; className?: string }) {
  return <span className={`block rounded-full ${tone} ${className}`} style={{ width: w, height: h }} />;
}

function Odometer({ values, className = "", dur = 10, d = 0 }: { values: [string, string, string, string]; className?: string; dur?: number; d?: number }) {
  const stack = [...values, values[0]];
  return (
    <span className={`block overflow-hidden ${className}`} style={{ height: "1.1em" }}>
      <span className="pm-roll block" style={{ "--pm-dur": `${dur}s`, "--pm-d": `${d}s` } as CSSProperties}>
        {stack.map((v, i) => (
          <span key={i} className="block" style={{ height: "1.1em", lineHeight: "1.1em" }}>
            {v}
          </span>
        ))}
      </span>
    </span>
  );
}

function Kpi({ label, values, accent, d = 0, suffix }: { label: string; values: [string, string, string, string]; accent: string; d?: number; suffix?: string }) {
  return (
    <div className="min-w-0 flex-1 rounded-lg border border-line bg-white p-2">
      <p className="truncate font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-ink-400">{label}</p>
      <div className="mt-0.5 flex items-baseline gap-1">
        <Odometer values={values} d={d} className="font-display text-[13px] font-bold text-ink-900" />
        {suffix ? <span className="font-mono text-[7px] font-semibold" style={{ color: accent }}>{suffix}</span> : null}
      </div>
    </div>
  );
}

function Bars({ accent, heights = [34, 58, 42, 72, 50, 88, 64, 96], dur = 6, className = "h-14" }: { accent: string; heights?: number[]; dur?: number; className?: string }) {
  return (
    <div className={`flex items-end gap-1 ${className}`}>
      {heights.map((h, i) => (
        <span
          key={i}
          className="pm-grow w-full rounded-t-[2px]"
          style={{ height: `${h}%`, background: i === heights.length - 1 ? accent : `${accent}55`, "--pm-d": `${i * 0.14}s`, "--pm-dur": `${dur}s` } as CSSProperties}
        />
      ))}
    </div>
  );
}

function ChartLine({ accent, dur = 7.5 }: { accent: string; dur?: number }) {
  return (
    <svg viewBox="0 0 220 64" className="h-full w-full" preserveAspectRatio="none">
      {[16, 32, 48].map((y) => (
        <line key={y} x1="0" y1={y} x2="220" y2={y} stroke="#eeeeee" strokeWidth="1" />
      ))}
      <path
        d="M0 56 L28 48 L56 50 L84 38 L112 42 L140 26 L168 30 L196 14 L220 10 L220 64 L0 64 Z"
        fill={`${accent}1a`}
        className="pm-area"
        style={{ "--pm-dur": `${dur}s` } as CSSProperties}
      />
      <path
        d="M0 56 L28 48 L56 50 L84 38 L112 42 L140 26 L168 30 L196 14 L220 10"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        className="pm-draw"
        style={{ "--pm-dur": `${dur}s` } as CSSProperties}
      />
      <circle cx="196" cy="14" r="3" fill={accent} className="pm-area" style={{ "--pm-dur": `${dur}s` } as CSSProperties} />
    </svg>
  );
}

function Donut({ accent, pct = 76, label, size = 54 }: { accent: string; pct?: number; label: string; size?: number }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="#ececec" strokeWidth="6" />
        <circle
          cx="24" cy="24" r={r} fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * c} ${c}`} transform="rotate(-90 24 24)"
        />
        <text x="24" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="#141414" fontFamily="var(--font-display)">
          {pct}%
        </text>
      </svg>
      <p className="font-mono text-[6.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">{label}</p>
    </div>
  );
}

function SwapPill({ a, b, accent, dur = 7, d = 0 }: { a: string; b: string; accent: string; dur?: number; d?: number }) {
  const vars = { "--pm-dur": `${dur}s`, "--pm-d": `${d}s` } as CSSProperties;
  return (
    <span className="relative inline-flex">
      <span className="pm-swap-a rounded-full bg-ink-100 px-1.5 py-px font-mono text-[6.5px] font-semibold uppercase tracking-wide text-ink-500" style={vars}>
        {a}
      </span>
      <span className="pm-swap-b flex items-center justify-center rounded-full px-1.5 py-px font-mono text-[6.5px] font-semibold uppercase tracking-wide" style={{ ...vars, background: `${accent}1f`, color: accent }}>
        {b}
      </span>
    </span>
  );
}

function Rows({ accent, n = 4, dur = 9, swapIndex = 1, labels }: { accent: string; n?: number; dur?: number; swapIndex?: number; labels?: [string, string] }) {
  return (
    <div className="space-y-1">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="pm-cycle flex items-center gap-1.5 rounded-md border border-line bg-white px-1.5 py-1"
          style={{ "--pm-d": `${i * 0.5}s`, "--pm-dur": `${dur}s` } as CSSProperties}
        >
          <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: `${accent}33` }} />
          <Stub w={`${42 - i * 4}%`} h={3} />
          <Stub w="14%" h={3} tone="bg-ink-100" />
          <span className="ml-auto">
            {i === swapIndex && labels ? (
              <SwapPill a={labels[0]} b={labels[1]} accent={accent} dur={dur} d={i * 0.5 + 1.2} />
            ) : (
              <Stub w="22px" h={5} tone="bg-ink-100" />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

function Kanban({ accent, cols, dur = 9.5, stubRows = [2, 1, 1], moverLines = 2 }: { accent: string; cols: [string, string, string]; dur?: number; stubRows?: [number, number, number]; moverLines?: number }) {
  return (
    <div className="flex h-full flex-col">
      <div className="relative grid flex-1 grid-cols-3 gap-2">
        {cols.map((c, ci) => (
          <div key={c} className="flex min-w-0 flex-col rounded-lg border border-line bg-ink-50/70 p-1.5">
            <div className="mb-1 flex items-center justify-between">
              <p className="truncate font-mono text-[6.5px] font-semibold uppercase tracking-[0.12em] text-ink-500">{c}</p>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ci === 0 ? accent : "#d4d4d4" }} />
            </div>
            <div className="space-y-1">
              {Array.from({ length: stubRows[ci] }).map((_, i) => (
                <div key={i} className="rounded-[5px] border border-line bg-white p-1">
                  <Stub w="70%" h={3} />
                  <Stub w="45%" h={3} tone="bg-ink-100" className="mt-1" />
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* the moving job card */}
        <div
          className="pm-hop absolute top-[22px] left-1.5 z-10 w-[calc((100%-16px)/3-12px)] rounded-[5px] border bg-white p-1 shadow-md"
          style={{ borderColor: `${accent}66`, borderLeft: `3px solid ${accent}`, "--pm-dur": `${dur}s` } as CSSProperties}
        >
          <Stub w="78%" h={3} tone="bg-ink-300" />
          {moverLines > 1 ? <Stub w="52%" h={3} tone="bg-ink-100" className="mt-1" /> : null}
          <span className="mt-1 inline-block rounded-full px-1 py-px font-mono text-[5.5px] font-bold uppercase" style={{ background: `${accent}1f`, color: accent }}>
            • live
          </span>
        </div>
      </div>
    </div>
  );
}

function Toast({ accent, title, sub, d = 1.5, dur = 9, icon = "✓" }: { accent: string; title: string; sub?: string; d?: number; dur?: number; icon?: string }) {
  return (
    <div
      className="pm-toast absolute right-1.5 top-1.5 z-20 flex items-center gap-1.5 rounded-lg border border-line bg-white py-1 pl-1.5 pr-2 shadow-lg"
      style={{ "--pm-d": `${d}s`, "--pm-dur": `${dur}s` } as CSSProperties}
    >
      <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full text-[7px] font-bold text-white" style={{ background: accent }}>
        {icon}
      </span>
      <span>
        <span className="block text-[7px] font-bold leading-tight text-ink-900">{title}</span>
        {sub ? <span className="block font-mono text-[5.5px] uppercase tracking-wide text-ink-400">{sub}</span> : null}
      </span>
    </div>
  );
}

function ChatThread({ accent, items, dur = 11 }: { accent: string; items: { from: "user" | "ai" | "typing"; text?: string }[]; dur?: number }) {
  return (
    <div className="flex h-full flex-col justify-end space-y-1 overflow-hidden">
      {items.map((m, i) => {
        const vars = { "--pm-d": `${i * 1.1}s`, "--pm-dur": `${dur}s` } as CSSProperties;
        if (m.from === "typing") {
          return (
            <div key={i} className="pm-cycle flex w-fit items-center gap-0.5 rounded-xl rounded-bl-sm bg-ink-100 px-2 py-1.5" style={vars}>
              {[0, 1, 2].map((j) => (
                <span key={j} className="pm-dotbounce h-1 w-1 rounded-full bg-ink-400" style={{ "--pm-d": `${j * 0.15}s` } as CSSProperties} />
              ))}
            </div>
          );
        }
        const user = m.from === "user";
        return (
          <div
            key={i}
            className={`pm-cycle w-fit max-w-[82%] rounded-xl px-2 py-1 text-[7.5px] leading-snug ${user ? "ml-auto rounded-br-sm bg-ink-900 text-white" : "rounded-bl-sm text-ink-800"}`}
            style={user ? vars : ({ ...vars, background: `${accent}14`, border: `1px solid ${accent}2a` } as CSSProperties)}
          >
            {m.text}
          </div>
        );
      })}
    </div>
  );
}

function Wave({ accent, n = 24, className = "h-8" }: { accent: string; n?: number; className?: string }) {
  const hs = [30, 55, 80, 45, 95, 60, 35, 75, 50, 90, 40, 65];
  return (
    <div className={`flex items-center gap-[2px] ${className}`}>
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className="pm-wave w-[3px] flex-none rounded-full"
          style={{ height: `${hs[i % hs.length]}%`, background: accent, "--pm-d": `${(i % 6) * 0.12}s`, "--pm-dur": `${0.8 + (i % 4) * 0.18}s` } as CSSProperties}
        />
      ))}
    </div>
  );
}

function CalendarMini({ accent, dur = 10, rows = 3 }: { accent: string; dur?: number; rows?: number }) {
  const filled = [1, 3, 4, 8, 10, 12, 15, 17, 19].slice(0, rows * 3);
  return (
    <div>
      <div className="mb-0.5 grid grid-cols-7 gap-0.5">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="text-center font-mono text-[5.5px] font-semibold text-ink-400">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: rows * 7 }).map((_, i) => {
          const idx = filled.indexOf(i);
          return (
            <span key={i} className="relative h-3 overflow-hidden rounded-[3px] border border-line bg-white">
              {idx >= 0 ? (
                <span
                  className="pm-cycle absolute inset-0"
                  style={{ background: idx % 3 === 0 ? accent : `${accent}55`, "--pm-d": `${idx * 0.55}s`, "--pm-dur": `${dur}s` } as CSSProperties}
                />
              ) : null}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Punch({ accent, n = 10, filled = 7, dur = 10, size = "h-4 w-4" }: { accent: string; n?: number; filled?: number; dur?: number; size?: string }) {
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className={`relative flex ${size} items-center justify-center rounded-full border ${i < filled ? "" : "border-dashed"}`} style={{ borderColor: i < filled ? accent : "#d4d4d4" }}>
          {i < filled ? (
            <span
              className="pm-stamp flex h-full w-full items-center justify-center rounded-full text-[7px] font-bold text-white"
              style={{ background: accent, "--pm-d": `${i * 0.5}s`, "--pm-dur": `${dur}s` } as CSSProperties}
            >
              ✓
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

function RouteMap({ accent }: { accent: string }) {
  const route = "M14 84 C 40 38, 92 24, 128 40 S 196 78, 206 44";
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-line bg-ink-50/60">
      <svg viewBox="0 0 220 110" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* island-ish landmass */}
        <path d="M18 70 C 30 30, 80 14, 130 22 C 178 30, 210 52, 204 76 C 196 98, 120 104, 70 98 C 36 94, 12 92, 18 70 Z" fill="#ffffff" stroke="#e6e6e6" strokeWidth="1.5" />
        <path d={route} fill="none" stroke={`${accent}55`} strokeWidth="2.5" strokeDasharray="5 5" className="pm-march" />
        <circle cx="14" cy="84" r="4" fill="#141414" />
        <circle cx="128" cy="40" r="3" fill="#a3a3a3" />
        <circle cx="206" cy="44" r="4.5" fill={accent} />
        <circle cx="206" cy="44" r="4.5" fill="none" stroke={accent} strokeWidth="1.5" className="pm-ping" style={{ transformOrigin: "206px 44px" } as CSSProperties} />
        {/* travelling courier dot — SMIL so it scales with the viewBox */}
        <g className="pm-smil">
          <circle r="5" fill={accent}>
            <animateMotion dur="6s" repeatCount="indefinite" path={route} />
          </circle>
          <circle r="2" fill="#ffffff">
            <animateMotion dur="6s" repeatCount="indefinite" path={route} />
          </circle>
        </g>
      </svg>
      <span className="absolute bottom-1 left-1.5 font-mono text-[5.5px] font-semibold uppercase tracking-[0.16em] text-ink-400">
        Kingston → MoBay · live GPS
      </span>
    </div>
  );
}

/* ============================ app window shell ============================ */

function Shell({
  slug,
  nav,
  children,
  compact = false,
  surface = "app",
}: {
  slug: string;
  nav: string[];
  children: ReactNode;
  compact?: boolean;
  surface?: "app" | "site";
}) {
  const sys = suiteSystem(slug);
  const accent = sys?.accent ?? "#141414";
  const name = sys?.shortName ?? "Suite";
  return (
    <div className="pm-screen flex h-full w-full flex-col rounded-[inherit] text-left">
      {/* top bar */}
      <div className="flex flex-none items-center gap-1.5 border-b border-line bg-white px-2 py-1">
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] text-[6px] font-black text-white" style={{ background: accent }}>
          {name[0]}
        </span>
        <span className="font-display text-[8px] font-bold tracking-tight text-ink-900">{name} {surface === "app" ? "Workspace" : "— your site"}</span>
        <span className="ml-auto hidden h-3 w-16 rounded-full border border-line bg-ink-50 sm:block" />
        <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-ink-100 text-[5px]">
          ●
          <span className="absolute -right-0 -top-0 h-1.5 w-1.5 rounded-full border border-white" style={{ background: accent }} />
        </span>
        <span className="h-3 w-3 rounded-full bg-ink-900 text-center text-[5px] font-bold leading-3 text-white">J</span>
      </div>
      <div className="flex min-h-0 flex-1">
        {/* sidebar */}
        {!compact ? (
          <div className="hidden w-[68px] flex-none flex-col gap-0.5 border-r border-line bg-ink-50/60 p-1 sm:flex">
            {nav.map((item, i) => (
              <span
                key={item}
                className={`truncate rounded-md px-1.5 py-1 font-mono text-[6px] font-semibold uppercase tracking-wide ${i === 0 ? "text-white" : "text-ink-500"}`}
                style={i === 0 ? { background: "#141414" } : undefined}
              >
                {item}
              </span>
            ))}
            <span className="mt-auto truncate rounded-md px-1.5 py-1 font-mono text-[6px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
              + AI staff
            </span>
          </div>
        ) : null}
        {/* content */}
        <div className="relative min-w-0 flex-1 bg-ink-50/40 p-2">{children}</div>
      </div>
    </div>
  );
}

/* ============================ 13 system screens ============================ */

function CourierScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("courier")!.accent;
  return (
    <Shell slug="courier" nav={["Dispatch", "Bookings", "Drivers", "COD"]} compact={compact}>
      <Toast accent={accent} title="POD captured — #J-2481" sub="driver: Andre · 12:42" d={2.2} />
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex gap-1.5">
          <Kpi label="Active jobs" values={["18", "19", "21", "24"]} accent={accent} suffix="▲" />
          <Kpi label="COD today" values={["J$48k", "J$56k", "J$71k", "J$84k"]} accent={accent} d={0.4} suffix="▲" />
          {!compact ? <Kpi label="On-time" values={["96%", "97%", "98%", "98%"]} accent={accent} d={0.8} /> : null}
        </div>
        <div className="min-h-0 flex-1"><RouteMap accent={accent} /></div>
      </div>
    </Shell>
  );
}

function MoversScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("movers")!.accent;
  return (
    <Shell slug="movers" nav={["Moves", "Surveys", "Crews", "Storage"]} compact={compact}>
      <Toast accent={accent} title="Deposit received — Hylton move" sub="J$25,000 · 50%" d={3} />
      <div className="flex h-full flex-col gap-1.5">
        <div className="min-h-0 flex-1">
          <Kanban accent={accent} cols={["Quote", "Survey", "Move day"]} />
        </div>
        {!compact ? (
          <div className="flex items-center gap-2 rounded-lg border border-line bg-white p-1.5">
            <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Crew calendar</span>
            <div className="flex-1"><Stub w="100%" h={3} tone="bg-ink-100" /></div>
            <span className="relative h-2 w-24 overflow-hidden rounded-full bg-ink-100">
              <span className="pm-fillx absolute inset-0 rounded-full" style={{ background: accent, "--pm-dur": "8s" } as CSSProperties} />
            </span>
          </div>
        ) : null}
      </div>
    </Shell>
  );
}

function WarehouseScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("warehouse")!.accent;
  return (
    <Shell slug="warehouse" nav={["Orders", "Inventory", "Customers", "Reports"]} compact={compact}>
      <Toast accent={accent} title="Low stock — SKU-114" sub="reorder point hit" d={4} icon="!" />
      <div className="grid h-full grid-cols-[1.25fr_1fr] gap-1.5">
        <div className="rounded-lg border border-line bg-white p-1.5">
          <p className="mb-1 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Orders → pick / pack / ship</p>
          <Rows accent={accent} n={compact ? 3 : 4} labels={["Picking", "Shipped"]} />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex-1 rounded-lg border border-line bg-white p-1.5">
            <p className="mb-1 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Stock by SKU</p>
            <Bars accent={accent} className="h-[calc(100%-12px)]" />
          </div>
          {!compact ? <Kpi label="Throughput" values={["212", "230", "247", "268"]} accent={accent} suffix="/wk" /> : null}
        </div>
      </div>
    </Shell>
  );
}

function PropertyScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("property")!.accent;
  return (
    <Shell slug="property" nav={["Work orders", "Tenants", "Rent", "Owners"]} compact={compact}>
      <Toast accent={accent} title="Rent paid — Unit 4B" sub="J$120,000 · on time" d={2.6} />
      <div className="grid h-full grid-cols-[1.4fr_1fr] gap-1.5">
        <div className="min-h-0"><Kanban accent={accent} cols={["New", "In progress", "Done"]} /></div>
        <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-line bg-white p-1.5">
          <Donut accent={accent} pct={92} label="Occupancy" />
          {!compact ? <SwapPill a="2 overdue" b="0 overdue" accent={accent} d={1} /> : null}
        </div>
      </div>
    </Shell>
  );
}

function RestaurantScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("restaurant")!.accent;
  return (
    <Shell slug="restaurant" nav={["Orders", "Tables", "Kitchen", "Loyalty"]} compact={compact}>
      <Toast accent={accent} title="Party of 6 — Sat 7:30 PM" sub="reservation confirmed" d={3.4} />
      <div className="grid h-full grid-cols-[1.3fr_1fr] gap-1.5">
        <div className="rounded-lg border border-line bg-white p-1.5">
          <p className="mb-1 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Tickets — placed → served</p>
          <Rows accent={accent} n={compact ? 3 : 4} labels={["Preparing", "Served"]} swapIndex={0} />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex-1 rounded-lg border border-line bg-white p-1.5">
            <p className="mb-1 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Floor</p>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="relative flex aspect-square items-center justify-center overflow-hidden rounded-full border border-line bg-ink-50 font-mono text-[5.5px] text-ink-400">
                  T{i + 1}
                  {[0, 2, 3, 5, 6].includes(i) ? (
                    <span className="pm-cycle absolute inset-0 flex items-center justify-center rounded-full font-bold text-white" style={{ background: accent, "--pm-d": `${i * 0.6}s`, "--pm-dur": "10s" } as CSSProperties}>
                      T{i + 1}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
          {!compact ? <Kpi label="Covers tonight" values={["42", "48", "57", "63"]} accent={accent} suffix="▲" /> : null}
        </div>
      </div>
    </Shell>
  );
}

function SalonScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("salon")!.accent;
  return (
    <Shell slug="salon" nav={["Calendar", "Clients", "Deposits", "Loyalty"]} compact={compact}>
      <Toast accent={accent} title="Deposit paid — Gel set" sub="Fri 2:00 PM · Shanice" d={4.2} />
      <div className="grid h-full grid-cols-[1.2fr_1fr] gap-1.5">
        <div className="flex flex-col gap-1.5">
          <div className="rounded-lg border border-line bg-white p-1.5">
            <p className="mb-1 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">This week</p>
            <CalendarMini accent={accent} rows={compact ? 2 : 3} />
          </div>
          {!compact ? (
            <div className="rounded-lg border border-line bg-white p-1.5">
              <p className="mb-1 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Punch card — Shanice</p>
              <Punch accent={accent} n={10} filled={7} size="h-3.5 w-3.5" />
            </div>
          ) : null}
        </div>
        <div className="rounded-lg border border-line bg-white p-1.5">
          <p className="mb-1 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">AI receptionist</p>
          <ChatThread
            accent={accent}
            items={[
              { from: "user", text: "Any opening Friday?" },
              { from: "typing" },
              { from: "ai", text: "2:00 PM is free — gel set?" },
              { from: "user", text: "Yes please" },
              { from: "ai", text: "Booked ✓ deposit link sent" },
            ]}
          />
        </div>
      </div>
    </Shell>
  );
}

function AppointmentsScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("appointments")!.accent;
  return (
    <Shell slug="appointments" nav={["Calendar", "Requests", "Clients", "Fees"]} compact={compact}>
      <Toast accent={accent} title="Reminder sent — Maya 10:30" sub="no-show shield on" d={2.8} />
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex gap-1.5">
          <Kpi label="Booked this week" values={["23", "26", "31", "37"]} accent={accent} suffix="▲" />
          <Kpi label="No-shows" values={["4", "2", "1", "0"]} accent={accent} d={0.5} suffix="▼" />
        </div>
        <div className="flex-1 rounded-lg border border-line bg-white p-1.5">
          <p className="mb-1 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Requested → confirmed → completed</p>
          <CalendarMini accent={accent} rows={compact ? 2 : 3} />
        </div>
      </div>
    </Shell>
  );
}

function ToursScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("tours")!.accent;
  return (
    <Shell slug="tours" nav={["Inquiries", "Trips", "Guests", "Deposits"]} compact={compact}>
      <Toast accent={accent} title="Deposit — Dunn's River x4" sub="US$120 · balance due" d={3.6} />
      <div className="flex h-full flex-col gap-1.5">
        <div className="min-h-0 flex-1">
          <Kanban accent={accent} cols={["Inquiry", "Quoted", "Confirmed"]} />
        </div>
        {!compact ? (
          <div className="flex items-center gap-2 rounded-lg border border-line bg-white p-1.5">
            <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Trip-day manifest</span>
            <span className="flex -space-x-1">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="pm-cycle h-3 w-3 rounded-full border border-white" style={{ background: `${accent}${["ff", "cc", "99", "66"][i]}`, "--pm-d": `${i * 0.4}s`, "--pm-dur": "9s" } as CSSProperties} />
              ))}
            </span>
            <span className="ml-auto font-mono text-[6px] font-bold" style={{ color: accent }}>4 guests · 2 pickups</span>
          </div>
        ) : null}
      </div>
    </Shell>
  );
}

function SchoolScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("school")!.accent;
  return (
    <Shell slug="school" nav={["Enrollment", "Programs", "Guardians", "Tuition"]} compact={compact}>
      <Toast accent={accent} title="Application — Grade 4" sub="assessment booked" d={2.4} />
      <div className="grid h-full grid-cols-[1fr_1.2fr] gap-1.5">
        <div className="rounded-lg border border-line bg-white p-1.5">
          <p className="mb-1 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Funnel</p>
          <div className="space-y-1.5">
            {[
              ["Applied", "92%"],
              ["Assessed", "64%"],
              ["Enrolled", "41%"],
            ].map(([label, w], i) => (
              <div key={label}>
                <p className="font-mono text-[5.5px] font-semibold uppercase tracking-wide text-ink-400">{label}</p>
                <span className="relative mt-0.5 block h-2 overflow-hidden rounded-full bg-ink-100">
                  <span className="pm-fillx absolute inset-y-0 left-0 rounded-full" style={{ width: w, background: i === 2 ? accent : `${accent}77`, "--pm-d": `${i * 0.4}s`, "--pm-dur": "8s" } as CSSProperties} />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex-1 rounded-lg border border-line bg-white p-1.5">
            <p className="mb-1 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Timetable</p>
            <CalendarMini accent={accent} rows={compact ? 2 : 3} />
          </div>
          {!compact ? <Kpi label="Tuition collected" values={["68%", "74%", "85%", "93%"]} accent={accent} suffix="▲" /> : null}
        </div>
      </div>
    </Shell>
  );
}

function LoyaltyScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("loyalty")!.accent;
  return (
    <Shell slug="loyalty" nav={["Members", "Campaigns", "Punch cards", "Tiers"]} compact={compact}>
      <Toast accent={accent} title="Reward unlocked 🎉" sub="10th visit — free wash" d={5} />
      <div className="flex h-full flex-col justify-center gap-1.5">
        <div className="rounded-lg border border-line bg-white p-1.5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-ink-400">Punch card — “10 visits, 1 free”</p>
            <Odometer values={["1,240", "1,375", "1,521", "1,688"]} className="font-display text-[10px] font-bold text-ink-900" />
          </div>
          <div className="mt-1"><Punch accent={accent} n={10} filled={8} /></div>
        </div>
        <div className="rounded-lg border border-line bg-white p-1.5">
          <div className="mb-0.5 flex justify-between font-mono text-[5.5px] font-semibold uppercase tracking-wide text-ink-400">
            <span>Bronze</span><span>Silver</span><span style={{ color: accent }}>Gold</span>
          </div>
          <span className="relative block h-2 overflow-hidden rounded-full bg-ink-100">
            <span className="pm-fillx absolute inset-0 rounded-full" style={{ background: `linear-gradient(90deg, ${accent}66, ${accent})`, "--pm-dur": "9s" } as CSSProperties} />
          </span>
          {!compact ? <p className="mt-1 font-mono text-[5.5px] uppercase tracking-wide text-ink-400">Campaign live: double points weekend</p> : null}
        </div>
      </div>
    </Shell>
  );
}

function DashboardsScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("dashboards")!.accent;
  return (
    <Shell slug="dashboards" nav={["Overview", "Revenue", "Funnels", "Share"]} compact={compact}>
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex gap-1.5">
          <Kpi label="Revenue MTD" values={["J$1.2m", "J$1.4m", "J$1.7m", "J$2.1m"]} accent={accent} suffix="▲" />
          <Kpi label="New clients" values={["31", "38", "44", "52"]} accent={accent} d={0.4} suffix="▲" />
          {!compact ? <Kpi label="Repeat rate" values={["41%", "46%", "52%", "58%"]} accent={accent} d={0.8} suffix="▲" /> : null}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-1.5">
          <div className="rounded-lg border border-line bg-white p-1.5">
            <ChartLine accent={accent} />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-line bg-white p-1.5">
            {compact ? <Donut accent={accent} pct={76} label="To target" size={44} /> : <Bars accent={accent} className="h-full w-full" heights={[28, 44, 38, 60, 52, 78, 70, 92]} />}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function ChatbotScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("chatbot")!.accent;
  return (
    <Shell slug="chatbot" nav={["Conversations", "Training", "Handoffs", "Transcripts"]} compact={compact}>
      <Toast accent={accent} title="Booking captured → CRM" sub="slot-filled · 0 humans" d={6.2} />
      <div className="grid h-full grid-cols-[1.35fr_1fr] gap-1.5">
        <div className="rounded-lg border border-line bg-white p-1.5">
          <ChatThread
            accent={accent}
            items={[
              { from: "user", text: "How much for a deep clean?" },
              { from: "typing" },
              { from: "ai", text: "J$9,500 for 3 bed — Thursday free at 9 AM 👍" },
              { from: "user", text: "Book it" },
              { from: "ai", text: "Done ✓ confirmation sent to your phone" },
            ]}
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          {["Service: Deep clean", "Time: Thu 9:00 AM", "Phone: 876-···-2282"].map((s, i) => (
            <span key={s} className="pm-cycle flex items-center gap-1 rounded-md border px-1.5 py-1 font-mono text-[6px] font-semibold" style={{ borderColor: `${accent}44`, color: accent, background: `${accent}0d`, "--pm-d": `${1.6 + i * 1.1}s`, "--pm-dur": "11s" } as CSSProperties}>
              ✓ {s}
            </span>
          ))}
          {!compact ? <p className="font-mono text-[5.5px] uppercase tracking-wide text-ink-400">Trained on your prices &amp; policies</p> : null}
        </div>
      </div>
    </Shell>
  );
}

function VoiceScreen({ compact }: { compact?: boolean }) {
  const accent = suiteSystem("voice")!.accent;
  return (
    <Shell slug="voice" nav={["Live calls", "Summaries", "Voicemail", "Numbers"]} compact={compact}>
      <div className="flex h-full flex-col justify-center gap-1.5">
        <div className="rounded-lg border border-line bg-white p-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-6 w-6 flex-none items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: accent }}>
              ☎
              <span className="pm-ping absolute inset-0 rounded-full border-2" style={{ borderColor: accent }} />
            </span>
            <div className="min-w-0 flex-1"><Wave accent={accent} n={compact ? 18 : 26} /></div>
            <span className="flex items-center gap-1 font-mono text-[6px] font-bold uppercase text-ink-500">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-red-500" /> live · 0:47
            </span>
          </div>
        </div>
        <div className="space-y-1 rounded-lg border border-line bg-white p-1.5">
          {[
            ["Caller", "“Do you have anything Saturday morning?”"],
            ["Agent", "“Yes — 9:30 AM is open. Shall I book you in?”"],
            ["Caller", "“Perfect, book it.”"],
          ].map(([who, line], i) => (
            <p key={i} className="pm-cycle text-[7px] leading-snug text-ink-700" style={{ "--pm-d": `${i * 1.4}s`, "--pm-dur": "11s" } as CSSProperties}>
              <span className="font-mono text-[5.5px] font-bold uppercase tracking-wide" style={{ color: who === "Agent" ? accent : "#737373" }}>{who} · </span>
              {line}
            </p>
          ))}
        </div>
        {!compact ? (
          <div className="pm-cycle flex items-center gap-1.5 rounded-lg border px-2 py-1" style={{ borderColor: `${accent}44`, background: `${accent}0d`, "--pm-d": "5.5s", "--pm-dur": "11s" } as CSSProperties}>
            <span className="text-[8px]">📋</span>
            <span className="font-mono text-[6px] font-semibold uppercase tracking-wide" style={{ color: accent }}>Call summary saved · appointment booked Sat 9:30</span>
          </div>
        ) : null}
      </div>
    </Shell>
  );
}

/* ============================ registry ============================ */

const SCREENS: Record<string, (p: { compact?: boolean }) => ReactNode> = {
  courier: CourierScreen,
  movers: MoversScreen,
  warehouse: WarehouseScreen,
  property: PropertyScreen,
  restaurant: RestaurantScreen,
  salon: SalonScreen,
  appointments: AppointmentsScreen,
  tours: ToursScreen,
  school: SchoolScreen,
  loyalty: LoyaltyScreen,
  dashboards: DashboardsScreen,
  chatbot: ChatbotScreen,
  voice: VoiceScreen,
};

/** Animated live-layout mockup for a Supreme Suite system. */
export function SystemScreen({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const Screen = SCREENS[slug] ?? DashboardsScreen;
  return <Screen compact={compact} />;
}

/** Featured rotation for the hero showreel. */
export const SHOWREEL_SLUGS = ["salon", "courier", "dashboards", "chatbot", "voice"] as const;

/* primitives reused by the tour player */
export { Bars, ChartLine, ChatThread, Kanban, Kpi, Odometer, Punch, RouteMap, Stub, SwapPill, Toast, Wave };
