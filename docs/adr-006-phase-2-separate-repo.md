# ADR-006 — Phase 2 gets its own repo

**Status:** Accepted, 2026-07-08.

## Context

Phase 2 is an outbound campaign design agent. It is a real piece of software with its own logic and its own lifecycle. The temptation is to grow it inside this repo, which would pull a backend into a site that deliberately has none.

## Decision

Build the agent as a separate project in a separate repo. This site only ever displays its published output: build log entries as markdown, run through the same pipeline as everything else.

## Consequences

Drawing the service boundary now prevents the site from accreting a backend later. It keeps ADR-002 intact: the site stays static, and the agent's runtime lives elsewhere. The tripwire criteria for productizing the agent live in the Phase 2 project note, not here.
