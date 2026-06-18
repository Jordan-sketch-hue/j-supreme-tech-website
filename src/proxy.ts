import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const securityHeaders = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "x-dns-prefetch-control": "on",
  "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
};

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only touch Supabase (session refresh + route guard) where it matters —
  // protected /account and the auth screens. Keeps the rest of the site fast.
  const needsAuth = path.startsWith("/account") || path === "/login" || path === "/signup";
  const response = needsAuth ? await updateSession(request) : NextResponse.next();

  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  if (path.startsWith("/api/")) {
    response.headers.set("cache-control", "no-store");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
