import React from "react";
import PropTypes from "prop-types";

const Game = props => {
  const {
    timer: { timer },
    round: { pictures, answer },
    players: { list }
  } = props;

  const options = pictures.map((picture, index) => {
    const text = <span>{picture}</span>;
    const selectionLeft =
      list[0] && list[0].selectedAnswer === index ? (
        <span>
          <strong>→</strong>
        </span>
      ) : null;
    const selectionRight =
      list[1] && list[1].selectedAnswer === index ? (
        <span>
          <strong>←</strong>
        </span>
      ) : null;

    return (
      <div key={picture}>
        {selectionLeft}
        {text}
        {selectionRight}
      </div>
    );
  });

  return (
    <>
      <div>
        Time left:
        <strong>{timer}</strong>
      </div>
      <img
        src={`/pictures/${answer}.jpg`}
        alt="Что здесь изображено?"
        style={{ maxHeight: "400px" }}
      />
      {options}
    </>
  );
};

Game.propTypes = {
  timer: PropTypes.shape({
    timer: PropTypes.number.isRequired
  }).isRequired,
  round: PropTypes.shape({
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired
  }).isRequired,
  players: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        selectedAnswer: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Game;
