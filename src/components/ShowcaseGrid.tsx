"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, Megaphone } from "lucide-react";
import { BrowserFrame } from "@/components/DeviceFrame";
import { RevealGroup, RevealItem } from "@/components/motion-kit";
import { GROUPS, MARKETING_SAMPLES, PROJECTS, type Group } from "@/lib/portfolio";
import { CASE_STUDIES } from "@/lib/caseStudies";
import Link from "next/link";

const REELS = [
  { src: "/reels/aboo-tours-reel.mp4",        client: "Aboo Tours" },
  { src: "/reels/876-luxury-carwash-reel.mp4", client: "876 Car Wash" },
  { src: "/reels/language-cradle-reel.mp4",   client: "Language Cradle" },
  { src: "/reels/lc-tip-2026-07-01.mp4",      client: "Language Cradle" },
  { src: "/reels/bp-couriers-reel.mp4",        client: "BP Couriers" },
  { src: "/reels/ship2door-reel.mp4",          client: "Ship 2 Door" },
];

type WorkTab = "tech" | "marketing";

export function ShowcaseGrid() {
  const [workTab, setWorkTab] = useState<WorkTab>("tech");
  const [group, setGroup] = useState<Group>("All");

  const techProjects = useMemo(
    () => (group === "All" ? PROJECTS : PROJECTS.filter((p) => p.group === group)),
    [group],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: PROJECTS.length };
    for (const p of PROJECTS) map[p.group] = (map[p.group] ?? 0) + 1;
    return map;
  }, []);

  return (
    <div>
      {/* ── Top-level Tech / Marketing toggle ── */}
      <div className="mt-10 flex gap-2">
        <WorkTabBtn
          active={workTab === "tech"}
          onClick={() => setWorkTab("tech")}
          icon={<Code2 className="h-3.5 w-3.5" />}
          label="Tech Work"
          count={PROJECTS.length}
        />
        <WorkTabBtn
          active={workTab === "marketing"}
          onClick={() => setWorkTab("marketing")}
          icon={<Megaphone className="h-3.5 w-3.5" />}
          label="Marketing & Design"
          count={MARKETING_SAMPLES.length}
        />
      </div>

      {/* ── TECH: category sub-filter + grid ── */}
      {workTab === "tech" && (
        <>
          <div className="mt-6 flex flex-wrap gap-2">
            {GROUPS.map((g) => {
              const on = g === group;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.12em] transition ${
                    on
                      ? "border-ink-900 bg-ink-900 text-white"
                      : "border-line bg-white text-ink-600 hover:border-ink-900 hover:text-ink-900"
                  }`}
                >
                  {g}
                  <span className={on ? "text-white/60" : "text-ink-400"}>
                    {counts[g] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          <RevealGroup
            amount={0.05}
            className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
          >
            {techProjects.map((p) => {
              const cs = CASE_STUDIES.find((c) => c.host === p.host);
              return (
                <RevealItem key={p.host}>
                  <div className="group block">
                    <a href={`https://${p.host}`} target="_blank" rel="noreferrer">
                      <BrowserFrame
                        host={p.host}
                        alt={`${p.name} — ${p.tag}`}
                        className="transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_34px_64px_-30px_rgba(0,0,0,0.4)]"
                      />
                    </a>
                    <div className="mt-5 px-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-ink-400">{p.n}</span>
                        <span className="tag">{p.tag}</span>
                        <a
                          href={`https://${p.host}`}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-400 opacity-0 transition group-hover:opacity-100"
                        >
                          Live <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-ink-900">{p.name}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-ink-500">{p.blurb}</p>
                      {cs && (
                        <Link
                          href={`/work/${cs.slug}`}
                          className="mt-3 inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-500 hover:text-ink-900 underline underline-offset-4"
                        >
                          Read case study <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </>
      )}

      {/* ── MARKETING: reels + feed + stories ── */}
      {workTab === "marketing" && (
        <>
          <p className="mt-6 text-sm leading-7 text-ink-500 max-w-xl">
            Social campaigns, reels, ad creative, and brand content — real work run for live
            clients across Jamaica and the Caribbean.
          </p>

          {/* Reels row */}
          <div className="mt-10">
            <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-400">Reels</p>
            <RevealGroup className="grid gap-4 grid-cols-2 sm:grid-cols-4" amount={0.05}>
              {REELS.map((r) => (
                <RevealItem key={r.src}>
                  <div className="group overflow-hidden rounded-xl border border-line bg-ink-900">
                    <div className="relative aspect-[9/16] w-full overflow-hidden sm:aspect-[4/5]">
                      <video
                        src={r.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between border-t border-white/[0.08] px-3 py-2">
                      <span className="font-mono text-[0.57rem] uppercase tracking-[0.16em] text-white/40">{r.client}</span>
                      <span className="tag tag-dark text-[0.55rem]">Reel</span>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Feed posts */}
          <div className="mt-8">
            <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-400">Feed Posts</p>
            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.05}>
              {MARKETING_SAMPLES.filter((s) => s.tag === "Feed").map((s) => (
                <RevealItem key={s.src}>
                  <div className="group relative overflow-hidden rounded-xl border border-line bg-ink-50">
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={s.src}
                        alt={s.title}
                        fill
                        sizes="(max-width:640px) 50vw, 25vw"
                        className="object-cover object-center transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between border-t border-line px-3 py-2">
                      <span className="font-mono text-[0.57rem] uppercase tracking-[0.16em] text-ink-500">{s.client}</span>
                      <span className="tag text-[0.55rem]">Feed</span>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Stories */}
          <div className="mt-8">
            <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-400">Stories</p>
            <RevealGroup className="grid gap-4 grid-cols-3 sm:grid-cols-4 lg:grid-cols-6" amount={0.05}>
              {MARKETING_SAMPLES.filter((s) => s.tag === "Story").map((s) => (
                <RevealItem key={s.src}>
                  <div className="group overflow-hidden rounded-xl border border-line bg-ink-50">
                    <div className="relative aspect-[9/16] w-full overflow-hidden">
                      <Image
                        src={s.src}
                        alt={s.title}
                        fill
                        sizes="20vw"
                        className="object-cover object-center transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Marketing services callout */}
          <div className="mt-12 rounded-2xl border border-line bg-ink-950 p-8 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                  Done-for-you
                </span>
                <h3 className="mt-2 text-2xl font-semibold">
                  Social media management. Ads. Brand strategy.
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/60">
                  Monthly retainer packages — content, reels, paid ads, reporting.
                  We run the brand while you run the business.
                </p>
              </div>
              <a
                href="#services"
                className="btn btn-on-dark shrink-0"
              >
                See marketing packages
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function WorkTabBtn({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-mono text-sm font-semibold tracking-wide transition ${
        active
          ? "border-ink-900 bg-ink-900 text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
          : "border-line bg-white text-ink-600 hover:border-ink-900 hover:text-ink-900"
      }`}
    >
      {icon}
      {label}
      <span className={`ml-1 rounded-full px-2 py-0.5 text-[0.6rem] ${active ? "bg-white/15 text-white" : "bg-ink-100 text-ink-500"}`}>
        {count}
      </span>
    </button>
  );
}
