# ADR-001 — Next.js over Astro

**Status:** Accepted, 2026-07-08.

## Context

This is a pure content site. Astro is arguably the purpose-built tool for the job, since it ships zero JavaScript by default and is designed around static content.

## Decision

Use Next.js anyway. The builder already operates a Next.js property (headcoach-website), so agent workflows and debugging patterns transfer directly. Vercel treats Next.js as a first-class citizen. Consistency across two properties beats a marginal fit gain on one.

## Consequences

We accept a slightly heavier framework than the task strictly needs, in exchange for one mental model across both sites. Revisit this only if the site grows interactive surfaces that Next.js makes heavy.
