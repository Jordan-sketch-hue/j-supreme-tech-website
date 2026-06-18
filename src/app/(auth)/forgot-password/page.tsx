import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotForm } from "@/components/auth/forgot-form";

export const metadata: Metadata = {
  title: "Forgot password — J Supreme Tech",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell>
      <ForgotForm />
    </AuthShell>
  );
}
