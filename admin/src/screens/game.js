import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { Card, List, Label, Button } from "semantic-ui-react";

import Image from "../components/image/image";

const Game = ({
  match: {
    params: { id }
  },
  config,
  finished,
  finishedOn,
  players,
  rounds,
  getGame
}) => {
  useEffect(() => {
    getGame(id);
  }, []);

  return JSON.stringify(rounds);
};

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  config: PropTypes.shape({
    gameplay: PropTypes.shape({
      maxPointsPerRound: PropTypes.number.isRequired,
      roundsInGame: PropTypes.number.isRequired
    }).isRequired,
    timers: PropTypes.shape({
      round: PropTypes.number
    })
  }).isRequired,
  finished: PropTypes.bool.isRequired,
  finishedOn: PropTypes.string.isRequired,
  players: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired
  }).isRequired,
  rounds: PropTypes.arrayOf(
    PropTypes.shape({
      answerIndex: PropTypes.number.isRequired,
      answered: PropTypes.bool.isRequired,
      answeredBy: PropTypes.number.isRequired,
      index: PropTypes.number.isRequired,
      pictures: PropTypes.arrayOf(
        PropTypes.shape({
          picture: PropTypes.string.isRequired,
          selected: PropTypes.bool.isRequired,
          selectedBy: PropTypes.number.isRequired
        })
      ),
      pointsReceived: PropTypes.number.isRequired,
      timeLeft: PropTypes.number.isRequired
    })
  )
};

export default Game;
