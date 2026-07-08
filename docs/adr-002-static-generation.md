# ADR-002 — Static generation, no server code

**Status:** Accepted, 2026-07-08.

## Context

The site is seven pages of text. It has no accounts, no forms that write anywhere, and no dynamic data beyond what is known at build time.

## Decision

Render every page once at build time and serve it as files from the CDN. No SSR, no API routes, no middleware, no server code of any kind.

## Consequences

Nothing is running, so nothing can be attacked or fall over. Traffic scaling becomes the platform's problem, not ours. The one thing this forces: provenance data must be captured at build time. That is fine, because provenance describes the build. This decision is load-bearing for the security posture; reversing it reopens a runtime attack surface that currently does not exist.
