import * as React from "react";
import Link from "next/link";
import styles from "styles/WorksItem.module.scss";
import { Works, Categories } from "types";
import Image from "next/image";
import DateDisplay from "components/DateDisplay";

interface Props {
  work: Works;
  categories: Categories[];
}

const WorksItem = ({ work, categories }: Props): JSX.Element => {
  const this_category = categories.find((category: Categories) => {
    return category.id === work.works_category_id;
  });
  const category_name = this_category ? this_category.name : "";
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "http://api:8000/";
  return (
    <Link href={`/works/${work.slug}`}>
      <a className={styles.work}>
        <div className={styles.work_inner}>
          <div className={styles.tag}>{category_name}</div>
          <h3 className={styles.title}>{work.title}</h3>
          <div className={styles.date}>
            <DateDisplay datetime_str={work.createdAt} />
          </div>
        </div>
        <Image
          src={imageUrl + work.thumbnail.url}
          layout="fill"
          objectFit="cover"
          alt={work.title}
        />
      </a>
    </Link>
  );
};
export default WorksItem;
