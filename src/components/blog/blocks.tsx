import Link from "next/link";
import { Info, TriangleAlert, Sparkles, ArrowRight } from "lucide-react";
import { type Block, headingId } from "@/lib/blog-taxonomy";
import { Figure } from "./cover";
import { AdSlot } from "@/components/ads/ad-slot";
import { affiliate } from "@/lib/affiliates";

/* ---------- safe inline markdown: **b** *i* `code` [label](href)
   plus [label](aff:<partner-id>) for tracked, FTC-compliant affiliate links ---------- */
function renderInline(text: string, keyPrefix = "i"): React.ReactNode[] {
  // IMPORTANT: build a fresh regex per call. A shared /g regex is stateful
  // (lastIndex), and this function recurses for nested inline text — a shared
  // instance corrupts the parent loop and spins forever. Local = recursion-safe.
  const INLINE = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${k++}`;
    if (m[1] !== undefined) {
      const label = m[2];
      const href = m[3];
      if (href.startsWith("aff:")) {
        // Tracked affiliate link. Pull the live URL from the registry so tracked
        // URLs live in ONE place, and tag it with the rel Google requires for paid
        // links. Falls back to plain text until the partner is live — prose never
        // ships a dead or untagged affiliate link.
        const a = affiliate(href.slice(4));
        nodes.push(
          a && a.live && !a.href.includes("REPLACE_ME") ? (
            <a key={key} href={a.href} target="_blank" rel="sponsored nofollow noopener" className="font-medium text-ink-900 underline decoration-ink-300 underline-offset-4 transition hover:decoration-ink-900">
              {renderInline(label, key)}
            </a>
          ) : (
            <span key={key}>{renderInline(label, key)}</span>
          ),
        );
      } else {
        const external = /^https?:\/\//.test(href);
        nodes.push(
          external ? (
            <a key={key} href={href} target="_blank" rel="noreferrer noopener" className="font-medium text-ink-900 underline decoration-ink-300 underline-offset-4 transition hover:decoration-ink-900">
              {renderInline(label, key)}
            </a>
          ) : (
            <Link key={key} href={href} className="font-medium text-ink-900 underline decoration-ink-300 underline-offset-4 transition hover:decoration-ink-900">
              {renderInline(label, key)}
            </Link>
          ),
        );
      }
    } else if (m[4] !== undefined) {
      nodes.push(<strong key={key} className="font-semibold text-ink-900">{renderInline(m[5], key)}</strong>);
    } else if (m[6] !== undefined) {
      nodes.push(<em key={key} className="italic">{renderInline(m[7], key)}</em>);
    } else if (m[8] !== undefined) {
      nodes.push(<code key={key} className="rounded-md border border-line bg-ink-50 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-800">{m[9]}</code>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const CALLOUT_ICON = { info: Info, warn: TriangleAlert, insight: Sparkles } as const;

function BlockView({ block, seed, i }: { block: Block; seed: string; i: number }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="mt-2 font-display text-xl leading-relaxed text-ink-700 sm:text-[1.45rem] sm:leading-[1.7]">
          {renderInline(block.text)}
        </p>
      );
    case "h2":
      return (
        <h2 id={headingId(block.text)} className="group mt-14 scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-[1.9rem]">
          {renderInline(block.text)}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-10 font-display text-xl font-semibold tracking-tight text-ink-900">
          {renderInline(block.text)}
        </h3>
      );
    case "p":
      return <p className="mt-5 text-[1.06rem] leading-[1.85] text-ink-700">{renderInline(block.text)}</p>;
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-ink-900 pl-6">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink-900 sm:text-[1.75rem]">
            {renderInline(block.text)}
          </p>
          {block.cite ? (
            <cite className="mt-4 block font-mono text-[0.72rem] uppercase not-italic tracking-[0.16em] text-ink-500">
              — {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((it, j) => (
            <li key={j} className="flex gap-3 text-[1.05rem] leading-[1.8] text-ink-700">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-ink-900" />
              <span>{renderInline(it, `ul${i}-${j}`)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 space-y-2.5">
          {block.items.map((it, j) => (
            <li key={j} className="flex gap-3.5 text-[1.05rem] leading-[1.8] text-ink-700">
              <span aria-hidden className="mt-0.5 font-mono text-sm font-bold text-ink-400">{String(j + 1).padStart(2, "0")}</span>
              <span>{renderInline(it, `ol${i}-${j}`)}</span>
            </li>
          ))}
        </ol>
      );
    case "callout": {
      const variant = block.variant ?? "info";
      const Icon = CALLOUT_ICON[variant];
      const dark = variant === "insight";
      return (
        <aside className={`my-9 rounded-2xl border p-6 ${dark ? "border-ink-950 bg-ink-950 text-white" : "border-line bg-ink-50"}`}>
          <div className="flex items-center gap-2.5">
            <Icon className={`h-4 w-4 ${dark ? "text-white" : "text-ink-900"}`} />
            <span className={`font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/70" : "text-ink-500"}`}>
              {block.title ?? (variant === "warn" ? "Take care" : variant === "insight" ? "Insight" : "Note")}
            </span>
          </div>
          <p className={`mt-3 text-[1rem] leading-relaxed ${dark ? "text-white/85" : "text-ink-700"}`}>
            {renderInline(block.text, `co${i}`)}
          </p>
        </aside>
      );
    }
    case "code":
      return (
        <div className="my-8 overflow-hidden rounded-2xl border border-ink-200">
          <div className="flex items-center justify-between border-b border-ink-200 bg-ink-100 px-4 py-2">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-500">{block.lang ?? "code"}</span>
            <span aria-hidden className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ink-300" />
              <span className="h-2 w-2 rounded-full bg-ink-300" />
              <span className="h-2 w-2 rounded-full bg-ink-300" />
            </span>
          </div>
          <pre className="overflow-x-auto bg-white px-5 py-4 text-[0.85rem] leading-relaxed">
            <code className="font-mono text-ink-800">{block.code}</code>
          </pre>
        </div>
      );
    case "figure":
      return <Figure motif={block.motif} seed={`${seed}-fig-${i}`} caption={block.caption} />;
    case "stat":
      return (
        <div className="my-9 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {block.items.map((s, j) => (
            <div key={j} className="bg-white p-6">
              <div className="font-display text-3xl font-semibold tracking-tight text-ink-900">{s.value}</div>
              <div className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>
      );
    case "divider":
      return <div className="mx-auto my-12 flex max-w-[8rem] items-center justify-center gap-2" aria-hidden><span className="h-1 w-1 rounded-full bg-ink-300" /><span className="h-1 w-1 rounded-full bg-ink-300" /><span className="h-1 w-1 rounded-full bg-ink-300" /></div>;
    case "callforward":
      return (
        <div className="my-10 flex flex-col items-start gap-4 rounded-2xl border border-ink-950 bg-ink-950 p-7 text-white sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[1.02rem] leading-relaxed text-white/85">{renderInline(block.text, `cf${i}`)}</p>
          {block.cta ? (
            <Link href={block.cta.href} className="btn btn-on-dark flex-none">
              {block.cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      );
    default:
      return null;
  }
}

export function ArticleBody({ blocks, seed }: { blocks: Block[]; seed: string }) {
  // Place one in-article ad on longer posts, just before the second section heading
  // (a natural reading break). Short posts get no mid-article unit. Foot-of-article
  // monetization lives on the article page itself.
  const h2s = blocks.map((b, i) => (b.type === "h2" ? i : -1)).filter((i) => i > 2);
  const adAt = blocks.length >= 8 && h2s.length >= 2 ? h2s[1] : -1;

  return (
    <div>
      {blocks.map((b, i) => (
        <div key={i}>
          {i === adAt ? <AdSlot slot="inArticle" /> : null}
          <BlockView block={b} seed={seed} i={i} />
        </div>
      ))}
    </div>
  );
}

export { renderInline };
