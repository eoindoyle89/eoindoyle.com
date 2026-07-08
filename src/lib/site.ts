import { execSync } from "node:child_process";

// Site-wide chrome: identity, external links, navigation. Page copy lives
// in content/; this is configuration, not prose.
export const site = {
  name: "Eoin Doyle",
  tagline: "Marketer who builds.",
  email: "eoin@eoindoyle.com",
  linkedin: "https://www.linkedin.com/in/eoindoyle",
  github: "https://github.com/eoindoyle89",
  repoUrl: "https://github.com/eoindoyle89/eoindoyle.com",
  agent: "claude-code",
} as const;

export const navItems = [
  { label: "now", href: "/now" },
  { label: "work", href: "/work" },
  { label: "builds", href: "/builds" },
  { label: "consulting", href: "/consulting" },
  { label: "cv", href: "/cv" },
] as const;

// Provenance is real data (ADR-005): captured once at build time, never
// hand-typed. On Vercel the commit comes from VERCEL_GIT_COMMIT_SHA; in a
// local build it comes from git itself. If neither works, the hash is
// omitted rather than faked.
export function getProvenance(): { builtDate: string; sha: string | null } {
  const builtDate = new Date().toISOString().slice(0, 10);
  const fromEnv = process.env.VERCEL_GIT_COMMIT_SHA;
  if (fromEnv) {
    return { builtDate, sha: fromEnv };
  }
  try {
    const sha = execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim();
    return { builtDate, sha };
  } catch {
    return { builtDate, sha: null };
  }
}
