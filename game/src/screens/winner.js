import React from "react";
import PropTypes from "prop-types";

const Winner = props => {
  const {
    winner: { name, score }
  } = props;

  return (
    <>
      <h3>Победитель</h3>
      <div>
        <strong>{name}</strong>
      </div>
      <br />
      <h3>Набрано очков</h3>
      <div>
        <strong>{score}</strong>
      </div>
    </>
  );
};

Winner.propTypes = {
  winner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nickName: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
  }).isRequired
};

export default Winner;
