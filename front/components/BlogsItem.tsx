import * as React from "react";
import Link from "next/link";
import styles from "styles/BlogsItem.module.scss";
import { Blogs } from "interface";
import Image from "next/image";
import DateDisplay from "components/DateDisplay";

interface Props {
  blog: Blogs;
}

const BlogsItem = ({ blog }: Props): JSX.Element => {
  function getlink(blog: Blogs) {
    if (blog.qiita) {
      return blog.qiita;
    } else if (blog.zenn) {
      return blog.zenn;
    } else {
      return `/blogs/${blog.id}`;
    }
  }
  function ExternalBlogLink(blog: Blogs) {
    if (blog.qiita) {
      return (
        <div className={styles.qiita}>
          Qiita
          <Image src="/jump.svg" alt="qiita" width="24" height="24"></Image>
        </div>
      );
    }
    if (blog.zenn) {
      return (
        <div className={styles.zenn}>
          Zenn
          <Image src="/jump.svg" alt="zenn" width="24" height="24"></Image>
        </div>
      );
    }
  }
  return (
    <Link href={getlink(blog)}>
      <a className={styles.blog}>
        <div className={styles.blog_inner}>
          <h3 className={styles.title}>{blog.title}</h3>
          <div className={styles.tags}>
            {blog.tags.map((tag) => (
              <div className={styles.tags_item} key={tag.id}>
                {tag.name}
              </div>
            ))}
          </div>
          <div className={styles.externalblog}>{ExternalBlogLink(blog)}</div>
          <div className={styles.date}>
            <DateDisplay datetime_str={blog.createdAt} />
          </div>
        </div>
        <Image
          src={blog.thumbnail.url}
          layout="fill"
          objectFit="cover"
          alt={blog.title}
        />
      </a>
    </Link>
  );
};
export default BlogsItem;
