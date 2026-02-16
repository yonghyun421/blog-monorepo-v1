import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || siteConfig.title;
  const subtitle = searchParams.get("subtitle") || siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, rgba(17,24,39,1) 0%, rgba(31,41,55,1) 40%, rgba(59,130,246,1) 100%)",
          color: "white",
          padding: "56px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.35)",
            borderRadius: "999px",
            padding: "8px 14px",
            fontSize: 24,
            opacity: 0.9,
          }}
        >
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              fontWeight: 700,
              maxWidth: "1000px",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.88)",
              maxWidth: "980px",
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
