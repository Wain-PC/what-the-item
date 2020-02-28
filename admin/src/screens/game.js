import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { Card, List, Label, Button, Header, Form } from "semantic-ui-react";

import Image from "../components/image/image";
import Config from "../components/config/config";

const Game = ({
  match: {
    params: { id }
  },
  config,
  finished,
  startedOn,
  finishedOn,
  players,
  rounds,
  getGame
}) => {
  useEffect(() => {
    getGame(id);
  }, []);

  const finishedLabel = (
    <Label
      color={finished ? "green" : "red"}
      content={finished ? "Завершена" : "Не завершена"}
    />
  );

  const startedOnComponent = startedOn && (
    <Form.Input label="Время начала" value={startedOn} />
  );
  const finishedOnComponent = finishedOn && (
    <Form.Input label="Время завершения" value={finishedOn} />
  );

  return (
    <>
      <Header as="h1" content={`Игра ${id}`} />
      {finishedLabel}
      <Form>
        {startedOnComponent}
        {finishedOnComponent}
      </Form>
      <Header as="h1" content="Конфигурация игры" />
      {config && <Config config={config} />}
    </>
  );
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
  startedOn: PropTypes.string.isRequired,
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
  ).isRequired
};

export default Game;
