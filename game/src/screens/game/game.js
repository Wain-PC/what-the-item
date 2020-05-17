import React from "react";
import PropTypes from "prop-types";
import styles from "./game.module.css";
import Player from "../../components/player/player";
import Button from "../../components/button/button";
import Screen from "../../components/screen/screen";

const Game = props => {
  const {
    round: {
      index: roundIndex,
      image: { image: imageURL },
      selection
    },
    game: {
      message: { answered },
      player
    },
    timer: { timer }
  } = props;

  const buttons = selection.map(({ title }, index) => {
    return <Button key={title} index={index} text={title} />;
  });

  return (
    <div className={styles.grid}>
      <div className={styles.player1}>
        <Player
          index={player.index}
          name={player.name}
          score={player.score}
          scoreAdd={player.scoreAdd}
        />
      </div>
      <div className={styles.screen}>
        <Screen
          round={roundIndex}
          timer={timer}
          imageURL={imageURL}
          isCorrectAnswer={answered}
        />
      </div>
      <div className={styles.footer}>{buttons}</div>
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
        title: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        selectedBy: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    answerIndex: PropTypes.number.isRequired
  }).isRequired,
  game: PropTypes.shape({
    message: PropTypes.shape({
      answered: PropTypes.bool
    }).isRequired,
    player: PropTypes.shape({
      index: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      scoreAdd: PropTypes.number
    })
  }).isRequired
};

export default Game;
