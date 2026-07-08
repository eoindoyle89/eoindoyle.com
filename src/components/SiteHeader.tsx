import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { navItems, site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.name}>
        {site.name}
      </Link>
      <nav className={styles.nav} aria-label="Site">
        <NavLinks items={navItems} activeClassName={styles.active} />
      </nav>
    </header>
  );
}
