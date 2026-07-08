import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["/", "/now", "/work", "/builds", "/consulting", "/cv", "/colophon"];

// Generated once at build time; lastModified is the build date, which is
// when anything on a fully static site can last have changed.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    lastModified,
  }));
}
