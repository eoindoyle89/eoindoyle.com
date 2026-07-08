import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { InlineMarkdown, Markdown } from "@/components/Markdown";
import { getHomePage } from "@/lib/content";
import headshot from "../../assets/DSC08435.jpg";
import styles from "./page.module.css";

// Must match the import path above. If the file moves, the import breaks
// the build, so the displayed path cannot drift silently.
const headshotRepoPath = "assets/DSC08435.jpg";

export default function Home() {
  const home = getHomePage();
  return (
    <>
      <main className={styles.main}>
        <div>
          <Eyebrow className={styles.eyebrow}>{home.eyebrow}</Eyebrow>
          <h1 className={styles.tagline}>
            <InlineMarkdown text={home.tagline} />
          </h1>
          <div className={styles.intro}>
            <Markdown text={home.body} />
          </div>
          <nav className={styles.doors} aria-label="Sections">
            {home.doors.map(({ label, href }) => (
              <Link key={href} href={href} className={styles.door}>
                <span className={styles.doorLabel}>{label}</span>
                <span className={styles.doorPath}>{href} →</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.aside}>
          <figure className={styles.figure}>
            <span className={`${styles.tick} ${styles.tickTl}`} aria-hidden />
            <span className={`${styles.tick} ${styles.tickTr}`} aria-hidden />
            <span className={`${styles.tick} ${styles.tickBl}`} aria-hidden />
            <span className={`${styles.tick} ${styles.tickBr}`} aria-hidden />
            <div className={styles.frame}>
              <Image
                src={headshot}
                alt={home.headshot.alt}
                placeholder="blur"
                sizes="(max-width: 640px) 210px, 224px"
                className={styles.photo}
              />
            </div>
          </figure>
          <dl className={styles.meta}>
            <dt>file</dt>
            <dd>{headshotRepoPath}</dd>
            <dt>dims</dt>
            <dd>
              {headshot.width} × {headshot.height} · {home.headshot.colorSpace}
            </dd>
            <dt>usage</dt>
            <dd>
              {home.headshot.usage} · {home.headshot.caption}
            </dd>
          </dl>
        </div>
      </main>
      <aside className={styles.noteStrip}>
        <p className={styles.note}>
          <InlineMarkdown text={home.footerNote} />
        </p>
      </aside>
    </>
  );
}
