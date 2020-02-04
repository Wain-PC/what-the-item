import React from "react";
import PropTypes from "prop-types";

const renderNickName = (nickName, activeLetter) => {
  const word = nickName.split("").map((letter, index) => {
    if (index === activeLetter) {
      return (
        <span key={letter} style={{ textDecoration: "underline" }}>
          <strong>{letter}</strong>
        </span>
      );
    }
    return <span key={letter}>{letter}</span>;
  });

  return <div>{word}</div>;
};

const GameEnd = props => {
  const {
    winner: { name, activeLetter, nickName }
  } = props;
  return (
    <>
      <div>Игра окончена!</div>
      <div>Победитель: {name}</div>
      <br />
      <div>Введите никнейм: {renderNickName(nickName, activeLetter)}</div>
      <div>
        <strong>Нажмите X, чтобы закончить</strong>
      </div>
    </>
  );
};

GameEnd.propTypes = {
  winner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    activeLetter: PropTypes.number.isRequired,
    nickName: PropTypes.string.isRequired
  }).isRequired
};

export default GameEnd;
