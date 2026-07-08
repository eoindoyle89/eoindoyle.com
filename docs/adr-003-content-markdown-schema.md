# ADR-003 — Content as markdown with schema validation

**Status:** Accepted, 2026-07-08.

## Context

The maintainer directs agents and does not review code line by line. Copy changes often; layout code rarely does. Correctness has to be enforced by something mechanical, because a human is not reading every diff.

## Decision

Keep all copy in `/content` as markdown files with typed frontmatter, mirroring the vault format. Validate every file against a zod schema during the build. A malformed entry fails the build rather than shipping.

## Consequences

Adding a build card means adding one markdown file and touching zero layout code. Content and presentation stay separated: components hold no content strings. This is the guardrail model in practice. The build itself is the reviewer, so a broken frontmatter field is caught before it reaches production instead of after.
