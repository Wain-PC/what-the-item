import React from "react";
import PropTypes from "prop-types";
import TopTable from "../components/topTable";

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
    winner: { activeLetter, nickName },
    top: { players }
  } = props;

  return (
    <>
      <div>Игра окончена!</div>
      <TopTable players={players} />
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
  }).isRequired,
  top: PropTypes.shape({
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default GameEnd;
