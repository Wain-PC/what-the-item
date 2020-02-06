import React from "react";
import PropTypes from "prop-types";
import { Box, Text, Heading } from "grommet";

const Player = ({ player: { name, score, ready, gameStarted } = {} }) => {
  if (!name) {
    return null;
  }

  const readyText = gameStarted ? null : (
    <Heading
      level={3}
      size="medium"
      color={ready ? "status-ok" : "status-error"}
    >
      {ready ? "Готов" : "Не готов"}
    </Heading>
  );
  const scoreText = gameStarted ? <Text>{score} очков</Text> : null;

  return (
    <Box fill pad={{ horizontal: "medium" }}>
      <Heading level={1} size="medium">
        {name}
      </Heading>
      {scoreText}
      {readyText}
    </Box>
  );
};

Player.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    ready: PropTypes.bool.isRequired,
    gameStarted: PropTypes.bool.isRequired
  }).isRequired
};

export default Player;
