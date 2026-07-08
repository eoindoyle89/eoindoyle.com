import Link from "next/link";
import { getProvenance, site } from "@/lib/site";
import styles from "./ProvenanceBand.module.css";

export function ProvenanceBand() {
  const { builtDate, sha } = getProvenance();
  return (
    <footer className={styles.band}>
      <div className={styles.inner}>
        <p className={styles.provenance}>
          built {builtDate} · agent {site.agent}
          {sha !== null && (
            <>
              {" "}
              · commit{" "}
              <a href={`${site.repoUrl}/commit/${sha}`}>{sha.slice(0, 7)}</a>
            </>
          )}{" "}
          · <a href={site.repoUrl}>view source ↗</a>
        </p>
        <nav className={styles.links} aria-label="Footer">
          <a href={`mailto:${site.email}`}>email</a>
          <a href={site.linkedin}>linkedin</a>
          <a href={site.github}>github</a>
          <Link href="/colophon">colophon</Link>
        </nav>
      </div>
    </footer>
  );
}
