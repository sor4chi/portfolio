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
import { Works, Categories } from "types";
import { InferGetStaticPropsType } from "next";
import { getWorks, getWorksCategories } from "lib/api/works";

export const getStaticProps: GetStaticProps = async () => {
  const works: Works[] = await getWorks();
  const categories: Categories[] = await getWorksCategories();
  return {
    props: {
      works,
      categories,
    },
  };
};

const WorksIndex = ({
  works,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [showmore, setShowmore] = useState(false);
  var disp_works: Works[] = [];
  var item_length = 0;
  var category_now = router.query.category || "";
  function getSelectedWorks(works: Works[]): Works[] {
    var works_list: Works[] = [];
    var count = 0;
    disp_works = [];
    works.map((work: Works) => {
      if (
        categories.find((category: Categories) => {
          return category.id === work.works_category_id;
        }).slug === category_now ||
        !category_now
      ) {
        if (count < 6) {
          works_list.push(work);
        }
        disp_works.push(work);
        if (!showmore) {
          count++;
        }
      }
    });
    item_length = works_list.length;
    return works_list;
  }
  return (
    <div>
      <HeadItem
        title={"Works"}
        description={
          "Webプログラミングをメインに活動している「Monica」の制作物や技術記事をまとめたポートフォリオです。"
        }
        keyword={"monica,プログラマー,大学生,ポートフォリオ"}
        image={"https://avatars.githubusercontent.com/u/80559385?v=4"}
      />
      <Header position={"works"} />

      <div className={styles.works}>
        <div className={styles.wrapper + " wrapper"}>
          <div className={styles.header}>
            <Link href="">
              <a className={styles.title}>Works</a>
            </Link>
            <div className={styles.category}>
              {[...categories].reverse().map((category: Categories) => (
                <Link href={`?category=${category.slug}`} key={category.id}>
                  <a
                    className={`${styles.category_inner} ${
                      router.query.category === category.slug
                        ? styles.selected
                        : ""
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: category.name.replace(" ", "<br>"),
                    }}
                  ></a>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.list}>
            {getSelectedWorks(works).map((work: Works, index: number) => (
              <WorksItem work={work} categories={categories} key={index} />
            ))}
          </div>
          <div
            className={styles.not_works}
            style={item_length ? { display: "none" } : { display: "block" }}
          >
            Sorry, the works not found.
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
