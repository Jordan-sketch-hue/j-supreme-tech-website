import Link from "next/link";

/** Split-screen branded shell for auth screens — B&W, on-brand. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel */}
      <aside className="relative hidden overflow-hidden bg-ink-950 text-white lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-60" />
        <Link href="/" className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white font-mono text-[0.72rem] font-bold text-ink-950">JST</span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold">J Supreme Tech</span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/55">Creative Technology</span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/45">Your studio account</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight">
            One account for your projects, trials and In Today&apos;s World:.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Track what we&apos;re building together, manage your Supreme Suite trials, and keep every dispatch in one place.
          </p>
        </div>

        <p className="relative font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
          Systems That Work. Growth That Lasts.
        </p>
      </aside>

      {/* Right: form */}
      <section className="flex items-center justify-center bg-white px-6 py-12 text-ink-900">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-10 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900 font-mono text-[0.65rem] font-bold text-white">JST</span>
            <span className="font-display text-sm font-semibold">J Supreme Tech</span>
          </Link>
          {children}
        </div>
      </section>
    </main>
  );
}
