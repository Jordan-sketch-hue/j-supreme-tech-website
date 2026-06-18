"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { signup, type AuthState } from "@/app/(auth)/actions";

const FIELD =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-ink-900";

export function SignupForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signup, {});

  if (state.ok && state.message) {
    return (
      <div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink-50">
          <CheckCircle2 className="h-7 w-7 text-ink-900" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight">Check your inbox</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{state.message}</p>
        <Link href="/login" className="btn btn-outline mt-7">Back to sign in</Link>
      </div>
    );
  }

  return (
    <div>
      <span className="eyebrow no-rule">Get started</span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">Create your account</h1>
      <p className="mt-2 text-sm text-ink-500">Projects, trials and the Debrief — one login.</p>

      <form action={action} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-500">Full name</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Founder" className={FIELD} />
        </div>
        <div>
          <label htmlFor="email" className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-500">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={FIELD} />
        </div>
        <div>
          <label htmlFor="password" className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-500">Password</label>
          <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" className={FIELD} />
        </div>

        {state.error ? (
          <p className="flex items-center gap-2 rounded-lg border border-line bg-ink-50 px-3 py-2.5 text-xs text-ink-700">
            <AlertCircle className="h-3.5 w-3.5 flex-none" /> {state.error}
          </p>
        ) : null}

        <button type="submit" disabled={pending} className="btn btn-dark w-full disabled:opacity-60">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create account <ArrowRight className="h-4 w-4" /></>}
        </button>

        <p className="text-[0.7rem] leading-relaxed text-ink-400">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="underline hover:text-ink-900">Terms</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-ink-900">Privacy Policy</Link>.
        </p>
      </form>

      <p className="mt-7 text-center text-sm text-ink-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-ink-900 underline underline-offset-4">Sign in</Link>
      </p>
    </div>
  );
}
