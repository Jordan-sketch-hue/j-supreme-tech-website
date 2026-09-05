import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, BookOpen, LayoutGrid, Mail, Newspaper, Rocket, LogOut } from "lucide-react";
import { createSupabaseServer } from "@/lib/supabase/server";
import { signout } from "@/app/(auth)/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your account — J Supreme Tech",
  robots: { index: false },
};

const TILES = [
  { href: "/products", icon: LayoutGrid, title: "Supreme Suite", body: "Browse the 13 systems and start a free trial." },
  { href: "/blog", icon: Newspaper, title: "The Signal", body: "The latest dispatches from the studio bench." },
  { href: "/library", icon: BookOpen, title: "The Library", body: "Your free e-books — automation, growth, shipping." },
  { href: "/contact", icon: Rocket, title: "Start a project", body: "Brief us on what you want built next." },
  { href: "/newsletter", icon: Mail, title: "In Today's World:", body: "Manage your newsletter subscription." },
];

export default async function AccountPage() {
  const supabase = await createSupabaseServer();
  if (!supabase) redirect("/login");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const name = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "there";

  // Lazily persist the customer profile (RLS scopes this to the signed-in user).
  await supabase
    .from("jst_profiles")
    .upsert({ id: user.id, full_name: name, email: user.email, updated_at: new Date().toISOString() }, { onConflict: "id" });
  const firstName = name.split(" ")[0];

  return (
    <main className="min-h-screen bg-white text-ink-900">
      <section className="border-b border-line bg-ink-50/60">
        <div className="shell flex flex-wrap items-end justify-between gap-6 py-12">
          <div>
            <span className="eyebrow">Studio account</span>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Welcome back, {firstName}.
            </h1>
            <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-400">{user.email}</p>
          </div>
          <form action={signout}>
            <button type="submit" className="btn btn-outline">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </section>

      <section className="shell section !py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t) => (
            <Link key={t.href} href={t.href} className="group">
              <article className="card card-hover h-full p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-50">
                  <t.icon className="h-5 w-5 text-ink-900" />
                </span>
                <h2 className="mt-5 flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight">
                  {t.title}
                  <ArrowUpRight className="h-4 w-4 text-ink-300 transition group-hover:text-ink-900" />
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{t.body}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
