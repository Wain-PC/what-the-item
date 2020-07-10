import React from "react";
import PropTypes from "prop-types";
import styles from "./screen.module.css";
import Thumb from "../thumb/thumb";

const Screen = ({ round, imageURL, isCorrectAnswer }) => {
  const image = imageURL ? { backgroundImage: `url("${imageURL}")` } : {};
  const thumb =
    isCorrectAnswer !== undefined ? <Thumb down={!isCorrectAnswer} /> : null;

  return (
    <div className={styles.root}>
      <div className={styles.top}>Round-{round + 1}</div>
      <div className={styles.image} style={image} />
      <div className={styles.thumb}>{thumb}</div>
    </div>
  );
};

Screen.propTypes = {
  round: PropTypes.number,
  imageURL: PropTypes.string,
  isCorrectAnswer: PropTypes.bool
};

Screen.defaultProps = {
  round: 0,
  imageURL: "",
  isCorrectAnswer: undefined
};

export default Screen;
