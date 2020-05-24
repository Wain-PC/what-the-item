import React from "react";
import PropTypes from "prop-types";
import styles from "./winner.module.css";
import WideButton from "../../components/wideButton/wideButton";
import Shapes from "../../components/shapes/shapes";
import Header from "../../components/header/header";
import Root from "../../components/root/root";

const Winner = props => {
  const {
    game: {
      player: { score }
    },
    setScreenGameEnd
  } = props;

  return (
    <Root>
      <Shapes />
      <Header text="you_win" />
      <div className={styles.scoreContainer}>
        <div className={styles.score}>{score}</div>
        <div className={styles.text}>Final Score</div>
        <div className={styles.button}>
          <WideButton onClick={setScreenGameEnd} text="ok" />
        </div>
      </div>
    </Root>
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
