import { NextResponse } from "next/server";
import {
  detectThreat,
  encryptPayload,
  getClientIp,
  getSecuritySummaryFromStore,
  hashIdentifier,
  persistSecurityEvent,
  persistVisitorEvent,
  recordSecurityEvent,
  recordVisitor,
} from "@/lib/security";

type EventPayload = {
  project?: string;
  path?: string;
  url?: string;
  referrer?: string;
};

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "86400",
};

function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      ...corsHeaders,
      ...(init?.headers || {}),
    },
  });
}

export async function GET(request: Request) {
  const token = request.headers.get("x-admin-token") ?? new URL(request.url).searchParams.get("token");
  if (!token || token !== process.env.SECURITY_ADMIN_TOKEN) {
    return new NextResponse(null, { status: 401 });
  }
  return json(await getSecuritySummaryFromStore());
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as EventPayload;
  const userAgent = request.headers.get("user-agent") || "unknown";
  const referrer = String(payload.referrer || request.headers.get("referer") || "");
  const path = String(payload.path || "/");
  const url = String(payload.url || path);
  const project = String(payload.project || "j-supreme-tech-website");
  const ipHash = hashIdentifier(getClientIp(request.headers));

  const visitor = recordVisitor({
    project,
    path,
    referrer,
    ipHash,
    userAgent,
  });
  await persistVisitorEvent(visitor);

  const threat = detectThreat(path, userAgent, referrer);

  if (!threat) {
    return json({ tracked: true, visitorId: visitor.id, alertCreated: false });
  }

  const encryptedPayload = encryptPayload({
    project,
    path,
    url,
    referrer,
    userAgent,
    ipHash,
    threat,
  });

  const alert = recordSecurityEvent({
    project,
    url,
    type: threat.type,
    severity: threat.severity,
    message: threat.message,
    ipHash,
    userAgent,
    encryptedPayload,
  });
  await persistSecurityEvent(alert);

  return json({ tracked: true, visitorId: visitor.id, alertCreated: true, alertId: alert.id });
}
