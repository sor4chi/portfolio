import { useMail } from "hooks/useMail";
import HeadItem from "components/HeadItem";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "styles/Contact.module.scss";
import Link from "next/link";

const ContactIndex = () => {
  const { setName, setEmail, setSubject, setMessage, send, isBlank } =
    useMail();
  return (
    <div>
      <HeadItem
        title={"Contact"}
        description={
          "Webプログラミングをメインに活動している「Monica」の制作物や技術記事をまとめたポートフォリオです。"
        }
        keyword={"monica,プログラマー,大学生,ポートフォリオ"}
        image={"https://avatars.githubusercontent.com/u/80559385?v=4"}
      />
      <Header position={"contact"} />

      <div className={styles.contact}>
        <div className={styles.wrapper + " wrapper"}>
          <div className={styles.form}>
            <h1 className={styles.title}>CONTACT</h1>
            <p>
              お問い合わせにはこちらのフォームもしくは
              <Link href="https://twitter.com/monica18_pr">
                <a>TwitterのDM</a>
              </Link>
              までお願いします。返信が遅くなる場合がございますのでご了承ください。
            </p>
            <label htmlFor="name">お名前</label>
            <input
              id="name"
              type="text"
              placeholder="NAME"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="text"
              placeholder="EMAIL"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="subject">件名</label>
            <input
              id="subject"
              type="text"
              placeholder="SUBJECT"
              onChange={(e) => setSubject(e.target.value)}
            />
            <label htmlFor="content">内容</label>
            <textarea
              id="content"
              rows={5}
              placeholder="MESSAGE"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="button"
              className={!isBlank() ? styles.allow : ""}
              disabled={isBlank()}
              onClick={send}
            >
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
