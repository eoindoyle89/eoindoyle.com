import Link from "next/link";
import { ExternalLink } from "@/components/ExternalLink";
import { getProvenance, site } from "@/lib/site";
import styles from "./ProvenanceBand.module.css";

export function ProvenanceBand() {
  const { builtDate, sha } = getProvenance();
  return (
    <footer className={styles.band}>
      <div className={styles.inner}>
        <nav className={styles.links} aria-label="Footer">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <ExternalLink href={site.linkedin}>linkedin</ExternalLink>
          <ExternalLink href={site.github}>github</ExternalLink>
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
              <ExternalLink
                className={styles.commit}
                href={`${site.repoUrl}/commit/${sha}`}
              >
                {sha.slice(0, 7)}
              </ExternalLink>
            </span>
          )}
          <ExternalLink className={styles.source} href={site.repoUrl}>
            view source ↗
          </ExternalLink>
        </p>
      </div>
    </footer>
  );
}
