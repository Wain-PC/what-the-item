import React from "react";
import PropTypes from "prop-types";
import { Box, Image, Heading, List } from "grommet";

const PLAYERS_COLORS = ["accent-3", "accent-4", "accent-1", "accent-2"];

const Game = props => {
  const {
    round: { pictures, answerIndex },
    players: { list },
    game: { round }
  } = props;

  const itemProps = {};

  pictures.forEach(({ correct }, pictureIndex) => {
    list.forEach(({ index: playerIndex, selectedAnswer }) => {
      if (selectedAnswer === pictureIndex) {
        itemProps[pictureIndex] = {
          background: PLAYERS_COLORS[playerIndex]
        };
      }
    });

    if (correct === true) {
      itemProps[pictureIndex] = {
        background: "status-ok"
      };
    } else if (correct === false) {
      itemProps[pictureIndex] = {
        background: "status-error"
      };
    }
  });

  const options = (
    <Box pad="medium" style={{ minHeight: 400 }}>
      <List
        data={pictures.map(({ picture }) => picture)}
        itemProps={itemProps}
      />
    </Box>
  );

  const picture = pictures[answerIndex] ? pictures[answerIndex].picture : null;
  const image = picture ? (
    <Box round="small" fill>
      <Image src={`/pictures/${picture}.jpg`} fill fit="contain" />
    </Box>
  ) : null;

  return (
    <Box align="center">
      <Heading level={1}>Раунд {round}</Heading>
      {image}
      {options}
    </Box>
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
    round: PropTypes.number.isRequired
  }).isRequired
};

export default Game;
