import React from "react";
import cn from "classnames";
import topStyles from "../top/top.module.css";
import styles from "./ready.module.css";
import Player from "../../components/player/player";

const Ready = () => {
  return (
    <div className={styles.root}>
      <div className={cn(styles.header, topStyles.headerAnimation)} />
      <div className={styles.players}>
        <Player />
      </div>
    </div>
  );
};

export default Ready;
