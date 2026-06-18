"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle, MailCheck } from "lucide-react";
import { requestPasswordReset, type AuthState } from "@/app/(auth)/actions";

const FIELD =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-ink-900";

export function ForgotForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(requestPasswordReset, {});

  if (state.ok && state.message) {
    return (
      <div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink-50">
          <MailCheck className="h-7 w-7 text-ink-900" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight">Check your email</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{state.message}</p>
        <Link href="/login" className="btn btn-outline mt-7">Back to sign in</Link>
      </div>
    );
  }

  return (
    <div>
      <span className="eyebrow no-rule">Reset access</span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">Forgot password</h1>
      <p className="mt-2 text-sm text-ink-500">We&apos;ll email you a secure link to set a new one.</p>

      <form action={action} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-500">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={FIELD} />
        </div>
        {state.error ? (
          <p className="flex items-center gap-2 rounded-lg border border-line bg-ink-50 px-3 py-2.5 text-xs text-ink-700">
            <AlertCircle className="h-3.5 w-3.5 flex-none" /> {state.error}
          </p>
        ) : null}
        <button type="submit" disabled={pending} className="btn btn-dark w-full disabled:opacity-60">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send reset link <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-ink-500">
        Remembered it? <Link href="/login" className="font-semibold text-ink-900 underline underline-offset-4">Sign in</Link>
      </p>
    </div>
  );
}
