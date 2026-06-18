import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageCircle, ExternalLink, AlertTriangle } from "lucide-react";
import { ProjectIntakeForm } from "@/components/ProjectIntakeForm";
import { getOffer } from "@/lib/serviceOffers";

export const metadata = {
  title: "Start your project — J Supreme Tech",
  description: "Tell us about your project and we'll get started.",
};

const SLUG_TO_SERVICE: Record<string, string> = {
  "digital-presence": "Website Development",
  "commerce-application": "E-Commerce System",
  "business-operating": "CRM / Dashboard",
  "booking-reservation": "Booking System",
  "mobile-app": "Mobile App Development",
  "creative-technology": "Full Digital Ecosystem",
  "social-media-marketing": "Social Media Marketing",
  "branding-design": "Branding & Design",
  "supreme-suite": "Supreme Suite",
};

const SUITE_URL =
  process.env.NEXT_PUBLIC_SUPREME_SUITE_URL ?? "https://supreme-suite.vercel.app";

type SP = { [k: string]: string | string[] | undefined };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function StartPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const pay = one(sp.pay);
  const slug = one(sp.service);
  const plan = one(sp.plan);
  const ref = one(sp.ref);
  const ws = one(sp.ws);           // workspace slug, present after supreme-suite provision
  const provisionFailed = one(sp.provision) === "failed";

  const offer = slug ? getOffer(slug) : undefined;
  const defaultService = SLUG_TO_SERVICE[slug] || undefined;
  const isSupremeSuite = slug === "supreme-suite";

  const provisioned = pay === "provisioned";
  const paid = pay === "success";
  const unverified = pay === "unverified";
  const failed = pay === "failed" || pay === "error";

  return (
    <main className="bg-white text-ink-900">
      <section className="section shell">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-500 hover:text-ink-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to services
        </Link>

        {/* ── Supreme Suite workspace provisioned ── */}
        {provisioned && ws ? (
          <div className="mt-8 rounded-2xl border border-ink-950 bg-ink-950 p-7 text-white">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-7 w-7 shrink-0" />
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Your workspace is live!
              </h1>
            </div>
            <p className="mt-3 max-w-2xl leading-7 text-white/70">
              Your <strong className="text-white">{plan}</strong> plan is active.
              Credentials have been sent to your email and WhatsApp.
              {ref ? (
                <> Order ref <span className="font-mono text-white/60">{ref}</span>.</>
              ) : null}
            </p>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="mb-3 text-sm font-medium text-white/50 uppercase tracking-wider">
                Your workspace
              </p>
              <a
                href={`${SUITE_URL}/app/${ws}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono text-lg text-white hover:text-white/80 break-all"
              >
                {SUITE_URL}/app/{ws}
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
              <p className="mt-3 text-sm text-white/50">
                Log in with your email + the password from your inbox.
                Then go to <strong className="text-white/70">Settings → Industry</strong> to choose your system type.
              </p>
            </div>
            <a
              href={`${SUITE_URL}/app/${ws}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-light mt-6 inline-flex items-center gap-2"
            >
              Open My Workspace <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ) : provisioned && !ws ? (
          /* Provision fired but ws slug missing — shouldn't happen */
          <div className="mt-8 rounded-2xl border border-ink-950 bg-ink-950 p-7 text-white">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-7 w-7" />
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Payment confirmed!</h1>
            </div>
            <p className="mt-3 max-w-2xl leading-7 text-white/70">
              Your workspace is being set up — you&apos;ll receive credentials by email within a few minutes.
              {ref ? <> Ref <span className="font-mono">{ref}</span>.</> : null}
            </p>
          </div>

        /* ── Custom-build payment success (non-supreme-suite) ── */
        ) : paid && !isSupremeSuite ? (
          <div className="mt-8 rounded-2xl border border-ink-950 bg-ink-950 p-7 text-white">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-7 w-7" />
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Payment received — thank you!
              </h1>
            </div>
            <p className="mt-3 max-w-2xl leading-7 text-white/70">
              {plan ? `Your "${plan}" payment is confirmed. ` : "Your payment is confirmed. "}
              {ref ? <>Reference <span className="font-mono text-white">{ref}</span>. </> : null}
              One more step: tell us about your project below so we can start the same day.
            </p>
            {provisionFailed && (
              <p className="mt-3 max-w-2xl text-sm text-amber-300">
                We had a hiccup setting up your workspace automatically — don&apos;t worry, we&apos;ll
                message you with your credentials shortly.
              </p>
            )}
          </div>

        ) : unverified ? (
          <div className="mt-8 rounded-2xl border border-line bg-ink-50 p-7">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              We&apos;re confirming your payment.
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-ink-600">
              Your card went through but we couldn&apos;t auto-verify it instantly
              {ref ? <> (txn <span className="font-mono">{ref}</span>)</> : null}. We&apos;ll confirm
              and follow up shortly — please still send your details below so we can match them up.
            </p>
          </div>

        ) : failed ? (
          <div className="mt-8 rounded-2xl border border-line bg-ink-50 p-7">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-ink-500" />
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                That payment didn&apos;t go through.
              </h1>
            </div>
            <p className="mt-1 max-w-2xl leading-7 text-ink-600">
              No charge was completed. You can try again, send an inquiry below, or message us on
              WhatsApp and we&apos;ll take it from there.
            </p>
            <a
              href="https://wa.me/16582182282"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark mt-5"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp 658-218-2282
            </a>
          </div>

        ) : (
          <div className="mt-8 max-w-2xl">
            <span className="eyebrow">Start a Project</span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
              {offer ? `Let's build: ${SLUG_TO_SERVICE[slug] ?? "your project"}` : "Tell us what to build."}
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink-600">
              Share the goal and we&apos;ll come back with a plan, scope, and timeline. Prefer to pay
              and start now? Pick a package from the{" "}
              <Link href="/#services" className="underline hover:text-ink-900">
                services
              </Link>{" "}
              section.
            </p>
          </div>
        )}

        {/* Show intake form only for non-provisioned states */}
        {!provisioned && (
          <div className="mt-10">
            <ProjectIntakeForm defaultService={defaultService} />
          </div>
        )}
      </section>
    </main>
  );
}
