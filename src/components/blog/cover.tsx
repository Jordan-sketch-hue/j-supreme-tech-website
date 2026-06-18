import type { CoverMotif } from "@/lib/blog-taxonomy";

/* ============================================================
   Generative mono cover art — pure deterministic SVG.
   No external images: every article + figure renders its own
   black-and-white motif, seeded from the slug so it's stable.
   ============================================================ */

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STROKE = "#141414";
const FAINT = "rgba(20,20,20,0.10)";

function Motif({ motif, seed }: { motif: CoverMotif; seed: number }) {
  const rnd = mulberry32(seed);
  const W = 800;
  const H = 500;

  switch (motif) {
    case "ledger": {
      // Candlestick field — trading.
      const bars = Array.from({ length: 26 }, (_, i) => {
        const x = 40 + i * 29;
        const mid = 250 + Math.sin(i * 0.6 + seed) * 70 + (rnd() - 0.5) * 40;
        const h = 24 + rnd() * 120;
        const wick = 18 + rnd() * 40;
        const up = rnd() > 0.45;
        return { x, y: mid - h / 2, h, wick, up };
      });
      return (
        <g>
          {[120, 250, 380].map((y) => (
            <line key={y} x1={20} y1={y} x2={W - 20} y2={y} stroke={FAINT} />
          ))}
          {bars.map((b, i) => (
            <g key={i}>
              <line x1={b.x + 7} y1={b.y - b.wick} x2={b.x + 7} y2={b.y + b.h + b.wick} stroke={STROKE} strokeWidth={1.2} />
              <rect
                x={b.x}
                y={b.y}
                width={14}
                height={b.h}
                fill={b.up ? "#ffffff" : STROKE}
                stroke={STROKE}
                strokeWidth={1.4}
              />
            </g>
          ))}
        </g>
      );
    }
    case "pulse": {
      // ECG / heartbeat line — dispatches.
      let d = `M 0 250`;
      let x = 0;
      while (x < W) {
        const flat = 30 + rnd() * 50;
        d += ` L ${x + flat} 250`;
        x += flat;
        d += ` L ${x + 10} ${250 - (40 + rnd() * 120)} L ${x + 20} ${250 + (40 + rnd() * 90)} L ${x + 30} 250`;
        x += 30;
      }
      return (
        <g>
          <line x1={0} y1={250} x2={W} y2={250} stroke={FAINT} />
          <path d={d} fill="none" stroke={STROKE} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        </g>
      );
    }
    case "nodes": {
      const pts = Array.from({ length: 16 }, () => ({ x: 60 + rnd() * (W - 120), y: 50 + rnd() * (H - 100) }));
      return (
        <g>
          {pts.map((p, i) =>
            pts.slice(i + 1).map((q, j) => {
              const dist = Math.hypot(p.x - q.x, p.y - q.y);
              if (dist > 190) return null;
              return <line key={`${i}-${j}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={FAINT} />;
            }),
          )}
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={i % 4 === 0 ? 6 : 3.2} fill={i % 4 === 0 ? STROKE : "#ffffff"} stroke={STROKE} strokeWidth={1.4} />
          ))}
        </g>
      );
    }
    case "orbit": {
      return (
        <g>
          {[60, 120, 180, 240].map((r, i) => (
            <ellipse key={r} cx={W / 2} cy={H / 2} rx={r * 1.4} ry={r} fill="none" stroke={i === 1 ? STROKE : FAINT} strokeWidth={i === 1 ? 1.6 : 1} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => {
            const a = rnd() * Math.PI * 2;
            const r = 60 + i * 45;
            return <circle key={i} cx={W / 2 + Math.cos(a) * r * 1.4} cy={H / 2 + Math.sin(a) * r} r={5} fill={STROKE} />;
          })}
          <circle cx={W / 2} cy={H / 2} r={14} fill={STROKE} />
        </g>
      );
    }
    case "wave": {
      const lines = Array.from({ length: 9 }, (_, i) => {
        const yBase = 70 + i * 42;
        let d = `M 0 ${yBase}`;
        for (let x = 0; x <= W; x += 20) {
          d += ` L ${x} ${yBase + Math.sin(x * 0.012 + i * 0.5 + seed) * (10 + i * 2)}`;
        }
        return <path key={i} d={d} fill="none" stroke={i === 4 ? STROKE : FAINT} strokeWidth={i === 4 ? 1.8 : 1} />;
      });
      return <g>{lines}</g>;
    }
    case "circuit": {
      const traces = Array.from({ length: 14 }, (_, i) => {
        let x = rnd() * W;
        let y = rnd() * H;
        let d = `M ${x} ${y}`;
        const segs = 3 + Math.floor(rnd() * 4);
        for (let s = 0; s < segs; s++) {
          if (rnd() > 0.5) x += (rnd() - 0.5) * 200;
          else y += (rnd() - 0.5) * 160;
          x = Math.max(20, Math.min(W - 20, x));
          y = Math.max(20, Math.min(H - 20, y));
          d += ` L ${x} ${y}`;
        }
        return { d, x, y, i };
      });
      return (
        <g>
          {traces.map((t) => (
            <path key={t.i} d={t.d} fill="none" stroke={t.i % 3 === 0 ? STROKE : FAINT} strokeWidth={1.3} />
          ))}
          {traces.map((t) => (
            <circle key={`p${t.i}`} cx={t.x} cy={t.y} r={3} fill={STROKE} />
          ))}
        </g>
      );
    }
    case "stack": {
      return (
        <g>
          {Array.from({ length: 6 }, (_, i) => (
            <rect
              key={i}
              x={150 + i * 14}
              y={90 + i * 36}
              width={400}
              height={120}
              rx={12}
              fill="#ffffff"
              stroke={i === 0 ? STROKE : FAINT}
              strokeWidth={i === 0 ? 1.8 : 1}
            />
          ))}
        </g>
      );
    }
    case "aperture": {
      const cx = W / 2;
      const cy = H / 2;
      const r = 150;
      const blades = Array.from({ length: 8 }, (_, i) => {
        const a0 = (i / 8) * Math.PI * 2 + seed;
        const a1 = a0 + Math.PI / 4;
        return `M ${cx} ${cy} L ${cx + Math.cos(a0) * r} ${cy + Math.sin(a0) * r} A ${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r} Z`;
      });
      return (
        <g>
          <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke={FAINT} strokeWidth={1.2} />
          {blades.map((d, i) => (
            <path key={i} d={d} fill={i % 2 ? "#ffffff" : "rgba(20,20,20,0.05)"} stroke={STROKE} strokeWidth={1.2} />
          ))}
          <circle cx={cx} cy={cy} r={46} fill="#ffffff" stroke={STROKE} strokeWidth={1.8} />
        </g>
      );
    }
    case "signal": {
      const cx = 120;
      const cy = H - 90;
      return (
        <g>
          {[40, 90, 140, 190, 240, 300].map((r, i) => (
            <path
              key={r}
              d={`M ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${cx} ${cy - r}`}
              fill="none"
              stroke={i === 2 ? STROKE : FAINT}
              strokeWidth={i === 2 ? 1.8 : 1.1}
            />
          ))}
          <circle cx={cx} cy={cy} r={9} fill={STROKE} />
        </g>
      );
    }
    case "grid":
    default: {
      const cells: React.ReactNode[] = [];
      const cols = 16;
      const rows = 10;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const on = rnd() > 0.86;
          if (on) cells.push(<rect key={`${r}-${c}`} x={c * 50} y={r * 50} width={50} height={50} fill="rgba(20,20,20,0.07)" />);
        }
      }
      return (
        <g>
          {cells}
          {Array.from({ length: cols + 1 }, (_, c) => (
            <line key={`v${c}`} x1={c * 50} y1={0} x2={c * 50} y2={H} stroke={FAINT} />
          ))}
          {Array.from({ length: rows + 1 }, (_, r) => (
            <line key={`h${r}`} x1={0} y1={r * 50} x2={W} y2={r * 50} stroke={FAINT} />
          ))}
        </g>
      );
    }
  }
}

export function Cover({
  motif,
  seed,
  className = "",
  label,
}: {
  motif: CoverMotif;
  seed: string;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-ink-50 ${className}`}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label={label ?? "Article cover"}>
        <rect width={800} height={500} fill="#fafafa" />
        <Motif motif={motif} seed={hash(seed)} />
      </svg>
    </div>
  );
}

export function Figure({ motif, seed, caption }: { motif: CoverMotif; seed: string; caption?: string }) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line">
      <div className="aspect-[16/9] bg-ink-50">
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label={caption ?? "Figure"}>
          <rect width={800} height={500} fill="#fafafa" />
          <Motif motif={motif} seed={hash(seed)} />
        </svg>
      </div>
      {caption ? (
        <figcaption className="border-t border-line bg-white px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
