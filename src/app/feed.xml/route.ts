import { getHomePage } from "@/lib/content";
import { site } from "@/lib/site";

// RSS scaffold, statically generated at build time per ADR-002. The channel
// is real and deliberately empty: items arrive when the outbound agent's
// build log starts publishing (Phase 2, ADR-006), through the same content
// pipeline as everything else.
export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function GET(): Response {
  const home = getHomePage();
  const items: string[] = [];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(home.description)}</description>
    <language>en-US</language>
${items.join("\n")}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
