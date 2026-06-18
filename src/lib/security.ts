import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export type SecuritySeverity = "low" | "medium" | "high" | "critical";

export type SecurityEvent = {
  id: string;
  project: string;
  url: string;
  type: string;
  severity: SecuritySeverity;
  message: string;
  ipHash: string;
  userAgent: string;
  encryptedPayload: string;
  createdAt: string;
};

export type VisitorEvent = {
  id: string;
  project: string;
  path: string;
  referrer: string;
  ipHash: string;
  userAgent: string;
  createdAt: string;
};

const securityEvents: SecurityEvent[] = [];
const visitorEvents: VisitorEvent[] = [];

function encryptionKey() {
  const raw = process.env.SECURITY_ENCRYPTION_KEY || process.env.JWT_SECRET || "jst-local-development-key-change-in-production";
  return crypto.createHash("sha256").update(raw).digest();
}

export function encryptPayload(payload: unknown) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${iv.toString("base64")}.${tag.toString("base64")}.${encrypted.toString("base64")}`;
}

export function hashIdentifier(value: string) {
  return crypto.createHash("sha256").update(`${process.env.SECURITY_HASH_SALT || "jst-local-salt"}:${value}`).digest("hex");
}

export function getClientIp(headers: Headers) {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function detectThreat(path: string, userAgent: string, referrer: string): Pick<SecurityEvent, "type" | "severity" | "message"> | null {
  const target = `${path} ${referrer} ${userAgent}`.toLowerCase();
  const probes = [
    { pattern: /(\.\.\/|%2e%2e|\/etc\/passwd|boot\.ini)/, type: "path_traversal", severity: "critical" as const, message: "Possible path traversal probe detected." },
    { pattern: /(union\s+select|select\s+\*\s+from|information_schema|or\s+1=1)/, type: "sql_injection", severity: "critical" as const, message: "Possible SQL injection probe detected." },
    { pattern: /(<script|javascript:|onerror=|onload=)/, type: "xss_probe", severity: "high" as const, message: "Possible cross-site scripting probe detected." },
    { pattern: /(wp-admin|wp-login|xmlrpc\.php|phpmyadmin|\.env)/, type: "scanner_probe", severity: "high" as const, message: "Automated scanner or sensitive file probe detected." },
    { pattern: /(nikto|sqlmap|acunetix|nessus|masscan|nmap)/, type: "security_tool_probe", severity: "high" as const, message: "Known scanning tool user agent detected." },
  ];

  return probes.find((probe) => probe.pattern.test(target)) || null;
}

export function recordVisitor(event: Omit<VisitorEvent, "id" | "createdAt">) {
  const visitorEvent = {
    ...event,
    id: `view_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  visitorEvents.unshift(visitorEvent);
  visitorEvents.splice(500);
  return visitorEvent;
}

export function recordSecurityEvent(event: Omit<SecurityEvent, "id" | "createdAt">) {
  const securityEvent = {
    ...event,
    id: `sec_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  securityEvents.unshift(securityEvent);
  securityEvents.splice(500);
  return securityEvent;
}

export function getSecuritySummary() {
  const criticalOpen = securityEvents.filter((event) => event.severity === "critical").length;
  const highOpen = securityEvents.filter((event) => event.severity === "high").length;
  const viewsToday = visitorEvents.filter((event) => {
    const age = Date.now() - new Date(event.createdAt).getTime();
    return age <= 24 * 60 * 60 * 1000;
  }).length;

  return {
    encryption: "AES-256-GCM",
    protectedHeaders: true,
    viewsToday,
    totalTrackedViews: visitorEvents.length,
    openAlerts: securityEvents.length,
    criticalOpen,
    highOpen,
    lastEvents: securityEvents.slice(0, 8),
    recentVisitors: visitorEvents.slice(0, 8),
  };
}

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

export async function persistVisitorEvent(event: VisitorEvent) {
  const supabase = supabaseAdmin();
  if (!supabase) return;

  await supabase.from("visitor_events").insert({
    project: event.project,
    path: event.path,
    referrer: event.referrer,
    ip_hash: event.ipHash,
    user_agent: event.userAgent,
    created_at: event.createdAt,
  });
}

export async function persistSecurityEvent(event: SecurityEvent) {
  const supabase = supabaseAdmin();
  if (!supabase) return;

  await supabase.from("security_events").insert({
    project: event.project,
    url: event.url,
    event_type: event.type,
    severity: event.severity,
    message: event.message,
    ip_hash: event.ipHash,
    user_agent: event.userAgent,
    encrypted_payload: event.encryptedPayload,
    created_at: event.createdAt,
  });
}

export async function getSecuritySummaryFromStore() {
  const supabase = supabaseAdmin();
  if (!supabase) return getSecuritySummary();

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [alerts, visitors, viewsToday] = await Promise.all([
    supabase
      .from("security_events")
      .select("id, project, url, event_type, severity, message, ip_hash, user_agent, encrypted_payload, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("visitor_events")
      .select("id, project, path, referrer, ip_hash, user_agent, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("visitor_events")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since),
  ]);

  if (alerts.error || visitors.error || viewsToday.error) return getSecuritySummary();

  const lastEvents = (alerts.data || []).map((event) => ({
    id: event.id,
    project: event.project,
    url: event.url,
    type: event.event_type,
    severity: event.severity as SecuritySeverity,
    message: event.message,
    ipHash: event.ip_hash,
    userAgent: event.user_agent || "",
    encryptedPayload: event.encrypted_payload,
    createdAt: event.created_at,
  }));

  const recentVisitors = (visitors.data || []).map((visitor) => ({
    id: visitor.id,
    project: visitor.project,
    path: visitor.path,
    referrer: visitor.referrer || "",
    ipHash: visitor.ip_hash,
    userAgent: visitor.user_agent || "",
    createdAt: visitor.created_at,
  }));

  return {
    ...getSecuritySummary(),
    viewsToday: viewsToday.count || 0,
    totalTrackedViews: Math.max(recentVisitors.length, getSecuritySummary().totalTrackedViews),
    openAlerts: Math.max(lastEvents.length, getSecuritySummary().openAlerts),
    criticalOpen: lastEvents.filter((event) => event.severity === "critical").length,
    highOpen: lastEvents.filter((event) => event.severity === "high").length,
    lastEvents,
    recentVisitors,
  };
}
