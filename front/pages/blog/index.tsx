import { GetStaticProps } from "next";
import { useState } from "react";
import HeadItem from "components/HeadItem";
import Header from "components/Header";
import Footer from "components/Footer";
import BlogsItem from "components/BlogsItem";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "styles/Blogs.module.scss";
import { Blogs, Tags } from "interface";
import { InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const res_blogs = await fetch(
    "https://monica-portfolio.microcms.io/api/v1/blog",
    {
      headers: { "X-MICROCMS-API-KEY": "2e6bdd36fdb841409adac94e6a71f24b8b1f" },
    }
  );
  const res_tags = await fetch(
    "https://monica-portfolio.microcms.io/api/v1/blog_tags",
    {
      headers: {
        "X-MICROCMS-API-KEY": "2e6bdd36fdb841409adac94e6a71f24b8b1f",
      },
    }
  );
  const blogs_data = await res_blogs.json();
  const blogs: Blogs[] = blogs_data.contents;
  const tags_data = await res_tags.json();
  const tags: Tags[] = tags_data.contents;
  return {
    props: {
      blogs,
      tags,
    },
  };
};

const BlogsIndex = ({
  blogs,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [showMore, setShowMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isTagOpen, setIsTagOpen] = useState(false);
  var item_length = 0;
  function getBlogs(blogs: Blogs[]): Blogs[] {
    var blogs_list: Blogs[] = [];
    blogs.map((blog: Blogs) => {
      if (
        blog.title.includes(searchText) ||
        blog.description.includes(searchText) ||
        blog.content.includes(searchText)
      ) {
        blogs_list.push(blog);
      }
    });
    item_length = blogs_list.length;
    return !showMore ? blogs_list.slice(0, 6) : blogs_list;
  }
  return (
    <div>
      <HeadItem
        title={"Blogs"}
        description={
          "Webプログラミングをメインに活動している「Monica」の制作物や技術記事をまとめたポートフォリオです。"
        }
        keyword={"monica,プログラマー,エンジニア,高校生,大学生,ポートフォリオ"}
        image={"https://avatars.githubusercontent.com/u/80559385?v=4"}
      />
      <Header position={"blogs"} />
      <div className={styles.blogs}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.title}>Blogs</div>
            <div
              className={styles.search_btn}
              onClick={() => setIsTagOpen(!isTagOpen)}
            >
              <Image src="/search.svg" alt="search" width={40} height={40} />
            </div>
          </div>
          <div className={`${styles.tags} ${isTagOpen ? styles.open : ""}`}>
            <input
              className={styles.search_field}
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Link href={`/blogs/`}>
              <a className={`${styles.tags_item} ${styles.now}`}>ALL</a>
            </Link>
            {tags.map((tag: Tags, index: number) => (
              <Link href={`/blogs/tags/${tag.slug}`} key={index}>
                <a className={styles.tags_item}>{tag.name}</a>
              </Link>
            ))}
          </div>
          <div className={styles.list}>
            {getBlogs(blogs).map((blog: Blogs, index: number) => (
              <BlogsItem blog={blog} key={index} />
            ))}
          </div>
          <div
            className={styles.more}
            style={
              !showMore && item_length > 6
                ? { display: "flex" }
                : { display: "none" }
            }
            onClick={() => setShowMore(!showMore)}
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
export default BlogsIndex;
