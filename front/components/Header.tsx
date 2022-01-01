import * as React from "react";
import Link from "next/link";
import styles from "styles/Header.module.scss";
import Image from "next/image";
import { useState } from "react";
import SocialIcon from "components/SocialIcon";

interface Props {
  position: string;
}

const Header = ({ position }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header
      className={`${styles.header} ${isOpen ? styles.open : styles.close}`}
    >
      <div className={`${styles.header_inner} ${styles.mobile}`}>
        <nav className={styles.hum_nav}>
          <li className={styles.hum_nav_item}>
            <Link href="/works">
              <a className={position == "works" ? styles.now : ""}>Works</a>
            </Link>
          </li>
          <li className={styles.hum_nav_item}>
            <Link href="/blog">
              <a className={position == "blogs" ? styles.now : ""}>Blog</a>
            </Link>
          </li>
          <li
            className={`${styles.hum_nav_item} ${styles.hum_nav_item_contact}`}
          >
            <Link href="/contact">
              <a className={position == "contact" ? styles.now : ""}>Contact</a>
            </Link>
          </li>
          <li className={styles.hum_nav_item}>
            <SocialIcon />
          </li>
        </nav>
        <Link href="/">
          <a
            className={styles.logo_container}
          >
            <Image
              className={styles.logo}
              src="/logo.svg"
              alt="logo"
              width={100}
              height={60}
            />
          </a>
        </Link>
        <div
          className={`${styles.btn} ${
            !isOpen ? styles.btn_open : styles.btn_close
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`${styles.header_inner} ${styles.pc}`}>
        <Link href="/">
          <a className={styles.logo_container}>
            <Image
              className={styles.logo}
              src="/logo.svg"
              alt="logo"
              width={100}
              height={60}
            />
          </a>
        </Link>
        <nav className={styles.nav}>
          <li className={styles.nav_item}>
            <Link href="/works">
              <a>Works</a>
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li className={`${styles.nav_item} ${styles.nav_item_contact}`}>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
        </nav>
        <div
          className={styles.close}
          style={isOpen ? { display: "block" } : { display: "none" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          CLOSE
        </div>
      </div>
    </header>
  );
};
export default Header;
