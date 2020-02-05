import React from "react";
import PropTypes from "prop-types";
import TopTable from "../components/topTable";
import NickName from "../components/nickName";

const GameEnd = props => {
  const {
    winner: { activeLetter, nickName },
    top: { players }
  } = props;

  return (
    <>
      <div>Поздравляем! Вы попали в топ игроков:</div>
      <TopTable players={players} />
      <br />
      <div>
        Введите никнейм:
        <NickName activeLetter={activeLetter} nickName={nickName} />
      </div>
      <div>
        <strong>Нажмите X или Enter, чтобы сохранить</strong>
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
