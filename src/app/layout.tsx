import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { ProvenanceBand } from "@/components/ProvenanceBand";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./tokens.css";
import "./globals.css";

// display: "optional" keeps the largest text paint at first render: cached
// and fast visits get Newsreader, a slow first visit keeps the
// metrics-adjusted Georgia fallback instead of repainting late. This is
// what holds the Lighthouse LCP budget on 4G.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  fallback: ["Georgia"],
  display: "optional",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    siteName: site.name,
    type: "website",
    images: "/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={newsreader.variable}>
      {/* Pages render their own <main>; Home appends its ink note strip
          after it, flush against the band. */}
      <body>
        <SiteHeader />
        {children}
        <ProvenanceBand />
      </body>
    </html>
  );
}
