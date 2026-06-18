import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Subscription confirmed — J Supreme Tech",
  robots: { index: false },
};

export default async function ConfirmedPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const ok = status === "ok";

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-20 text-ink-900">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-ink-50">
          {ok ? <CheckCircle2 className="h-8 w-8 text-ink-900" /> : <AlertCircle className="h-8 w-8 text-ink-500" />}
        </div>
        <h1 className="mt-7 font-display text-3xl font-semibold tracking-tight">
          {ok ? "You're confirmed." : "Link not valid"}
        </h1>
        <p className="mt-3 leading-relaxed text-ink-600">
          {ok
            ? "Welcome to the Communications Debrief. Your first dispatch is on its way — check your inbox."
            : "This confirmation link is invalid or has already been used. Try subscribing again."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/blog" className="btn btn-dark">Read The Signal</Link>
          <Link href="/library" className="btn btn-outline">Browse the Library</Link>
        </div>
      </div>
    </main>
  );
}
