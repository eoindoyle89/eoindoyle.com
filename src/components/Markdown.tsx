import type { ReactNode } from "react";
import Link from "next/link";

// Renders the subset of markdown the content files actually use: paragraphs,
// inline [text](href) links, and *emphasis*. Content is first-party and
// schema-validated, so a dependency-free renderer is enough. Extend this
// deliberately when a page needs more syntax.
const inlinePattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*([^*\n]+)\*/g;

export function InlineMarkdown({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(inlinePattern)) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }
    const [full, linkText, href, emphasis] = match;
    if (emphasis !== undefined) {
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

export function Markdown({ text }: { text: string }): ReactNode {
  return (
    <>
      {text.split(/\n\s*\n/).map((paragraph, i) => (
        <p key={i}>
          <InlineMarkdown text={paragraph.trim()} />
        </p>
      ))}
    </>
  );
}
