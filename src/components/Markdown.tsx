import type { ReactNode } from "react";
import Link from "next/link";

// Renders the subset of markdown the content files actually use: paragraphs,
// ## and ### headings, dash bullet lists, inline [text](href) links,
// **strong**, and *emphasis*. Content is first-party and schema-validated,
// so a dependency-free renderer is enough. Extend this deliberately when a
// page needs more syntax.
const inlinePattern =
  /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*|\*([^*\n]+)\*/g;

export function InlineMarkdown({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(inlinePattern)) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }
    const [full, linkText, href, strong, emphasis] = match;
    if (strong !== undefined) {
      nodes.push(
        <strong key={match.index}>
          <InlineMarkdown text={strong} />
        </strong>
      );
    } else if (emphasis !== undefined) {
      nodes.push(
        <em key={match.index}>
          <InlineMarkdown text={emphasis} />
        </em>
      );
    } else if (href.startsWith("/") && !href.includes(".")) {
      // Dotted paths (/llms.txt, /feed.xml) are route handlers, not pages;
      // next/link would prefetch them expecting an RSC payload.
      nodes.push(
        <Link key={match.index} href={href}>
          <InlineMarkdown text={linkText} />
        </Link>
      );
    } else {
      nodes.push(
        <a key={match.index} href={href}>
          <InlineMarkdown text={linkText} />
        </a>
      );
    }
    cursor = match.index + full.length;
  }
  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }
  return <>{nodes}</>;
}

// Bullet items may wrap onto continuation lines; a new item starts only at
// a dash.
function listItems(lines: string[]): string[] {
  const items: string[] = [];
  for (const line of lines) {
    if (line.startsWith("- ")) {
      items.push(line.slice(2));
    } else if (items.length > 0) {
      items[items.length - 1] += ` ${line}`;
    }
  }
  return items;
}

function Block({ block }: { block: string }): ReactNode {
  const lines = block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const [first, ...rest] = lines;
  const headingLevel = first.startsWith("### ")
    ? 3
    : first.startsWith("## ")
      ? 2
      : 0;
  if (headingLevel > 0) {
    const HeadingTag = headingLevel === 3 ? "h3" : "h2";
    return (
      <>
        <HeadingTag>
          <InlineMarkdown text={first.slice(headingLevel + 1)} />
        </HeadingTag>
        {rest.length > 0 && <Block block={rest.join("\n")} />}
      </>
    );
  }
  if (first.startsWith("- ")) {
    return (
      <ul>
        {listItems(lines).map((item, i) => (
          <li key={i}>
            <InlineMarkdown text={item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      <InlineMarkdown text={lines.join(" ")} />
    </p>
  );
}

export function Markdown({ text }: { text: string }): ReactNode {
  const blocks = text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(
      (block) =>
        block.length > 0 &&
        block !== "---" &&
        !(block.startsWith("<!--") && block.endsWith("-->"))
    );
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </>
  );
}
