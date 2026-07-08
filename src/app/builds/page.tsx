import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Markdown } from "@/components/Markdown";
import { getBuildCards, getBuildsPage } from "@/lib/content";
import type { BuildCard } from "@/lib/schemas";
import styles from "./page.module.css";

export function generateMetadata(): Metadata {
  return { title: getBuildsPage().title };
}

const statusDisplay: Record<
  BuildCard["status"],
  { dot: string; className: string; label: string }
> = {
  "in-progress": {
    dot: "●",
    className: styles.statusProgress,
    label: "in progress",
  },
  shipped: { dot: "●", className: styles.statusShipped, label: "shipped" },
  designing: {
    dot: "○",
    className: styles.statusDesigning,
    label: "designing",
  },
};

export default function Builds() {
  const page = getBuildsPage();
  const cards = getBuildCards();
  return (
    <main>
      <Eyebrow>
        {page.eyebrow} · {cards.length} {page.entriesLabel}
      </Eyebrow>
      <h1 className={styles.title}>{page.title}</h1>
      <div className={styles.intro}>
        <Markdown text={page.body} />
      </div>
      <ol className={styles.cards}>
        {cards.map((card) => {
          const status = statusDisplay[card.status];
          const featured = card.status === "in-progress";
          return (
            <li
              key={card.slug}
              className={
                featured ? `${styles.card} ${styles.featured}` : styles.card
              }
            >
              <span className={styles.number}>
                {String(card.number).padStart(2, "0")}
              </span>
              <p className={styles.status}>
                <span className={status.className}>
                  {status.dot} {status.label}
                </span>
                {card.builtInPublic && (
                  <span className={styles.statusNote}>built in public</span>
                )}
              </p>
              <div className={styles.body}>
                <h2 className={styles.cardTitle}>{card.title}</h2>
                <Markdown text={card.body} />
                {card.repo !== undefined && (
                  <a className={styles.repoLink} href={card.repo}>
                    {card.repo.replace("https://github.com/", "")} ↗
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
