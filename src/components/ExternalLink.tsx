import type { AnchorHTMLAttributes, ReactNode } from "react";

// Links that leave the site open in a new tab. rel="noopener noreferrer" is
// the security default target="_blank" requires, and satisfies the Lighthouse
// best-practices audit. mailto: and internal links do not use this.
export function ExternalLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} {...rest} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
