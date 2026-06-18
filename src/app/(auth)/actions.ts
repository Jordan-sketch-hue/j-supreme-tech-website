"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";

const SITE = process.env.NEXT_PUBLIC_APP_URL || "https://jsupremetech.online";

export type AuthState = { error?: string; message?: string; ok?: boolean };

function safeNext(next: unknown): string {
  const n = typeof next === "string" ? next : "";
  return n.startsWith("/") && !n.startsWith("//") ? n : "/account";
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Email and password are required." };

  const supabase = await createSupabaseServer();
  if (!supabase) return { error: "Authentication isn't configured yet. Add Supabase keys and redeploy." };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect(safeNext(formData.get("next")));
}

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!name || !email || !password) return { error: "Name, email and password are required." };
  if (password.length < 8) return { error: "Use at least 8 characters for your password." };

  const supabase = await createSupabaseServer();
  if (!supabase) return { error: "Authentication isn't configured yet. Add Supabase keys and redeploy." };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name }, emailRedirectTo: `${SITE}/account` },
  });
  if (error) return { error: error.message };

  // Email confirmation is enabled on this project — session is null until confirmed.
  if (!data.session) {
    return { ok: true, message: "Almost there — check your inbox to confirm your account." };
  }
  redirect("/account");
}

export async function requestPasswordReset(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email) return { error: "Enter your email." };
  const supabase = await createSupabaseServer();
  if (!supabase) return { error: "Authentication isn't configured yet." };
  await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${SITE}/account` });
  // Always report success to avoid leaking which emails exist.
  return { ok: true, message: "If that email is registered, a reset link is on its way." };
}

export async function signout(): Promise<void> {
  const supabase = await createSupabaseServer();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}
