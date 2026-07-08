# ADR-004 — No Tailwind; CSS custom properties

**Status:** Accepted, 2026-07-08.

## Context

The 3a Machine Layer design is a bespoke two-layer token system: paper and ink, sienna as the single accent, Newsreader and IBM Plex Mono. It is a small, fixed set of design values.

## Decision

Express the system as CSS custom properties in one tokens file. Do not use Tailwind. The scaffold was created with `--no-tailwind`.

## Consequences

Tailwind would add a dependency, a build step, and kit-smell for no gain at this scale. A single tokens file is the natural home for a bespoke system this size and keeps design values in one place. Do not reintroduce Tailwind without a new ADR.
