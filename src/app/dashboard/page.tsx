import Link from "next/link";
import { Activity, AlertTriangle, Eye, ExternalLink, LockKeyhole, Radio, Server, ShieldCheck } from "lucide-react";
import { getSecuritySummaryFromStore } from "@/lib/security";
import { getVercelHealth } from "@/lib/vercelHealth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Security CRM - J Supreme Tech",
  description: "Monitor Vercel projects, visitors, health, encryption, and security alerts.",
};

function statusClass(status: string) {
  if (status === "healthy") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";
  if (status === "warning") return "border-yellow-500/30 bg-yellow-500/10 text-yellow-200";
  if (status === "offline") return "border-red-500/30 bg-red-500/10 text-red-200";
  return "border-white/15 bg-white/10 text-zinc-300";
}

function severityClass(severity: string) {
  if (severity === "critical") return "border-red-500/40 bg-red-500/10 text-red-200";
  if (severity === "high") return "border-orange-500/40 bg-orange-500/10 text-orange-200";
  if (severity === "medium") return "border-yellow-500/40 bg-yellow-500/10 text-yellow-200";
  return "border-white/15 bg-white/10 text-zinc-300";
}

export default async function DashboardPage() {
  const [vercel, security] = await Promise.all([getVercelHealth(), getSecuritySummaryFromStore()]);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 bg-white/[0.03]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">JST Security CRM</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Vercel Sites, Health, Visitors & Breach Alerts</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
              Live operational view for deployed projects, security posture, encrypted event capture, and suspicious activity notification.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-400/30 bg-purple-500/10 px-5 py-4 text-sm text-purple-100">
            Last check: {new Date(vercel.checkedAt).toLocaleString()}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <div className="flex items-center gap-3 text-zinc-300">
              <Server className="h-5 w-5 text-purple-300" />
              Vercel projects
            </div>
            <p className="mt-4 text-4xl font-black">{vercel.totals.total}</p>
            <p className="mt-1 text-sm text-zinc-400">{vercel.totals.deployed} deployed production URLs</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <div className="flex items-center gap-3 text-zinc-300">
              <Activity className="h-5 w-5 text-emerald-300" />
              Healthy sites
            </div>
            <p className="mt-4 text-4xl font-black">{vercel.totals.healthy}</p>
            <p className="mt-1 text-sm text-zinc-400">{vercel.totals.warning + vercel.totals.offline} need attention</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <div className="flex items-center gap-3 text-zinc-300">
              <Eye className="h-5 w-5 text-blue-300" />
              Visitor views
            </div>
            <p className="mt-4 text-4xl font-black">{security.totalTrackedViews}</p>
            <p className="mt-1 text-sm text-zinc-400">{security.viewsToday} tracked in the last 24 hours</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <div className="flex items-center gap-3 text-zinc-300">
              <AlertTriangle className="h-5 w-5 text-red-300" />
              Breach alerts
            </div>
            <p className="mt-4 text-4xl font-black">{security.openAlerts}</p>
            <p className="mt-1 text-sm text-zinc-400">{security.criticalOpen} critical, {security.highOpen} high</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <div className="flex items-center gap-3 font-bold text-emerald-100">
              <LockKeyhole className="h-5 w-5" />
              Encrypted Event Storage
            </div>
            <p className="mt-3 text-sm leading-6 text-emerald-100/80">
              Security event payloads are encrypted with {security.encryption}. IPs are hashed before storage.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
            <div className="flex items-center gap-3 font-bold text-purple-100">
              <ShieldCheck className="h-5 w-5" />
              Hardened Headers
            </div>
            <p className="mt-3 text-sm leading-6 text-purple-100/80">
              HSTS, frame protection, content sniffing protection, referrer control, permission policy, and no-store API caching are active.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
            <div className="flex items-center gap-3 font-bold text-blue-100">
              <Radio className="h-5 w-5" />
              CRM Notification Layer
            </div>
            <p className="mt-3 text-sm leading-6 text-blue-100/80">
              Suspicious probes create alerts in this dashboard when visitor tracking receives scanner, SQLi, XSS, traversal, or sensitive-file patterns.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <h2 className="text-xl font-black">Vercel Sites</h2>
                <p className="mt-1 text-sm text-zinc-400">Actual projects found in the authenticated Vercel account.</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-zinc-300">Production URLs</span>
            </div>
            <div className="divide-y divide-white/10">
              {vercel.projects.map((project) => (
                <div key={project.name} className="grid gap-4 p-5 lg:grid-cols-[1fr_auto_auto] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold">{project.name}</h3>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(project.status)}`}>
                        {project.status}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-zinc-300">{project.category}</span>
                    </div>
                    <p className="mt-2 break-all text-sm text-zinc-400">{project.productionUrl || "No production deployment URL listed"}</p>
                  </div>
                  <div className="text-sm text-zinc-300">
                    <p>Status code: {project.statusCode ?? "n/a"}</p>
                    <p>Response: {project.responseMs ? `${project.responseMs}ms` : "n/a"}</p>
                  </div>
                  {project.productionUrl ? (
                    <Link className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-bold hover:bg-white/10" href={project.productionUrl} target="_blank">
                      Open <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="rounded-xl border border-white/10 px-4 py-2 text-center text-sm text-zinc-500">Not deployed</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="border-b border-white/10 p-5">
                <h2 className="text-xl font-black">Security Alerts</h2>
                <p className="mt-1 text-sm text-zinc-400">Encrypted incident records shown in CRM format.</p>
              </div>
              <div className="space-y-3 p-5">
                {security.lastEvents.length === 0 ? (
                  <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">No suspicious activity recorded in this runtime.</p>
                ) : (
                  security.lastEvents.map((event) => (
                    <div key={event.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${severityClass(event.severity)}`}>{event.severity}</span>
                      <p className="mt-3 font-semibold">{event.message}</p>
                      <p className="mt-1 text-xs text-zinc-500">{event.project} | {new Date(event.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="border-b border-white/10 p-5">
                <h2 className="text-xl font-black">Recent Visitors</h2>
                <p className="mt-1 text-sm text-zinc-400">Hashed identifiers only. Raw IPs are not shown.</p>
              </div>
              <div className="space-y-3 p-5">
                {security.recentVisitors.length === 0 ? (
                  <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-400">Visitor tracking will populate after page views.</p>
                ) : (
                  security.recentVisitors.map((visitor) => (
                    <div key={visitor.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="break-all text-sm font-semibold">{visitor.path}</p>
                      <p className="mt-1 text-xs text-zinc-500">{visitor.project} | {new Date(visitor.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
