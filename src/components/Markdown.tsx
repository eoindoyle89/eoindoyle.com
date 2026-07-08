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
      nodes.push(<strong key={match.index}>{strong}</strong>);
    } else if (emphasis !== undefined) {
      nodes.push(<em key={match.index}>{emphasis}</em>);
    } else if (href.startsWith("/")) {
      nodes.push(
        <Link key={match.index} href={href}>
          {linkText}
        </Link>
      );
    } else {
      nodes.push(
        <a key={match.index} href={href}>
          {linkText}
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

function Block({ block, index }: { block: string; index: number }): ReactNode {
  if (block.startsWith("### ")) {
    return <h3>{<InlineMarkdown text={block.slice(4)} />}</h3>;
  }
  if (block.startsWith("## ")) {
    return <h2>{<InlineMarkdown text={block.slice(3)} />}</h2>;
  }
  const lines = block.split("\n").map((line) => line.trim());
  if (lines.every((line) => line.startsWith("- "))) {
    return (
      <ul>
        {lines.map((line, i) => (
          <li key={i}>
            <InlineMarkdown text={line.slice(2)} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p key={index}>
      <InlineMarkdown text={block} />
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
        <Block key={i} block={block} index={i} />
      ))}
    </>
  );
}
