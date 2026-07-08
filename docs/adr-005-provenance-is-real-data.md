# ADR-005 — Provenance is real data

**Status:** Accepted, 2026-07-08.

## Context

Every page carries an ink band reading `built [date] · agent [name] · commit [hash] · view source`. The band is the visible claim that this site is agent-built and self-documenting. A hand-typed or decorative hash would make that claim a lie.

## Decision

Derive everything in the provenance layer from the actual build. The commit hash comes from `VERCEL_GIT_COMMIT_SHA` at build time and links to the commit on GitHub. If a value cannot be derived from the real build, it does not appear.

## Consequences

The band is trustworthy because it is generated, not authored. This depends on ADR-002: build-time capture is possible precisely because the site is static and the build describes itself. Any future provenance field must meet the same bar or stay off the page.
