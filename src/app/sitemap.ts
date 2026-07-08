import type { MetadataRoute } from "next";
import { routes, site } from "@/lib/site";

// Generated once at build time; lastModified is the build date, which is
// when anything on a fully static site can last have changed.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    lastModified,
  }));
}
