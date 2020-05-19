import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { Label, Header, Form } from "semantic-ui-react";

import Config from "../components/config/config";
import Round from "../components/round/round";

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

  const roundsArray = rounds.map(round => (
    <Round round={round} players={players} />
  ));

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
      <Header as="h1" content="Раунды" />
      {roundsArray}
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
      maxPointsPerRound: PropTypes.number,
      roundsInGame: PropTypes.number
    }).isRequired,
    timers: PropTypes.shape({
      round: PropTypes.number
    })
  }).isRequired,
  finished: PropTypes.bool.isRequired,
  startedOn: PropTypes.string.isRequired,
  finishedOn: PropTypes.string,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  rounds: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      image: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        incorrectTitles: PropTypes.arrayOf(PropTypes.string).isRequired
      }).isRequired,
      answerIndex: PropTypes.number.isRequired,
      answered: PropTypes.bool.isRequired,
      started: PropTypes.bool.isRequired,
      finished: PropTypes.bool.isRequired,
      answeredBy: PropTypes.number.isRequired,
      pointsReceived: PropTypes.number,
      timeLeft: PropTypes.number
    })
  ).isRequired,
  getGame: PropTypes.func.isRequired
};

Game.defaultProps = {
  finishedOn: ""
};

export default Game;
