# Changelog

Notable changes to eoindoyle.com. Versions are MAJOR.MINOR.PATCH.MICRO; dates are YYYY-MM-DD.

## [1.0.0.0] - 2026-07-08

### Added

- Content pipeline: all copy lives as markdown in `/content` with typed frontmatter, validated by a zod schema at build time. A malformed file fails the build instead of shipping.
- The 3a Machine Layer design system as CSS custom properties in one tokens file: warm paper and ink layers, sienna as the single accent, Newsreader for the human layer and the system mono stack for the machine layer, with contrast meeting WCAG AA.
- All seven pages: Home with the duotone headshot and its metadata block, /work, /builds with numbered status cards, /now, /consulting, /cv with a print stylesheet, and the colophon.
- The provenance band on every page: build date, agent name, and the real commit hash linked to GitHub.
- A custom 404 in the machine-layer voice, a favicon and app icons drawn from the site's mark, and a web manifest.
- Search and AI visibility: unique metadata per page with a branded OG image, a sitemap, a robots.txt that allows the major AI crawlers by name, a JSON-LD Person schema on Home, and a generated llms.txt.
- Cookieless analytics: PostHog with memory persistence in the EU region, session recording off. The site sets no cookies.
- An RSS scaffold at /feed.xml, deliberately empty until the build log starts publishing.
- Quality gates on every push: ESLint, typechecking, content schema validation, a production build, Playwright smoke tests over every route, and Lighthouse CI with performance and accessibility budgets at 0.95.
- Security headers: CSP, HSTS, X-Frame-Options, Referrer-Policy, and nosniff.
- The architecture decision records in `docs/`.
