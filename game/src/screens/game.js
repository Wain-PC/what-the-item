import React from "react";
import PropTypes from "prop-types";

const Game = props => {
  const {
    timer: { timer }
  } = props;

  return (
    <>
      <div>Game Screen</div>
      <div>
        Time left:
        <strong>{timer}</strong>
      </div>
      <div>A picture of an item here</div>
      <div>4 Options here</div>
    </>
  );
};

Game.propTypes = {
  timer: PropTypes.shape({
    timer: PropTypes.number.isRequired
  }).isRequired
};

export default Game;
