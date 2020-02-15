import React from "react";
import PropTypes from "prop-types";
import styles from "./game.module.css";
import Player from "../../components/player/player";
import Button from "../../components/button/button";
import Thumb from "../../components/thumb/thumb";

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

  const reaction =
    answered !== undefined ? <Thumb down={answered === false} /> : null;

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        {list[0] && (
          <Player
            index={list[0].index}
            name={list[0].name}
            score={list[0].score}
          />
        )}
        <div className={styles.screen}>
          <div className={styles.screenHeaderContainer}>
            <div className={styles.screenTextRound}>Round-{round}:</div>
            <div className={styles.screenTextTimer}>{timer}</div>
          </div>
          <img
            className={styles.image}
            src={`/pictures/${
              pictures[answerIndex] ? pictures[answerIndex].picture : ""
            }.jpg`}
            alt="round"
          />
          {reaction}
        </div>
        {list[1] && (
          <Player
            index={list[1].index}
            name={list[1].name}
            score={list[1].score}
          />
        )}
      </div>
      <div className={styles.buttons}>
        {pictures.map(({ picture, selectedBy }, index) => {
          let correct;
          if (selectedBy !== -1) {
            correct = index === answerIndex;
          }
          return (
            <Button
              key={picture}
              index={index}
              text={picture}
              correct={correct}
            />
          );
        })}
      </div>
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
        score: PropTypes.number.isRequired
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
