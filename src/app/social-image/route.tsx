import { ImageResponse } from "next/og";
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };
export function GET() {
  return new ImageResponse(
    <div
      style={{
        background: "#f6f5f0",
        color: "#17221c",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 23, letterSpacing: 4, color: "#2458d5" }}>
        GOWTHAM / PERSONAL LAB
      </div>
      <div
        style={{
          fontSize: 94,
          letterSpacing: -5,
          lineHeight: 1.02,
          marginTop: 65,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Follow the</span>
        <span>problem deeper.</span>
      </div>
      <div style={{ fontSize: 28, marginTop: 50 }}>
        Product Builder & AI Product Engineer
      </div>
    </div>,
    size,
  );
}
