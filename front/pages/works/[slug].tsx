import { GetStaticProps } from "next";
import HeadItem from "components/HeadItem";
import Header from "components/Header";
import Footer from "components/Footer";
import DayDisplay from "components/DateDisplay";
import Image from "next/image";
import styles from "styles/WorksDetail.module.scss";
import { Works } from "types";
import { InferGetStaticPropsType } from "next";
import { getWorks, getWorkBySlug } from "lib/api/works";
import markdownToHtml from "lib/remark/transpiler";

export const getStaticPaths = async () => {
  const res: Works[] = await getWorks();
  const paths: string[] = [];
  res.map((work: Works) => paths.push(`/works/${work.slug}`));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res: Works[] = await getWorks();
  const this_work = res.find((work: Works) => {
    if (work.slug === params!.slug) {
      return work;
    }
  });
  if (!this_work) {
    return { props: { work: {} } };
  }
  const work: Works = await getWorkBySlug(this_work.id);
  work.content = await markdownToHtml(work.content || "");
  return { props: { work } };
};

const WorksDetail = ({
  work,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "http://api:8000/";
  return (
    <div>
      <HeadItem
        title={work.title}
        description={work.description}
        keyword={
          work.categories +
          "monica,プログラマー,エンジニア,大学生,ポートフォリオ"
        }
        image={imageUrl + work.thumbnail.url}
      />
      <Header position={"works"} />
      <div className={styles.wrapper + " wrapper"}>
        <div className={styles.image}>
          <Image
            src={imageUrl + work.thumbnail.url}
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
