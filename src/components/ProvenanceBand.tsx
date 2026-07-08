import Link from "next/link";
import { getProvenance, site } from "@/lib/site";
import styles from "./ProvenanceBand.module.css";

export function ProvenanceBand() {
  const { builtDate, sha } = getProvenance();
  return (
    <footer className={styles.band}>
      <div className={styles.inner}>
        <nav className={styles.links} aria-label="Footer">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.linkedin}>linkedin</a>
          <a href={site.github}>github</a>
          <Link href="/cv">cv</Link>
          <Link href="/colophon">colophon</Link>
        </nav>
        <p className={styles.provenance}>
          <span>
            built <span className={styles.value}>{builtDate}</span>
          </span>
          <span>
            agent <span className={styles.value}>{site.agent}</span>
          </span>
          {sha !== null && (
            <span>
              commit{" "}
              <a
                className={styles.commit}
                href={`${site.repoUrl}/commit/${sha}`}
              >
                {sha.slice(0, 7)}
              </a>
            </span>
          )}
          <a className={styles.source} href={site.repoUrl}>
            view source ↗
          </a>
        </p>
      </div>
    </footer>
  );
}
