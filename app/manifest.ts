import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Escape the Slop",
    short_name: "Escape the Slop",
    description: "UI libraries with personality. Zero AI look.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfdfd",
    theme_color: "#fdfdfd",
    icons: [{ src: "/icon.png", sizes: "256x256", type: "image/png" }],
  };
}
