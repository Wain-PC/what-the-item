import React from "react";
import PropTypes from "prop-types";
import Message from "../components/message";

const PLAYERS_COLORS = ["aquamarine", "coral", "brown", "teal"];

const Game = props => {
  const {
    timer: { timer },
    round: { pictures, answerIndex },
    players: { list },
    game: { message }
  } = props;

  const options = pictures.map(({ picture, correct }, pictureIndex) => {
    const text = <span>{picture}</span>;
    const style = {};
    list.forEach(({ index: playerIndex, selectedAnswer }) => {
      if (selectedAnswer === pictureIndex) {
        style.border = `5px solid ${PLAYERS_COLORS[playerIndex]}`;
      }
    });

    if (correct === true) {
      style.backgroundColor = "green";
    } else if (correct === false) {
      style.backgroundColor = "red";
    }

    return (
      <div key={picture} style={style}>
        {text}
      </div>
    );
  });

  const players = list.map(({ index, name, score }) => (
    <div key={name} style={{ color: PLAYERS_COLORS[index] }}>
      <strong>{name}:</strong> {score} очков
    </div>
  ));

  return (
    <>
      <div>
        Time left:
        <strong>{timer}</strong>
      </div>
      <Message message={message} />
      <br />
      {players}
      <br />
      {pictures[answerIndex] ? (
        <img
          src={`/pictures/${pictures[answerIndex].picture}.jpg`}
          alt="Что здесь изображено?"
          style={{ maxHeight: "400px" }}
        />
      ) : null}

      {options}
    </>
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
        selectedAnswer: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  game: PropTypes.shape({
    message: PropTypes.object.isRequired
  }).isRequired
};

export default Game;
