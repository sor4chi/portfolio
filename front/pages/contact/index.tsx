import { useState } from "react";
import { useMail } from "hooks/useMail";
import HeadItem from "components/HeadItem";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "styles/Contact.module.scss";

const ContactIndex = () => {
  const { setName, setEmail, setSubject, setContent, send } = useMail();
  return (
    <div>
      <HeadItem
        title={"Works"}
        description={
          "Webプログラミングをメインに活動している「Monica」の制作物や技術記事をまとめたポートフォリオです。"
        }
        keyword={"monica,プログラマー,エンジニア,高校生,大学生,ポートフォリオ"}
        image={"https://avatars.githubusercontent.com/u/80559385?v=4"}
      />
      <Header position={"contact"} />
      <div className={styles.contact}>
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <h1 className={styles.title}>CONTACT</h1>
            <input
              type="text"
              placeholder="NAME"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="EMAIL"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="SUBJECT"
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              rows={5}
              placeholder="MESSAGE"
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="button" onClick={send}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ContactIndex;
