import React from "react";
import PropTypes from "prop-types";
import styles from "./controls.module.css";
import Button from "../../components/button/button";

const Controls = ({ timer: { timer } }) => {
  return (
    <div className={styles.root}>
      <div className={styles.timer}>{timer}</div>
      <div className={styles.heading}>
        Выбирайте правильный ответ быстрее, чтобы получить больше очков!
      </div>
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
