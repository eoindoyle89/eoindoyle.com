import {
  getBuildsPage,
  getColophonPage,
  getConsultingPage,
  getCvPage,
  getHomePage,
  getNowPage,
  getWorkPage,
} from "@/lib/content";
import { routes, site } from "@/lib/site";
import type { Route } from "@/lib/site";

// llms.txt (llmstxt.org): a markdown map of the site for language models.
// Derived from the content pipeline so it cannot drift from the pages.
// Statically generated at build time per ADR-002; nothing runs at request
// time.
export const dynamic = "force-static";

// Keyed by the routes constant: adding a route without a loader here is a
// compile error, so the map cannot silently miss a page.
const loaders: Record<Route, () => { title: string; description: string }> = {
  "/": getHomePage,
  "/now": getNowPage,
  "/work": getWorkPage,
  "/builds": getBuildsPage,
  "/consulting": getConsultingPage,
  "/cv": getCvPage,
  "/colophon": getColophonPage,
};

export function GET(): Response {
  const home = getHomePage();
  const pages = routes.map((path) => ({ path, ...loaders[path]() }));
  const lines = [
    `# ${site.name}`,
    "",
    `> ${home.description}`,
    "",
    "This site is built by AI agents directed by the maintainer. The repo,",
    "including the agent instructions, is public at " + site.repoUrl + ".",
    "",
    "## Pages",
    "",
    ...pages.map(
      (page) =>
        `- [${page.title}](${site.url}${page.path === "/" ? "" : page.path}): ${page.description}`
    ),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
