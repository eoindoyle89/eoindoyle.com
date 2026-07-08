import {
  getBuildsPage,
  getColophonPage,
  getConsultingPage,
  getCvPage,
  getHomePage,
  getNowPage,
  getWorkPage,
} from "@/lib/content";
import { site } from "@/lib/site";

// llms.txt (llmstxt.org): a markdown map of the site for language models.
// Derived from the content pipeline so it cannot drift from the pages.
// Statically generated at build time per ADR-002; nothing runs at request
// time.
export const dynamic = "force-static";

export function GET(): Response {
  const home = getHomePage();
  const pages: { path: string; title: string; description: string }[] = [
    { path: "/", ...getHomePage() },
    { path: "/now", ...getNowPage() },
    { path: "/work", ...getWorkPage() },
    { path: "/builds", ...getBuildsPage() },
    { path: "/consulting", ...getConsultingPage() },
    { path: "/cv", ...getCvPage() },
    { path: "/colophon", ...getColophonPage() },
  ];
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
