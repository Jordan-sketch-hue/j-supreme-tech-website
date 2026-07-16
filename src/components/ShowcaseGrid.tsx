"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, Megaphone } from "lucide-react";
import { BrowserFrame } from "@/components/DeviceFrame";
import { RevealGroup, RevealItem } from "@/components/motion-kit";
import { GROUPS, MARKETING_SAMPLES, PROJECTS, type Group } from "@/lib/portfolio";

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
            {techProjects.map((p) => (
              <RevealItem key={p.host}>
                <a
                  href={`https://${p.host}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  <BrowserFrame
                    host={p.host}
                    alt={`${p.name} — ${p.tag}`}
                    className="transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_34px_64px_-30px_rgba(0,0,0,0.4)]"
                  />
                  <div className="mt-5 px-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-ink-400">{p.n}</span>
                      <span className="tag">{p.tag}</span>
                      <span className="ml-auto inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-400 opacity-0 transition group-hover:opacity-100">
                        Live
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-ink-900">{p.name}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-ink-500">{p.blurb}</p>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </>
      )}

      {/* ── MARKETING: masonry-style creative grid ── */}
      {workTab === "marketing" && (
        <>
          <p className="mt-6 text-sm leading-7 text-ink-500 max-w-xl">
            Social campaigns, ad creative, brand identities, and strategy decks — real work
            run for live clients across Jamaica and the Caribbean.
          </p>
          <RevealGroup
            amount={0.05}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {MARKETING_SAMPLES.map((s, i) => (
              <RevealItem key={s.src}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border border-line bg-ink-50 ${
                    i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={s.src}
                      alt={s.title}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="tag">{s.tag}</span>
                    <p className="mt-2 text-sm font-medium text-ink-900">{s.title}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

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
