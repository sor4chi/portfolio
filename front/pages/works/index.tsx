import { GetStaticProps } from "next";
import { useState } from "react";
import HeadItem from "components/HeadItem";
import Header from "components/Header";
import Footer from "components/Footer";
import WorksItem from "components/WorksItem";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "styles/Works.module.scss";
import { Works, Tags, monthNames } from "interface";
import { InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const res_works = await fetch(
    "https://monica-portfolio.microcms.io/api/v1/works",
    {
      headers: { "X-MICROCMS-API-KEY": "2e6bdd36fdb841409adac94e6a71f24b8b1f" },
    }
  );
  const res_tags = await fetch(
    "https://monica-portfolio.microcms.io/api/v1/tags",
    {
      headers: { "X-MICROCMS-API-KEY": "2e6bdd36fdb841409adac94e6a71f24b8b1f" },
    }
  );
  const works_data = await res_works.json();
  const works: Works[] = works_data.contents;
  const tags_data = await res_tags.json();
  const tags: Tags[] = tags_data.contents;
  return {
    props: {
      works,
      tags,
    },
  };
};

const WorksIndex = ({
  works,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [showmore, setShowmore] = useState(false);
  var disp_works: Works[] = [];
  function getWorks(works: Works[]): Works[] {
    var works_list: Works[] = [];
    var count = 0;
    disp_works = [];
    works.map((work: Works) => {
      if (router.query.tag === work.tag.slug || !router.query.tag) {
        if (count < 6) {
          works_list.push(work);
        }
        disp_works.push(work);
        if (!showmore) {
          count++;
        }
      }
    });
    return works_list;
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
      <div className={styles.works}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Link href="">
              <a className={styles.title}>Works</a>
            </Link>
            {[...tags].reverse().map((tag: Tags) => (
              <Link href={`?tag=${tag.slug}`} key={tag.id}>
                <a
                  className={`${styles.tag} ${
                    router.query.tag === tag.slug ? styles.selected : ""
                  }`}
                >
                  {tag.name}
                </a>
              </Link>
            ))}
          </div>
          <div className={styles.list}>
            {getWorks(works).map((work: Works, index: number) => (
              <WorksItem work={work} key={index} />
            ))}
          </div>
          <div
            className={styles.more}
            style={
              !showmore && disp_works.length > 6
                ? { display: "flex" }
                : { display: "none" }
            }
            onClick={() => setShowmore(!showmore)}
          >
            <p>More</p>
            <Image
              className={styles.moreicon}
              width={40}
              height={40}
              src={"/more.svg"}
              alt={"more"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default WorksIndex;
