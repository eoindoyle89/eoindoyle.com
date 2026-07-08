# eoindoyle.com

The personal site of Eoin Doyle. Marketer who builds.

Seven pages of static content, built by AI agents that I direct. This repo is deliberately public, agent instructions included, because the site is its own case study: I'm a marketer who builds with AI tools, and this is the working. The provenance band at the bottom of every page shows the build date, the agent, and the commit that produced it, linked back here.

## How it's built

Copy is authored as markdown in `/content` with typed frontmatter. A zod schema validates every file during the build; a malformed entry fails the build rather than shipping. That is the guardrail model: I direct the agents and do not review code line by line, so correctness checks are mechanical.

The site is Next.js with static generation only. No server code, no database, no auth. Seven pages of text need none of those, and anyone reading this repo should conclude the builder knew what not to build. The design is a bespoke token system (paper, ink, one sienna accent) in a single CSS file, with Newsreader for the human layer and the system mono stack for the machine layer.

The engineering decisions are recorded as ADRs in [docs/](docs/). The agents work from [CLAUDE.md](CLAUDE.md).

## Quality gates

CI runs on every push: ESLint, typechecking, content schema validation, a production build, Playwright smoke tests over every route, and Lighthouse CI with performance and accessibility budgets at 0.95. There are no unit tests; on a static content site they would test the framework, not the work.

## Running it

```
npm ci
npm run dev        # local dev
npm run build      # validates all content, then builds
npx playwright test
```

## Machines welcome

robots.txt allows the major AI crawlers by name, [llms.txt](https://eoindoyle.com/llms.txt) maps the site for language models, and analytics are cookieless. That is positioning, not oversight.

## License

The code is MIT ([LICENSE](LICENSE)). The written copy and the photographs are not: all rights reserved.
