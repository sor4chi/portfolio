// import { monthNames } from "types";
import * as React from "react";
import styles from "styles/DateDisplay.module.scss";
import Image from "next/image";
import momemt from "moment";

interface Props {
  datetime_str: string;
}

const DayDisplay = ({ datetime_str }: Props): JSX.Element => {
  function getdate(datetime_str: string) {
    var datetime = new Date(datetime_str);
    // var y = datetime.getFullYear();
    // var m = monthNames[datetime.getMonth()];
    // var d = ("00" + datetime.getDate()).slice(-2);
    return momemt(datetime_str).format("MMM DD YYYY");
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <Image
          src="/calendar.svg"
          alt="calender"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.date}>{getdate(datetime_str)}</div>
    </div>
  );
};
export default DayDisplay;
