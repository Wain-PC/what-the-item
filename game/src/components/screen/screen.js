import React from "react";
import PropTypes from "prop-types";
import styles from "./screen.module.css";
import Thumb from "../thumb/thumb";

const Screen = ({ round, timer, imageURL, isCorrectAnswer }) => {
  const src = `/pictures/${imageURL}.jpg`;
  const image = imageURL ? { backgroundImage: `url("${src}")` } : {};
  const thumb =
    isCorrectAnswer !== undefined ? <Thumb down={!isCorrectAnswer} /> : null;
  const roundDiv = <div className={styles.round}>Round-{round}:</div>;
  const timerDiv = <div className={styles.timer}>{timer}</div>;

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        {roundDiv}
        {timerDiv}
      </div>
      <div className={styles.image} style={image}>
        <div className={styles.thumb}>{thumb}</div>
      </div>
    </div>
  );
};

Screen.propTypes = {
  round: PropTypes.number,
  timer: PropTypes.number,
  imageURL: PropTypes.string,
  isCorrectAnswer: PropTypes.bool
};

Screen.defaultProps = {
  round: 0,
  timer: 0,
  imageURL: "",
  isCorrectAnswer: undefined
};

export default Screen;
