import React from "react";
import PropTypes from "prop-types";
import styles from "./winner.module.css";

const Winner = props => {
  const {
    game: {
      player: { score }
    }
  } = props;

  return (
    <div className={styles.root}>
      <div className={styles.header} />
      <div className={styles.scoreContainer}>
        <div className={styles.score}>{score}</div>
        <div className={styles.text}>Final Score</div>
      </div>
    </div>
  );
};

Winner.propTypes = {
  game: PropTypes.shape({
    player: PropTypes.shape({
      score: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default Winner;
