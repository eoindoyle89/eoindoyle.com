import type { NextConfig } from "next";

// The site is static, so the CSP mostly documents what the site does not do.
// 'unsafe-inline' for scripts and styles is required by Next itself: the App
// Router bootstraps with inline scripts, and next/image sets inline style
// attributes. Dev additionally needs 'unsafe-eval' for hot reloading. The
// PostHog hosts cover cookieless analytics: events go to the EU ingestion
// host (the project is EU-hosted), and posthog-js lazy-loads feature
// bundles from the assets host.
//
// Known and deliberate: the Vercel preview toolbar (vercel.live) is blocked
// by this CSP on preview deployments. Production carries no third-party
// scripts beyond PostHog, and the policy stays identical across
// environments rather than loosening for a preview convenience.
const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "'self' 'unsafe-inline' 'unsafe-eval'"
    : "'self' 'unsafe-inline' https://eu-assets.i.posthog.com";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://eu.i.posthog.com https://eu-assets.i.posthog.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          // includeSubDomains is deliberate: every future subdomain of
          // eoindoyle.com commits to HTTPS. Email records (MX/SPF/DKIM) are
          // unaffected; HSTS only governs HTTP.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
