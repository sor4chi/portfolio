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
import { Blogs, Tags } from "types";
import { InferGetStaticPropsType } from "next";
import { getBlogs, getBlogsTags } from "lib/api/blogs";

export const getStaticProps: GetStaticProps = async () => {
  const blogs: Blogs[] = await getBlogs();
  const tags: Tags[] = await getBlogsTags();
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
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isTagOpen, setIsTagOpen] = useState(false);
  var item_length = 0;
  var filter_tag = router.query.tag;
  function getBlogs(blogs: Blogs[]): Blogs[] {
    var blogs_list: Blogs[] = [];
    blogs.map((blog: Blogs) => {
      if (
        blog.title.includes(searchText) ||
        blog.description.includes(searchText) ||
        blog.content.includes(searchText)
      ) {
        if (!filter_tag) {
          blogs_list.push(blog);
        } else {
          blog.tags.map((tag: Tags) => {
            if (tag.slug === filter_tag) {
              blogs_list.push(blog);
            }
          });
        }
      }
    });
    item_length = blogs_list.length;
    return !showMore ? blogs_list.slice(0, 6) : blogs_list;
  }
  return (
    <div>
      <HeadItem
        title={"Blog"}
        description={
          "Webプログラミングをメインに活動している「Monica」の制作物や技術記事をまとめたポートフォリオです。"
        }
        keyword={"monica,プログラマー,大学生,ポートフォリオ"}
        image={"https://avatars.githubusercontent.com/u/80559385?v=4"}
      />
      <Header position={"blogs"} />
      <div className={styles.blogs}>
        <div className={styles.wrapper + " wrapper"}>
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
            <Link href={`/blog/`}>
              <a
                className={`${styles.tags_item} ${
                  !filter_tag ? styles.now : ""
                }`}
              >
                ALL
              </a>
            </Link>
            {tags.map((tag: Tags, index: number) => (
              <Link href={`/blog/?tag=${tag.slug}`} key={index}>
                <a
                  className={`${styles.tags_item} ${
                    tag.slug === filter_tag ? styles.now : ""
                  }`}
                >
                  {tag.name}
                </a>
              </Link>
            ))}
          </div>
          <div className={styles.list}>
            {getBlogs(blogs).map((blog: Blogs, index: number) => (
              <BlogsItem blog={blog} key={index} />
            ))}
          </div>
          <div
            className={styles.not_blogs}
            style={item_length ? { display: "none" } : { display: "block" }}
          >
            Sorry, the blogs not found.
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
