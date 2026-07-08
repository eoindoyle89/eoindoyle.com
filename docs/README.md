# Architecture decisions

These are the engineering decisions for eoindoyle.com, written as ADRs: what we chose, what we rejected, and why. The repo is public and the site links back to it, so these records are part of the showcase, not internal notes.

Guiding principle: fit-for-purpose restraint. Seven pages of text need no database, no auth, and no server code. Anyone reading this repo should conclude the builder knew what not to build.

## System overview

```
vault (markdown) -> /content + zod schema -> Next.js App Router (SSG) -> Vercel CDN
                         tokens.css (3a Machine Layer system)
CI on every push: lint · typecheck · content schema · build · Lighthouse budget
provenance: VERCEL_GIT_COMMIT_SHA -> ink band on every page, linked to the commit
```

## The records

- [ADR-001 — Next.js over Astro](adr-001-nextjs-over-astro.md)
- [ADR-002 — Static generation, no server code](adr-002-static-generation.md)
- [ADR-003 — Content as markdown with schema validation](adr-003-content-markdown-schema.md)
- [ADR-004 — No Tailwind; CSS custom properties](adr-004-no-tailwind-css-custom-properties.md)
- [ADR-005 — Provenance is real data](adr-005-provenance-is-real-data.md)
- [ADR-006 — Phase 2 gets its own repo](adr-006-phase-2-separate-repo.md)

To change a decision, add a new ADR that supersedes the old one rather than editing history. The working summary of these rules lives in `CLAUDE.md`.
