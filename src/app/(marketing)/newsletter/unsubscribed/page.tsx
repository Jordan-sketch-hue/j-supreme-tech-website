import type { Metadata } from "next";
import Link from "next/link";
import { MailX } from "lucide-react";

export const metadata: Metadata = {
  title: "Unsubscribed — J Supreme Tech",
  robots: { index: false },
};

export default async function UnsubscribedPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const ok = status === "ok";

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-20 text-ink-900">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-ink-50">
          <MailX className="h-8 w-8 text-ink-500" />
        </div>
        <h1 className="mt-7 font-display text-3xl font-semibold tracking-tight">
          {ok ? "You're unsubscribed." : "Link not valid"}
        </h1>
        <p className="mt-3 leading-relaxed text-ink-600">
          {ok
            ? "You've been removed from In Today's World:. No hard feelings — the door stays open if you change your mind."
            : "This link is invalid or already used. If you're still receiving emails, reply to any of them and we'll handle it."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/newsletter" className="btn btn-outline">Re-subscribe</Link>
          <Link href="/" className="btn btn-dark">Back to site</Link>
        </div>
      </div>
    </main>
  );
}
