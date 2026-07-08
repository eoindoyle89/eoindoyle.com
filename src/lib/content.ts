import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import {
  buildFrontmatterSchema,
  buildsFrontmatterSchema,
  colophonFrontmatterSchema,
  consultingFrontmatterSchema,
  cvFrontmatterSchema,
  homeFrontmatterSchema,
  nowFrontmatterSchema,
  pageSchemas,
  workFrontmatterSchema,
  workPageFrontmatterSchema,
} from "./schemas.ts";
import type {
  BuildCard,
  BuildsPage,
  ColophonPage,
  ConsultingPage,
  CvPage,
  HomePage,
  NowPage,
  PageSlug,
  WorkEntry,
  WorkPage,
} from "./schemas.ts";

const contentDir = path.join(process.cwd(), "content");

// Parses one content file and validates its frontmatter. Throws with the
// repo-relative path and the exact zod issues, so a bad file kills the build
// with an error that names the problem.
export function parseContentFile<S extends z.ZodType>(
  relPath: string,
  schema: S
): { frontmatter: z.infer<S>; body: string } {
  const raw = fs.readFileSync(path.join(process.cwd(), relPath), "utf-8");
  const { data, content } = matter(raw);
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in ${relPath}:\n${z.prettifyError(result.error)}`
    );
  }
  const body = content.trim();
  if (body.length === 0) {
    throw new Error(`Empty body in ${relPath}`);
  }
  return { frontmatter: result.data, body };
}

export function listContentFiles(subdir: string): string[] {
  return fs
    .readdirSync(path.join(contentDir, subdir))
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => path.join("content", subdir, name));
}

// Filenames in collections carry an NN- prefix for editor legibility; the
// frontmatter number is the source of truth. A mismatch fails the build.
function slugFromNumberedFile(relPath: string, expected: number): string {
  const name = path.basename(relPath, ".md");
  const match = name.match(/^(\d{2})-(.+)$/);
  if (!match) {
    throw new Error(
      `Bad filename ${relPath}: expected an NN-slug.md name, like 01-lightyear.md`
    );
  }
  if (Number(match[1]) !== expected) {
    throw new Error(
      `Filename prefix ${match[1]} in ${relPath} does not match its frontmatter value ${expected}`
    );
  }
  return match[2];
}

function assertUnique(values: number[], what: string): void {
  const dupes = values.filter((v, i) => values.indexOf(v) !== i);
  if (dupes.length > 0) {
    throw new Error(`Duplicate ${what}: ${[...new Set(dupes)].join(", ")}`);
  }
}

export function getWorkEntries(): WorkEntry[] {
  const entries = listContentFiles("work").map((relPath) => {
    const { frontmatter, body } = parseContentFile(
      relPath,
      workFrontmatterSchema
    );
    const slug = slugFromNumberedFile(relPath, frontmatter.order);
    return { ...frontmatter, slug, body };
  });
  assertUnique(
    entries.map((e) => e.order),
    "order values in content/work"
  );
  return entries.sort((a, b) => a.order - b.order);
}

export function getBuildCards(): BuildCard[] {
  const cards = listContentFiles("builds").map((relPath) => {
    const { frontmatter, body } = parseContentFile(
      relPath,
      buildFrontmatterSchema
    );
    const slug = slugFromNumberedFile(relPath, frontmatter.number);
    return { ...frontmatter, slug, body };
  });
  assertUnique(
    cards.map((c) => c.number),
    "number values in content/builds"
  );
  return cards.sort((a, b) => a.number - b.number);
}

function pagePath(slug: PageSlug): string {
  return path.join("content", "pages", `${slug}.md`);
}

export function getHomePage(): HomePage {
  const { frontmatter, body } = parseContentFile(
    pagePath("home"),
    homeFrontmatterSchema
  );
  return { ...frontmatter, body };
}

export function getNowPage(): NowPage {
  const { frontmatter, body } = parseContentFile(
    pagePath("now"),
    nowFrontmatterSchema
  );
  return { ...frontmatter, body };
}

export function getWorkPage(): WorkPage {
  const { frontmatter, body } = parseContentFile(
    pagePath("work"),
    workPageFrontmatterSchema
  );
  return { ...frontmatter, body };
}

export function getCvPage(): CvPage {
  const { frontmatter, body } = parseContentFile(
    pagePath("cv"),
    cvFrontmatterSchema
  );
  return { ...frontmatter, body };
}

export function getBuildsPage(): BuildsPage {
  const { frontmatter, body } = parseContentFile(
    pagePath("builds"),
    buildsFrontmatterSchema
  );
  return { ...frontmatter, body };
}

export function getConsultingPage(): ConsultingPage {
  const { frontmatter, body } = parseContentFile(
    pagePath("consulting"),
    consultingFrontmatterSchema
  );
  return { ...frontmatter, body };
}

export function getColophonPage(): ColophonPage {
  const { frontmatter, body } = parseContentFile(
    pagePath("colophon"),
    colophonFrontmatterSchema
  );
  return { ...frontmatter, body };
}

export { pageSchemas };
