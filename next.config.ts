import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // __JS_SECURITY_HEADERS__ — J Supreme Cyber Command hardening (do not duplicate)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  turbopack: {
    root: __dirname,
  },
  // Content (The Signal articles, e-books) is read from disk at runtime by the
  // ISR routes below — make sure those JSON files ship inside the serverless functions.
  outputFileTracingIncludes: {
    "/blog/[slug]": ["./src/content/**/*"],
    "/blog/category/[category]": ["./src/content/**/*"],
    "/library/[slug]": ["./src/content/**/*"],
    "/blog/rss.xml": ["./src/content/**/*"],
    "/sitemap.xml": ["./src/content/**/*"],
    // Gated e-book PDFs live outside /public — ship them into the download function only.
    "/api/library/download": ["./private/library/**/*"],
  },
};

export default nextConfig;
