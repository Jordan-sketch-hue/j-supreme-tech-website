"use client";

import { useState } from "react";
import { Link2, Check, MessageCircle } from "lucide-react";

const BASE = "https://jsupremetech.online";

export function ShareBar({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${BASE}/blog/${slug}`;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const targets: { label: string; href: string; glyph: React.ReactNode }[] = [
    { label: "Reddit", href: `https://www.reddit.com/submit?url=${u}&title=${t}`, glyph: <span className="font-mono text-[0.7rem] font-bold">r/</span> },
    { label: "Hacker News", href: `https://news.ycombinator.com/submitlink?u=${u}&t=${t}`, glyph: <span className="font-mono text-[0.7rem] font-bold">Y</span> },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, glyph: <span className="font-display text-sm font-bold">𝕏</span> },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, glyph: <span className="font-display text-[0.7rem] font-bold">in</span> },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, glyph: <span className="font-display text-sm font-bold">f</span> },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, glyph: <MessageCircle className="h-3.5 w-3.5" /> },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-400">Share</span>
      {targets.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer noopener"
          title={`Share to ${s.label}`}
          aria-label={`Share to ${s.label}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-700 transition hover:-translate-y-0.5 hover:border-ink-900 hover:text-ink-900"
        >
          {s.glyph}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        title="Copy link"
        aria-label="Copy link"
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-ink-700 transition hover:-translate-y-0.5 hover:border-ink-900 hover:text-ink-900"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em]">{copied ? "Copied" : "Link"}</span>
      </button>
    </div>
  );
}
