import type { ReactNode } from "react";
import styles from "./Eyebrow.module.css";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={className ? `${styles.eyebrow} ${className}` : styles.eyebrow}>
      {children}
    </p>
  );
}
