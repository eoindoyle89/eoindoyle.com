"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({
  items,
  activeClassName,
}: {
  items: readonly { label: string; href: string }[];
  activeClassName: string;
}) {
  const pathname = usePathname();
  return (
    <>
      {items.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={active ? activeClassName : undefined}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}
