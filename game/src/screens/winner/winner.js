import React from "react";
import PropTypes from "prop-types";
import styles from "./winner.module.css";
import WideButton from "../../components/wideButton/wideButton";

const Winner = props => {
  const {
    game: {
      player: { score }
    },
    setScreenGameEnd
  } = props;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerInner} />
      </div>
      <div className={styles.scoreContainer}>
        <div className={styles.score}>{score}</div>
        <div className={styles.text}>Final Score</div>
        <div className={styles.button}>
          <WideButton onClick={setScreenGameEnd} text="ok" />
        </div>
      </div>
    </div>
  );
};

Winner.propTypes = {
  game: PropTypes.shape({
    player: PropTypes.shape({
      score: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  setScreenGameEnd: PropTypes.func.isRequired
};

export default Winner;
