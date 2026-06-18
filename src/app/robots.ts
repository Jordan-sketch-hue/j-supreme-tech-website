import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/admin", "/trials/", "/start", "/newsletter/confirmed", "/newsletter/unsubscribed"],
      },
    ],
    sitemap: "https://jsupremetech.online/sitemap.xml",
    host: "https://jsupremetech.online",
  };
}
