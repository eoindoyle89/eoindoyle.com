import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// The AI crawlers are allowed by name, on purpose. This site is built by
// agents and written to be read by them; machine visibility is positioning,
// not an accident. See the colophon.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
