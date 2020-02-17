import React from "react";
import PropTypes from "prop-types";
import styles from "./game.module.css";
import Player from "../../components/player/player";
import Button from "../../components/button/button";
import Screen from "../../components/screen/screen";
import Audio from "../../components/audio/audio";

const Game = props => {
  const {
    round: { pictures, answerIndex },
    players: { list },
    game: {
      round,
      message: { answered }
    },
    timer: { timer }
  } = props;

  const imageURL = pictures[answerIndex]
    ? pictures[answerIndex].picture
    : undefined;

  const buttons = pictures.map(({ picture, selectedBy }, index) => {
    let correct;
    if (selectedBy !== -1) {
      correct = index === answerIndex;
    }
    return (
      <Button key={picture} index={index} text={picture} correct={correct} />
    );
  });

  let audio = null;

  if (answered !== undefined) {
    audio = <Audio src={answered ? "correct" : "notAnswered"} />;
  }

  return (
    <div className={styles.grid}>
      {audio}
      <div className={styles.player1}>
        {list[0] && (
          <Player
            index={list[0].index}
            name={list[0].name}
            score={list[0].score}
            scoreAdd={list[0].scoreAdd}
          />
        )}
      </div>
      <div className={styles.screen}>
        <Screen
          round={round}
          timer={timer}
          imageURL={imageURL}
          isCorrectAnswer={answered}
        />
      </div>
      <div className={styles.player2}>
        {list[1] && (
          <Player
            index={list[1].index}
            name={list[1].name}
            score={list[1].score}
            scoreAdd={list[1].scoreAdd}
          />
        )}
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
    pictures: PropTypes.arrayOf(
      PropTypes.shape({
        picture: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        selectedBy: PropTypes.number.isRequired,
        correct: PropTypes.oneOf([true, false, null])
      })
    ).isRequired,
    answerIndex: PropTypes.number.isRequired
  }).isRequired,
  players: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        scoreAdd: PropTypes.number
      })
    ).isRequired
  }).isRequired,
  game: PropTypes.shape({
    round: PropTypes.number.isRequired,
    message: PropTypes.shape({
      answered: PropTypes.bool
    }).isRequired
  }).isRequired
};

export default Game;
