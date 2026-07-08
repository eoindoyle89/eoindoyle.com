import Link from "next/link";
import { navItems, site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.name}>
        {site.name}
      </Link>
      <nav className={styles.nav} aria-label="Site">
        {navItems.map(({ label, href }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
