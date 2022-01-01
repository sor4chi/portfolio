import { GetStaticProps } from "next";
import HeadItem from "components/HeadItem";
import Header from "components/Header";
import Footer from "components/Footer";
import DayDisplay from "components/DateDisplay";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/BlogsDetail.module.scss";
import { Blogs, Tags } from "types";
import { InferGetStaticPropsType } from "next";
import { getBlogs, getBlogBySlug } from "lib/api/blogs";
import markdownToHtml from "lib/remark/transpiler";

export const getStaticPaths = async () => {
  const res: Blogs[] = await getBlogs();
  const paths: string[] = [];
  res.map((blog: Blogs) => paths.push(`/blog/${blog.slug}`));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res: Blogs[] = await getBlogs();
  const this_blog = res.find((blog: Blogs) => {
    if (blog.slug === params!.slug) {
      return blog;
    }
  });
  if (!this_blog) {
    return { props: { blog: {} } };
  }
  const blog: Blogs = await getBlogBySlug(this_blog.id);
  blog.content = await markdownToHtml(blog.content);
  return {
    props: {
      blog,
    },
  };
};

const BlogsDetail = ({
  blog,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "http://api:8000/";
  return (
    <div>
      <HeadItem
        title={blog.title}
        description={blog.description}
        keyword={blog.tags.map((tag: Tags) => tag.name).join(",")}
        image={`https://res.cloudinary.com/dj8lujsue/image/upload/l_text:Sawarabi%20Gothic_72_light:${blog.title},co_rgb:fff,w_1000,c_fit/v1638148802/background_jisyrc.png`}
      />
      <Header position={"blogs"} />

      <div className={styles.wrapper + " wrapper"}>
        <div className={styles.image}>
          <Image
            src={imageUrl + blog.thumbnail.url}
            objectFit="cover"
            layout="fill"
            alt={blog.title}
          />
        </div>
        <div className={styles.meta}>
          <h1 className={styles.title}>{blog.title}</h1>
        </div>
        <div className={styles.meta_sub}>
          <div className={styles.tags}>
            {blog.tags.map((tag: Tags, index: number) => (
              <Link href={`/blog/?tag=${tag.slug}`} key={index}>
                <a className={styles.tags_item}>{tag.name}</a>
              </Link>
            ))}
          </div>
          <DayDisplay datetime_str={blog.createdAt} />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
      <Footer />
    </div>
  );
};
export default BlogsDetail;
