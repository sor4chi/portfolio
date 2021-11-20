import { useState } from "react";
import { GetStaticProps } from "next";
import HeadItem from "components/HeadItem";
import Header from "components/Header";
import Footer from "components/Footer";
import SocialIcon from "components/SocialIcon";
import ArrowSVG from "components/Arrow";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import { Profile, Tags, News, monthNames } from "interface";
import { InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const res_profs = await fetch(
    "https://monica-portfolio.microcms.io/api/v1/profile",
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
  const res_news = await fetch(
    "https://monica-portfolio.microcms.io/api/v1/news",
    {
      headers: { "X-MICROCMS-API-KEY": "2e6bdd36fdb841409adac94e6a71f24b8b1f" },
    }
  );
  const profs_data = await res_profs.json();
  const tags_data = await res_tags.json();
  const news_data = await res_news.json();
  const profs: Profile[] = profs_data.contents;
  const tags: Tags[] = tags_data.contents;
  const news: News[] = news_data.contents;
  return {
    props: {
      profs,
      tags,
      news,
    },
  };
};

const Home = ({
  profs,
  tags,
  news,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  function scrollTo(section_id: string) {
    var element_y = document
      .getElementById(section_id)!
      .getBoundingClientRect().top;
    const offset_y = window.pageYOffset;
    window.scrollTo({
      top: element_y + offset_y,
      behavior: "smooth",
    });
  }
  function getdate(datetime_str: string) {
    var datetime = new Date(datetime_str);
    var y = datetime.getFullYear();
    var m = monthNames[datetime.getMonth()];
    var d = ("00" + datetime.getDate()).slice(-2);
    return m + " " + d + " " + y;
  }
  const [pagenate, setPagenate] = useState(0);
  var pagenate_item = [];
  for (var i = 0; i < profs.length; i++) {
    pagenate_item.push(
      <div
        className={styles.introduction_pagenate_item}
        onClick={() => setPagenate(i)}
      >
        <span
          className={`${styles.introduction_pagenate_item_inner} ${
            i == pagenate ? styles.introduction_pagenate_now : ""
          }`}
        ></span>
      </div>
    );
  }
  return (
    <div>
      <HeadItem
        title={"HOME"}
        description={
          "Webプログラミングをメインに活動している「Monica」の制作物や技術記事をまとめたポートフォリオです。"
        }
        keyword={"monica,プログラマー,エンジニア,高校生,大学生,ポートフォリオ"}
        image={"https://avatars.githubusercontent.com/u/80559385?v=4"}
      />
      <Header position={"index"} />
      <section id="top" className={`${styles.section} ${styles.top}`}>
        <div className={styles.top_left}>
          <h1 className={styles.top_text}>
            Monica&apos;s
            <br />
            Portfolio.
          </h1>
          <div className={styles.top_meta}>
            <SocialIcon />
            <div
              className={styles.top_navigation}
              onClick={() => scrollTo("introduction")}
            >
              Show More Details
              <div className={styles.arrow}>
                <ArrowSVG />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.top_right}>
          <div className={styles.top_img}>
            <Image
              src="/monica.png"
              layout="fill"
              objectFit="cover"
              alt="monica"
            />
          </div>
        </div>
      </section>
      <section
        id="introduction"
        className={`${styles.section} ${styles.introduction}`}
      >
        <h2 className={styles.introduction_title}>Introduction</h2>
        <div className={styles.introduction_container}>
          <div className={styles.introduction_left}>
            <div className={styles.introduction_icon}>
              <Image
                src="/icon.JPG"
                layout="fill"
                objectFit="cover"
                alt="Show More Details"
              />
            </div>
          </div>
          <div className={styles.introduction_right}>
            <div className={styles.introduction_main}>
              <h3 className={styles.introduction_name}>Monica</h3>
              {[...profs].reverse().map((prof: Profile, index: number) => (
                <div
                  className={`${styles.introduction_text} ${
                    index == pagenate ? styles.introduction_text_show : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: prof.content }}
                  key={index}
                ></div>
              ))}
              <div className={styles.introduction_pagenate}>
                {pagenate_item}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="works" className={`${styles.section} ${styles.works}`}>
        <h2 className={styles.works_title}>Works</h2>
        <div className={styles.works_container}>
          {[...tags].reverse().map((tag: Tags, index: number) => (
            <Link href={`/works/?tag=${tag.slug}`} key={index}>
              <a className={styles.works_item}>
                <div className={styles.works_item_container}>
                  <div className={styles.works_icon_wrapper}>
                    <Image
                      className={styles.works_icon}
                      src={`/mark${index}.svg`}
                      width={50}
                      height={50}
                      alt="icon"
                    />
                  </div>
                  <div>
                    <h3
                      className={styles.works_name}
                      dangerouslySetInnerHTML={{
                        __html: tag.name.replace(" ", "<br />"),
                      }}
                    ></h3>
                    <p className={styles.works_num}>{index + 11} Products</p>
                  </div>
                </div>
                <div className={styles.works_navigation}>
                  Show {index + 11} Works
                  <div className={styles.svg}>
                    <svg
                      className={styles.works_link}
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.7917 19.7917H5.20833V5.20833H12.5V3.125H3.125V21.875H21.875V12.5H19.7917V19.7917ZM14.5833 3.125V5.20833H18.3229L8.08333 15.4479L9.55208 16.9167L19.7917 6.67708V10.4167H21.875V3.125H14.5833Z" />
                    </svg>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
        <Link href="/works/">
          <a className={styles.works_navigation2}>
            Show More Works
            <div className={styles.arrow}>
              <ArrowSVG />
            </div>
          </a>
        </Link>
      </section>
      <section id="timeline" className={`${styles.section} ${styles.timeline}`}>
        <div className={styles.timeline_left}>
          <div className={styles.timeline_left_content}>
            <h2 className={styles.timeline_title}>Timeline</h2>
            <p className={styles.timeline_num}>
              <span className={styles.timeline_num_strong}>{news.length}</span>
              News
            </p>
            <div className={styles.timeline_navigation}>
              Show More News
              <div className={styles.arrow}>
                <ArrowSVG />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.timeline_right}>
          <div className={styles.timeline_right_content}>
            {news.slice(0, 4).map((news: News) => (
              <div className={styles.timeline_item} key={news.id}>
                <div className={styles.timeline_item_date}>
                  {getdate(news.eventDate)}
                </div>
                <div className={styles.timeline_item_title}>{news.title}</div>
                <Image
                  src="/triangle.svg"
                  width="40"
                  height="40"
                  alt="Show More Details"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
