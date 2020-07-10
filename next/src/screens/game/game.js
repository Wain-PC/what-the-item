import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./game.module.css";
import Button from "../../components/button/button";
import Screen from "../../components/screen/screen";
import Score from "../../components/score/score";
import Loader from "../../components/loader/loader";

const Game = props => {
  const {
    round: {
      index: roundIndex,
      image: { image: imageURL },
      selection,
      isCorrectAnswer
    },
    game: { player },
    timer: { timer },
    loading: { loading },
    selectAnswer
  } = props;

  let topRow;
  let bottomRow;

  if (imageURL) {
    topRow = (
      <>
        <div className={styles.left}>
          <Score text="Score" count={player.score} countAdd={player.scoreAdd} />
        </div>
        <div className={styles.screen}>
          <Screen
            round={roundIndex}
            timer={timer}
            imageURL={imageURL}
            isCorrectAnswer={isCorrectAnswer}
          />
        </div>
        <div className={styles.right}>
          <Score text="Time" count={timer} />
        </div>
      </>
    );
  } else {
    topRow = <Loader />;
  }

  if (selection.length && !loading) {
    bottomRow = selection.map(
      ({ title, isCorrectAnswer: isCorrect }, index) => {
        return (
          <Button
            key={title}
            index={index}
            text={title}
            correct={isCorrect}
            onClick={() => selectAnswer(index)}
          />
        );
      }
    );
  } else if (imageURL && loading) {
    bottomRow = <Loader />;
  } else {
    bottomRow = null;
  }

  return (
    <div className={styles.grid}>
      <div className={styles.row}>{topRow}</div>
      <div className={cn(styles.row, styles.footer)}>{bottomRow}</div>
    </div>
  );
};

Game.propTypes = {
  timer: PropTypes.shape({
    timer: PropTypes.number.isRequired
  }).isRequired,
  round: PropTypes.shape({
    index: PropTypes.number.isRequired,
    image: PropTypes.shape({
      image: PropTypes.string.isRequired
    }).isRequired,
    selection: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    isCorrectAnswer: PropTypes.bool
  }).isRequired,
  game: PropTypes.shape({
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      scoreAdd: PropTypes.number
    })
  }).isRequired,
  loading: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired,
  selectAnswer: PropTypes.func.isRequired
};

export default Game;
