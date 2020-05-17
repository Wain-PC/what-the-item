import React from "react";
import styles from "./controls.module.css";
import Button from "../../components/button/button";

const Controls = () => {
  return (
    <div className={styles.root}>
      <div className={styles.controls} />
      <div className={styles.heading}>Выбирайте ответ при помощи кнопок</div>
      <div className={styles.buttons}>
        <Button index={0} />
        <Button index={1} />
        <Button index={2} />
        <Button index={3} />
      </div>
    </div>
  );
};

export default Controls;
