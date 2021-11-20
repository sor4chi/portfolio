import * as React from "react";
import Link from "next/link";
import styles from "styles/Header.module.scss";

interface Props {
  position: string;
}

const Header = ({ position }: Props): JSX.Element => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <svg
            className={styles.header_icon}
            width="75"
            height="75"
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M25 50V35H35V50H47.5V30H55L30 7.5L5 30H12.5V50H25Z" />
          </svg>
        </a>
      </Link>
      <nav className={styles.nav}>
        <li className={styles.nav_item}>
          <Link href="/works">
            <a>Works</a>
          </Link>
        </li>
        <li className={styles.nav_item}>
          <Link href="/timeline">
            <a>Timeline</a>
          </Link>
        </li>
        <li className={styles.nav_item}>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li className={styles.nav_item_contact}>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </nav>
    </header>
  );
};
export default Header;
