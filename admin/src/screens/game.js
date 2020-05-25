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
  player,
  finished,
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

  const playerName = finished && (
    <Form.Input label="Имя игрока" value={player.name} />
  );

  const playerContact = finished && (
    <Form.Input label="Контакт игрока" value={player.contact} />
  );

  const playerScore = finished && (
    <Form.Input label="Счёт" value={player.score} />
  );

  const roundsArray = rounds.map(round => <Round round={round} />);

  return (
    <>
      <Header as="h1" content={`Игра ${id}`} />
      {finishedLabel}
      <Form>
        {playerName}
        {playerContact}
        {playerScore}
      </Form>
      <Header as="h1" content="Раунды" />
      {roundsArray}
      <Header as="h1" content="Конфигурация этой игры" />
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
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
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

export default Game;
