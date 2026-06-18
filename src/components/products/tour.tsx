"use client";

/**
 * "From visitor to paid" — a scripted, looping product tour presented in
 * video-player chrome (progress segments, play/pause, captions). Every
 * scene is live CSS motion, not an mp4 — sharp at any size, ~0 KB.
 */
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { CSSProperties } from "react";
import { ChartLine, ChatThread, Kanban, Kpi, Odometer, Punch, Stub, SwapPill } from "./screens";

const SCENE_MS = 4600;
const ACCENT = "#141414"; // tour stays brand-mono; accents live in the screens

function Cursor({ variant }: { variant: 1 | 4 }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={variant === 1 ? "pm-cursor1" : "pm-cursor4"}>
      <path d="M5 3l14 8-6.5 1.5L9 19z" fill="#111" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

/* ------------------------- scenes ------------------------- */

function SceneSite() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <Cursor variant={1} />
      <span className="pm-click h-9 w-9" style={{ left: "53%", top: "53%" }} />
      <div className="pm-drift flex h-full flex-col px-6 py-4">
        {/* site nav */}
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-ink-900 text-[8px] font-black text-white">Y</span>
          <span className="font-display text-[11px] font-bold">Your Brand</span>
          <span className="ml-auto flex gap-3">
            {["Services", "Pricing", "Book"].map((l) => (
              <span key={l} className="font-mono text-[8px] uppercase tracking-wide text-ink-400">{l}</span>
            ))}
          </span>
        </div>
        {/* hero */}
        <div className="my-auto max-w-[70%]">
          <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.18em] text-ink-500">
            your-brand.com
          </span>
          <div className="mt-3 space-y-1.5">
            <Stub w="82%" h={9} tone="bg-ink-900" />
            <Stub w="58%" h={9} tone="bg-ink-900" />
            <Stub w="66%" h={4} tone="bg-ink-200" className="mt-3" />
            <Stub w="48%" h={4} tone="bg-ink-200" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="pm-press inline-flex rounded-full bg-ink-900 px-4 py-2 font-mono text-[8px] font-bold uppercase tracking-wide text-white">
              Book now →
            </span>
            <span className="inline-flex rounded-full border border-line px-4 py-2 font-mono text-[8px] font-bold uppercase tracking-wide text-ink-500">
              Prices
            </span>
          </div>
        </div>
        <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-ink-300">A customer lands on the website we ship with your system</p>
      </div>
    </div>
  );
}

function SceneChat() {
  return (
    <div className="grid h-full w-full grid-cols-[1.3fr_1fr] gap-4 bg-white px-6 py-5">
      <div className="my-auto">
        <ChatThread
          accent="#141414"
          dur={9}
          items={[
            { from: "user", text: "Hi — do you have anything Friday?" },
            { from: "typing" },
            { from: "ai", text: "Friday 2:00 PM is open. Gel set is J$6,500 — want it?" },
            { from: "user", text: "Yes!" },
            { from: "ai", text: "Booked ✓ deposit link sent 🔒" },
          ]}
        />
      </div>
      <div className="my-auto space-y-1.5">
        {["Service ✓", "Time ✓", "Deposit link ✓"].map((s, i) => (
          <span
            key={s}
            className="pm-cycle flex w-fit items-center rounded-md border border-ink-900/15 bg-ink-50 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wide text-ink-900"
            style={{ "--pm-d": `${1.4 + i * 0.9}s`, "--pm-dur": "9s" } as CSSProperties}
          >
            {s}
          </span>
        ))}
        <p className="pt-1 font-mono text-[7px] uppercase tracking-[0.18em] text-ink-300">slot-filling · 24/7 · trained on your prices</p>
      </div>
    </div>
  );
}

function ScenePipeline() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-6 py-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="pm-ping absolute inline-flex h-full w-full rounded-full border-2 border-ink-900" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ink-900" />
        </span>
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-ink-900">New booking just landed in your CRM</span>
      </div>
      <div className="min-h-0 flex-1">
        <Kanban accent="#141414" cols={["New", "Confirmed", "Done"]} dur={4.4} stubRows={[3, 2, 2]} />
      </div>
    </div>
  );
}

function SceneConfirm() {
  return (
    <div className="relative h-full w-full bg-white px-6 py-5">
      <Cursor variant={4} />
      <span className="pm-click h-9 w-9" style={{ left: "44%", top: "59%" }} />
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <div className="w-full max-w-[340px] rounded-xl border border-line bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-ink-900">Shanice W. — Gel set</p>
              <p className="font-mono text-[7px] uppercase tracking-wide text-ink-400">Fri 2:00 PM · deposit paid</p>
            </div>
            <SwapPill a="Requested" b="Confirmed" accent="#16a34a" dur={4.6} />
          </div>
          <div className="mt-3 flex gap-2">
            <span className="pm-press inline-flex flex-1 items-center justify-center rounded-full bg-ink-900 px-3 py-1.5 font-mono text-[7.5px] font-bold uppercase tracking-wide text-white">
              Confirm ✓
            </span>
            <span className="inline-flex items-center justify-center rounded-full border border-line px-3 py-1.5 font-mono text-[7.5px] font-bold uppercase tracking-wide text-ink-400">
              Reschedule
            </span>
          </div>
        </div>
        <p className="pm-after-click font-mono text-[7.5px] font-bold uppercase tracking-[0.16em] text-ink-900">
          ✓ Confirmation + reminder sent automatically
        </p>
      </div>
    </div>
  );
}

function ScenePaid() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-6 bg-white px-6 py-5">
      <div className="relative w-full max-w-[300px] rounded-xl border border-line bg-white p-4 shadow-sm">
        <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-ink-400">Invoice INV-0291</p>
        <div className="mt-2 space-y-1.5">
          <Stub w="64%" h={4} />
          <Stub w="42%" h={4} tone="bg-ink-100" />
        </div>
        <div className="mt-3 flex items-baseline justify-between border-t border-line pt-2">
          <span className="font-mono text-[7px] uppercase tracking-wide text-ink-400">Total</span>
          <span className="font-display text-lg font-bold text-ink-900">J$6,500</span>
        </div>
        <span
          className="pm-stamp absolute -right-3 -top-3 rotate-12 rounded-md border-2 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ borderColor: "#16a34a", color: "#16a34a", background: "#16a34a14", "--pm-d": "1.6s", "--pm-dur": "4.6s" } as CSSProperties}
        >
          Paid
        </span>
      </div>
      <div className="hidden flex-col gap-1 sm:flex">
        <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-ink-400">Collected this week</p>
        <Odometer values={["J$41,500", "J$48,000", "J$54,500", "J$61,000"]} dur={4.6} className="font-display text-2xl font-bold text-ink-900" />
        <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-ink-300">card · bank transfer · cash logged</p>
      </div>
    </div>
  );
}

function SceneDashboard() {
  return (
    <div className="flex h-full w-full flex-col gap-2 bg-white px-6 py-5">
      <div className="flex gap-2">
        <Kpi label="Revenue" values={["J$1.2m", "J$1.4m", "J$1.7m", "J$2.1m"]} accent={ACCENT} suffix="▲" />
        <Kpi label="Bookings" values={["118", "126", "139", "151"]} accent={ACCENT} d={0.3} suffix="▲" />
        <Kpi label="Repeat clients" values={["41%", "47%", "53%", "58%"]} accent={ACCENT} d={0.6} suffix="▲" />
      </div>
      <div className="min-h-0 flex-1 rounded-xl border border-line p-2">
        <ChartLine accent="#141414" dur={4.6} />
      </div>
      <div className="flex items-center justify-between">
        <Punch accent="#141414" n={8} filled={6} dur={4.6} size="h-3 w-3" />
        <p className="font-mono text-[7px] font-bold uppercase tracking-[0.2em] text-ink-900">All of it — under your brand.</p>
      </div>
    </div>
  );
}

const SCENES = [
  { title: "A customer lands on your branded site", sub: "included with every system", render: SceneSite },
  { title: "Your AI receptionist answers & books — 24/7", sub: "chatbot + voice agent", render: SceneChat },
  { title: "The job lands in your pipeline", sub: "no copy-paste, no DMs lost", render: ScenePipeline },
  { title: "You confirm with one click", sub: "reminders go out automatically", render: SceneConfirm },
  { title: "Invoice out. Money in.", sub: "COD, card & transfer tracked", render: ScenePaid },
  { title: "Your dashboard ticks up", sub: "every number, live", render: SceneDashboard },
];

/* ------------------------- player ------------------------- */

export function ProductTour() {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setScene((s) => (s + 1) % SCENES.length), SCENE_MS);
    return () => clearTimeout(t);
  }, [scene, playing]);

  const current = SCENES[scene];

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 shadow-2xl">
      {/* progress segments */}
      <div className="flex gap-1 px-3 pt-3">
        {SCENES.map((s, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Scene ${i + 1}: ${s.title}`}
            onClick={() => { setScene(i); setPlaying(true); }}
            className="h-1 flex-1 overflow-hidden rounded-full bg-white/15"
          >
            {i < scene ? (
              <span className="block h-full w-full bg-white" />
            ) : i === scene ? (
              <span
                key={`${scene}-${playing ? "r" : "p"}`}
                className="pm-seg block h-full bg-white"
                style={{ "--pm-dur": `${SCENE_MS / 1000}s`, animationPlayState: playing ? "running" : "paused" } as CSSProperties}
              />
            ) : null}
          </button>
        ))}
      </div>

      {/* stage */}
      <div className="p-3">
        <div className={`overflow-hidden rounded-xl border border-ink-800 ${playing ? "" : "pm-pause-all"}`}>
          <div key={scene} className="pm-scene pm-screen aspect-[16/9] sm:aspect-[2/1]">
            <current.render />
          </div>
        </div>
      </div>

      {/* control bar */}
      <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause tour" : "Play tour"}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white text-ink-950 transition-transform hover:scale-105"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-semibold text-white">{current.title}</p>
          <p className="truncate font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/45">{current.sub}</p>
        </div>
        <span className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-white/55">
          {String(scene + 1).padStart(2, "0")}/{String(SCENES.length).padStart(2, "0")}
        </span>
        <span className="hidden rounded-full border border-white/20 px-2.5 py-1 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white/55 sm:inline-flex">
          ● live motion · not a screenshot
        </span>
      </div>
    </div>
  );
}
