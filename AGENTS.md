<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ
from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing
code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project instructions

Read `CLAUDE.md` before every substantive task. Despite the filename, it is the repository's
current public architecture, content, design, writing, quality, and security specification
and applies to Codex.

## GitHub and release safety

- This personal repository uses the `eoindoyle89` GitHub CLI account.
- Run `gh auth status` immediately before every push and verify `eoindoyle89` is active.
- Verify the repository-local or effective Git author before committing.
- Work through a feature branch and pull request unless Eoin explicitly authorises another
  route.
- Confirm immediately before merging to `main`, deploying, force-pushing, or deleting a
  branch.

## Validation

This repository uses `package-lock.json`; use npm.

- Content validation: `npm run validate`
- Lint: `npm run lint`
- Production build: `npm run build`

Follow the additional CI, Playwright, and Lighthouse requirements in `CLAUDE.md` and the
repository workflows when the change affects them.
