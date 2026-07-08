@AGENTS.md

# eoindoyle.com

A seven-page personal site: positioning, work, builds, consulting, CV, and a colophon. It is static content, built by AI agents that the maintainer directs. The repo is public, agent instructions included, and the site links back to it. Read that as a constraint: the code and these instructions are on display, so keep both honest and legible.

Guiding principle: fit-for-purpose restraint. Seven pages of text need no database, no auth, and no server code. Anyone reading this repo should conclude the builder knew what not to build.

The full engineering rationale lives in `docs/` as ADRs. Read them before changing architecture. This file is the working summary.

## Architecture rules

These are load-bearing. Do not relax them without recording a new ADR in `docs/`.

- **Static generation only.** Every page renders once at build time and serves as files from the CDN. No SSR, no API routes, no middleware, no server code. Nothing runs, so nothing can be attacked or fall over. See ADR-002.
- **Next.js, not Astro.** Chosen for consistency with the maintainer's other Next.js property, not because it is the best fit for a pure content site. See ADR-001.
- **Content is markdown with schema validation.** All copy lives in `/content` as markdown with typed frontmatter. A zod schema validates every file during the build. A malformed entry fails the build rather than shipping. See ADR-003.
- **No Tailwind.** The design is a bespoke token system expressed as CSS custom properties in one tokens file. The scaffold was created with `--no-tailwind`. Do not add it. See ADR-004.
- **Provenance is real data.** Anything in the provenance band is derived from the actual build. If it cannot be derived, it does not appear. See ADR-005.
- **Phase 2 is a separate repo.** The outbound campaign design agent is its own project. This site only ever displays its published output as markdown, through the same pipeline as everything else. Do not add a backend here. See ADR-006.

## Content pipeline

```
vault (markdown) -> /content + zod schema -> Next.js App Router (SSG) -> Vercel CDN
```

Copy is authored as markdown that mirrors the vault format. It lands in `/content`, gets validated by a zod schema in `src/lib/` at build time, and is rendered by static routes. Components under `src/components/` are presentation only and hold no content strings. Adding a build card means adding one markdown file and touching zero layout code. This is the guardrail model: the maintainer directs agents and does not review code line by line, so correctness checks must be mechanical, not manual.

Provenance is captured at build time. The commit hash comes from `VERCEL_GIT_COMMIT_SHA` and links to the commit on GitHub.

## Folder structure

```
src/app/            routes: one page.tsx per route (/, now, work, builds, consulting, cv, colophon)
src/components/     presentation only, no content strings inside
src/lib/            content loading and zod schemas
content/            markdown: work/, builds/, pages/ (now.md, consulting.md, colophon.md)
public/             static assets (headshot processed via next/image)
docs/               the ADRs
.github/workflows/  CI
CLAUDE.md           this file (public, referenced in the colophon)
README.md           written for a hiring manager; the most-read file in the repo
```

## Design: 3a Machine Layer

Two layers, visible on every page. Paper is the human layer; ink is the machine layer. The site literally shows its two authors.

- **Tokens.** One `tokens.css` file holds the whole system as CSS custom properties. Exact hex values come from the 3a mockup. No design values hardcoded elsewhere.
- **Type.** Newsreader (serif) for all human-layer text. IBM Plex Mono for the machine layer, eyebrows, status tags, and metadata blocks. No third face.
- **Color.** Warm paper background, near-black ink text, and sienna as the single accent, used for eyebrow labels and rules (for example "B2B MARKETING · AI SYSTEMS"). The dark band is ink-black with paper-colored mono text.
- **Fonts** are self-hosted as subset woff2 via `next/font`. No external font requests.
- **Provenance band** on every page: a full-width dark band in monospace carrying `built [date] · agent [name] · commit [hash] · view source` plus footer links (email, LinkedIn, GitHub, colophon).
- **Headshot** (DSC08435) is duotone (ink plus paper/sienna), shown once on Home with a mono metadata block. Processed through `next/image` from a single repo original.
- **Build cards** on /builds are numbered, with mono status markers: `● in progress · built in public`, `● shipped`, `○ designing`. Card body in serif.

## Writing rules

All copy is drafted against the anti-AI writing style guide. An agent-built site checked for sounding like an agent is the point. Apply these to any prose you write, including these docs and the README.

- **No em dashes.** Use a comma, a semicolon, a colon, or a new sentence. This is a hard rule for this project, stricter than the general style guide.
- **American English** spelling and usage throughout.
- **Short sentences.** Let length vary on purpose. A short sentence after a long one lands harder than another medium one.
- **Honest framing.** Say what was actually done and what was not. No inflation.

### Banned words

These read as model output. Cut them: delve, unlock, elevate, leverage (as a verb), robust, seamless, tapestry, landscape, realm, testament, journey, game-changer, cutting-edge, in today's world, in the ever-evolving, when it comes to, it's important to note, it's worth noting, at the end of the day, needless to say, dive into, unpack, navigate (metaphorically), foster, holistic, comprehensive, myriad, plethora, boasts, showcases, underscores, encompasses.

### Sentence and structure tells to avoid

- **Rule of three.** "Fast, reliable, and secure." Group in twos or fours, or pick one word and move on. Replace a rule-of-three with one concrete detail.
- **Symmetrical pairs.** "It's not just X, it's Y." One is fine; three in a row is a tell.
- **Hedge stacking.** "This could potentially help improve." Pick one hedge or none.
- **Throat-clearing openers.** Cut the first sentence of most drafts and check if anything is lost.
- **Closing-paragraph summaries.** If the piece made its point, it does not need a recap.
- **Bullets for prose.** Bullets are for genuinely discrete, parallel items, not a substitute for transitions.
- **Bold scattered through paragraphs** to fake emphasis. Earn emphasis through word choice.

## Quality gates

CI runs on every push: ESLint, `tsc --noEmit`, content schema validation, a production build, and Lighthouse CI with budgets (performance and a11y both at least 95). A handful of Playwright smoke tests check that every route renders, that /cv has print styles, and that the provenance band is present. No unit tests; on a static content site they would test the framework, not the work. Branch protection on main requires CI to pass before merge. Dependabot runs weekly.

## Security posture

The surface is the repo and the supply chain, not a runtime. No `.env` files committed; the only env var is the PostHog public key, which is designed to be public. Keep dependencies minimal and Dependabot-patched. Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy) are set in `next.config.ts`. Triage `npm audit` findings; never `--force`-fix them. DNS A/CNAME records point to Vercel; MX, SPF, DKIM, and DMARC are email infrastructure and are never touched.

## Scope

Do not build pages unless asked. When you do, read the relevant guide in `node_modules/next/dist/docs/` first (see AGENTS.md): this Next.js version has breaking changes from older conventions.
