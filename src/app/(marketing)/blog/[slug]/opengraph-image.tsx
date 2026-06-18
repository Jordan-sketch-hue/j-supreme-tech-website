import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/blog";
import { CATEGORIES } from "@/lib/blog-taxonomy";

export const alt = "J Supreme Tech — The Signal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Render OG images on-demand (then CDN-cached) rather than prerendering all of
// them at build — Satori image generation is memory-heavy at SSG scale.
export const dynamic = "force-static";
export const dynamicParams = true;

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? "The Signal";
  const category = article ? CATEGORIES[article.category].label : "J Supreme Tech";
  const read = article ? `${article.readMinutes} MIN READ` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* faint grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, background: "#141414", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>
              JST
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, color: "#141414" }}>J Supreme Tech</div>
          </div>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#737373" }}>{`The Signal · ${category}`}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ fontSize: title.length > 70 ? 56 : 66, fontWeight: 700, lineHeight: 1.07, letterSpacing: -1.5, color: "#141414" }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #e6e6e6", paddingTop: 28 }}>
          <div style={{ fontSize: 20, color: "#525252" }}>{article?.author ?? "Studio publication"}</div>
          <div style={{ fontSize: 18, letterSpacing: 3, color: "#a3a3a3" }}>{read}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
