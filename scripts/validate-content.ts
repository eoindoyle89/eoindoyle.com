// Content schema validation, run by `npm run validate` and as a prebuild
// step. Unlike the loaders in src/lib/content.ts, which fail fast, this
// script checks every file and reports every problem before exiting.
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {
  listContentFiles,
  parseContentFile,
} from "../src/lib/content.ts";
import {
  buildFrontmatterSchema,
  pageSchemas,
  workFrontmatterSchema,
} from "../src/lib/schemas.ts";

const failures: { file: string; message: string }[] = [];
const passed: string[] = [];

function check(file: string, run: () => void): void {
  try {
    run();
    passed.push(file);
  } catch (error) {
    failures.push({
      file,
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

function checkNumberedCollection(
  subdir: "work" | "builds",
  schema: typeof workFrontmatterSchema | typeof buildFrontmatterSchema,
  numberField: "order" | "number"
): void {
  const seen = new Map<number, string>();
  for (const relPath of listContentFiles(subdir)) {
    check(relPath, () => {
      const { frontmatter } = parseContentFile(relPath, schema);
      const value = (frontmatter as Record<string, unknown>)[
        numberField
      ] as number;
      const prefix = path.basename(relPath).slice(0, 2);
      if (!/^\d{2}-.+\.md$/.test(path.basename(relPath))) {
        throw new Error(
          `Bad filename ${relPath}: expected an NN-slug.md name, like 01-lightyear.md`
        );
      }
      if (Number(prefix) !== value) {
        throw new Error(
          `Filename prefix ${prefix} in ${relPath} does not match ${numberField} ${value}`
        );
      }
      const clash = seen.get(value);
      if (clash !== undefined) {
        throw new Error(
          `${numberField} ${value} in ${relPath} is already used by ${clash}`
        );
      }
      seen.set(value, relPath);
    });
  }
}

checkNumberedCollection("work", workFrontmatterSchema, "order");
checkNumberedCollection("builds", buildFrontmatterSchema, "number");

// Every page in the manifest must exist and validate.
for (const [slug, schema] of Object.entries(pageSchemas)) {
  const relPath = path.join("content", "pages", `${slug}.md`);
  check(relPath, () => {
    if (!fs.existsSync(path.join(process.cwd(), relPath))) {
      throw new Error(`Missing required page file ${relPath}`);
    }
    parseContentFile(relPath, schema);
  });
}

// Nothing unvalidated can ship: every .md under content/ must live in
// work/, builds/, or the pages manifest.
const knownDirs = new Set(["work", "builds", "pages"]);
const contentRoot = path.join(process.cwd(), "content");
for (const entry of fs.readdirSync(contentRoot, {
  withFileTypes: true,
  recursive: true,
})) {
  if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
  const relPath = path.relative(
    process.cwd(),
    path.join(entry.parentPath, entry.name)
  );
  const [dir, ...rest] = path
    .relative(contentRoot, path.join(entry.parentPath, entry.name))
    .split(path.sep);
  const stray =
    !knownDirs.has(dir) ||
    rest.length !== 1 ||
    (dir === "pages" && !(entry.name.replace(/\.md$/, "") in pageSchemas));
  if (stray) {
    failures.push({
      file: relPath,
      message: `Unexpected content file ${relPath}: it matches no schema and would ship unvalidated`,
    });
  }
}

for (const file of passed) {
  console.log(`ok  ${file}`);
}
if (failures.length > 0) {
  console.error("");
  for (const { file, message } of failures) {
    console.error(`FAIL ${file}`);
    console.error(`  ${message.split("\n").join("\n  ")}`);
    console.error("");
  }
  console.error(
    `${failures.length} of ${passed.length + failures.length} content checks failed`
  );
  process.exit(1);
}
console.log(`${passed.length} content files valid`);
