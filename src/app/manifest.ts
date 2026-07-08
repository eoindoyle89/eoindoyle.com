import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Hex values mirror --paper in tokens.css; manifest JSON cannot read CSS
// custom properties.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#FAF7F1",
    theme_color: "#FAF7F1",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
