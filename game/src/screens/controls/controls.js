import React from "react";
import PropTypes from "prop-types";
import styles from "./controls.module.css";
import Button from "../../components/button";

const Controls = ({ timer: { timer } }) => {
  return (
    <div className={styles.root}>
      <div className={styles.timer}>{timer}</div>
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

Controls.propTypes = {
  timer: PropTypes.shape({
    timer: PropTypes.number.isRequired
  }).isRequired
};

export default Controls;
