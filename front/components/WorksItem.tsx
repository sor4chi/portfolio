import * as React from "react";
import Link from "next/link";
import styles from "styles/WorksItem.module.scss";
import { Works } from "interface";
import Image from "next/image";
import DateDisplay from "components/DateDisplay";

interface Props {
  work: Works;
}

const WorksItem = ({ work }: Props): JSX.Element => {
  return (
    <Link href={`/works/${work.id}`}>
      <a className={styles.work}>
        <div className={styles.work_inner}>
          <div className={styles.tag}>{work.tag.name}</div>
          <h3 className={styles.title}>{work.title}</h3>
          <div className={styles.date}>
            <DateDisplay datetime_str={work.createdAt} />
          </div>
        </div>
        <Image
          src={work.image.url}
          layout="fill"
          objectFit="cover"
          alt={work.title}
        />
      </a>
    </Link>
  );
};
export default WorksItem;
