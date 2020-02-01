import React from "react";
import PropTypes from "prop-types";

const GameEnd = () => {
  return (
    <>
      <div>Игра окончена!</div>
      <div>Победитель здесь</div>
      <div>
        <strong>Нажмите X, чтобы закончить</strong>
      </div>
    </>
  );
};

GameEnd.propTypes = {
  players: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired
};

export default GameEnd;
