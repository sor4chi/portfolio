import { GetStaticProps } from "next";
import HeadItem from "components/HeadItem";
import Header from "components/Header";
import Footer from "components/Footer";
import WorksItem from "components/WorksItem";
import DayDisplay from "components/DateDisplay";
import Link from "next/link";
import Image from "next/image";
import styles from "styles/WorksDetail.module.scss";
import { Works, Tags, monthNames } from "interface";
import { InferGetStaticPropsType } from "next";

export const getStaticPaths = async () => {
  const res = await fetch("https://monica-portfolio.microcms.io/api/v1/works", {
    headers: { "X-MICROCMS-API-KEY": "2e6bdd36fdb841409adac94e6a71f24b8b1f" },
  });
  const json = await res.json();
  const paths = json.contents.map((work: Works) => `/works/${work.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res_works = await fetch(
    `https://monica-portfolio.microcms.io/api/v1/works/${context.params?.id}`,
    {
      headers: { "X-MICROCMS-API-KEY": "2e6bdd36fdb841409adac94e6a71f24b8b1f" },
    }
  );
  const work: Works = await res_works.json();
  return {
    props: {
      work,
    },
  };
};

const WorksDetail = ({
  work,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  function getdate(datetime_str: string) {
    var datetime = new Date(datetime_str);
    var y = datetime.getFullYear();
    var m = monthNames[datetime.getMonth()];
    var d = ("00" + datetime.getDate()).slice(-2);
    return m + " " + d + " " + y;
  }
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
      <Header position={"works"} />
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <Image
            src={work.image.url}
            objectFit="cover"
            layout="fill"
            alt={work.title}
          />
        </div>
        <div className={styles.meta}>
          <h1 className={styles.title}>{work.title}</h1>
          <DayDisplay datetime_str={work.createdAt} />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: work.content }}
        ></div>
      </div>
      <Footer />
    </div>
  );
};
export default WorksDetail;
