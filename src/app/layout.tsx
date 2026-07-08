import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { ProvenanceBand } from "@/components/ProvenanceBand";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./tokens.css";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  fallback: ["Georgia"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={newsreader.variable}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <ProvenanceBand />
      </body>
    </html>
  );
}
