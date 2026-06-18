import { VERCEL_PROJECTS, type VercelProject } from "@/lib/vercelProjects";

export type ProjectHealth = VercelProject & {
  status: "healthy" | "warning" | "offline" | "not-deployed";
  statusCode: number | null;
  responseMs: number | null;
  checkedAt: string;
};

async function checkProject(project: VercelProject): Promise<ProjectHealth> {
  if (!project.productionUrl) {
    return {
      ...project,
      status: "not-deployed",
      statusCode: null,
      responseMs: null,
      checkedAt: new Date().toISOString(),
    };
  }

  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(project.productionUrl, {
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
    });
    const responseMs = Date.now() - startedAt;

    return {
      ...project,
      status: response.ok ? "healthy" : "warning",
      statusCode: response.status,
      responseMs,
      checkedAt: new Date().toISOString(),
    };
  } catch {
    return {
      ...project,
      status: "offline",
      statusCode: null,
      responseMs: Date.now() - startedAt,
      checkedAt: new Date().toISOString(),
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function getVercelHealth() {
  const checks = await Promise.all(VERCEL_PROJECTS.map(checkProject));
  const deployed = checks.filter((project) => project.productionUrl);

  return {
    projects: checks,
    totals: {
      total: checks.length,
      deployed: deployed.length,
      healthy: checks.filter((project) => project.status === "healthy").length,
      warning: checks.filter((project) => project.status === "warning").length,
      offline: checks.filter((project) => project.status === "offline").length,
      notDeployed: checks.filter((project) => project.status === "not-deployed").length,
    },
    checkedAt: new Date().toISOString(),
  };
}
