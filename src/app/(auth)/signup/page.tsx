import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create your account — J Supreme Tech",
  description: "Create a J Supreme Tech studio account to manage projects, trials and the Communications Debrief.",
  robots: { index: false },
};

export default function SignupPage() {
  return (
    <AuthShell>
      <SignupForm />
    </AuthShell>
  );
}
