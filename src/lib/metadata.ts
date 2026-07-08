import type { Metadata } from "next";
import { site } from "./site.ts";

// Builds the per-page metadata from content: unique title and description,
// canonical URL, and OpenGraph/Twitter cards sharing the one branded OG
// image. Home passes absoluteTitle so the layout's title template does not
// double the site name.
export function pageMetadata(
  page: { title: string; description: string },
  path: string,
  options?: { absoluteTitle?: boolean }
): Metadata {
  const title = options?.absoluteTitle
    ? { absolute: page.title }
    : page.title;
  return {
    title,
    description: page.description,
    alternates: { canonical: path },
    // Page-level openGraph replaces the layout's entirely (Next merges
    // metadata shallowly), so siteName and images repeat here.
    openGraph: {
      siteName: site.name,
      title: page.title,
      description: page.description,
      url: path,
      type: "website",
      images: "/og.png",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: "/og.png",
    },
  };
}
