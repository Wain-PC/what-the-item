import React from "react";
import PropTypes from "prop-types";
import { Box, Heading } from "grommet";
import TopTable from "../components/topTable";
import NickName from "../components/nickName";

const GameEnd = props => {
  const {
    winner: { activeLetter, nickName },
    top: { players }
  } = props;

  return (
    <Box fill align="center">
      <Heading level={1}>Поздравляем! Вы попали в топ игроков:</Heading>
      <TopTable players={players} />

      <Heading level={3}>Введите никнейм</Heading>
      <NickName activeLetter={activeLetter} nickName={nickName} />
    </Box>
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
