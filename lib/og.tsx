import { ImageResponse } from "next/og";

import { DICTIONARIES } from "@/data/i18n";
import { type Locale, SITE_NAME } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

export function ogImage(locale: Locale) {
  const dict = DICTIONARIES[locale];
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fdfdfd",
        color: "#1c1c1c",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 30, color: "#6b6b6b" }}>by riivo</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#4a4a4a",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          {dict.lede}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, fontSize: 26, color: "#1c1c1c" }}>
        {["React", "Tailwind", "shadcn/ui", "Motion"].map((tag) => (
          <div
            key={tag}
            style={{
              background: "#ececec",
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>,
    OG_SIZE,
  );
}
