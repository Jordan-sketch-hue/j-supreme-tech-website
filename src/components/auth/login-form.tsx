"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { login, type AuthState } from "@/app/(auth)/actions";

const FIELD =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-ink-900";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(login, {});

  return (
    <div>
      <span className="eyebrow no-rule">Welcome back</span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 text-sm text-ink-500">Access your studio account and trials.</p>

      <form action={action} className="mt-8 space-y-5">
        {next ? <input type="hidden" name="next" value={next} /> : null}
        <div>
          <label htmlFor="email" className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-500">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={FIELD} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-500">Password</label>
            <Link href="/forgot-password" className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-400 hover:text-ink-900">Forgot?</Link>
          </div>
          <input id="password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••" className={FIELD} />
        </div>

        {state.error ? (
          <p className="flex items-center gap-2 rounded-lg border border-line bg-ink-50 px-3 py-2.5 text-xs text-ink-700">
            <AlertCircle className="h-3.5 w-3.5 flex-none" /> {state.error}
          </p>
        ) : null}

        <button type="submit" disabled={pending} className="btn btn-dark w-full disabled:opacity-60">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-ink-500">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-ink-900 underline underline-offset-4">Create an account</Link>
      </p>
    </div>
  );
}
