import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Header } from "semantic-ui-react";

import ConfigTable from "../components/config/config";

const Config = ({
  timers,
  gameplay,
  dirty,
  loadConfig,
  saveConfig,
  changeConfig
}) => {
  useEffect(() => {
    loadConfig();
  }, []);

  return (
    <>
      <Header as="h1" content="Конфигурация игры" />
      <ConfigTable config={{ timers, gameplay }} onChange={changeConfig} />
      <Button
        positive
        disabled={!dirty}
        content="Сохранить"
        onClick={saveConfig}
      />
    </>
  );
};

Config.propTypes = {
  timers: PropTypes.shape({
    controls: PropTypes.number,
    round: PropTypes.number,
    roundEnd: PropTypes.number
  }).isRequired,
  gameplay: PropTypes.shape({
    defaultPlayers: PropTypes.number,
    minPlayers: PropTypes.number,
    maxPlayers: PropTypes.number,
    roundsInGame: PropTypes.number,
    maxPointsPerRound: PropTypes.number,
    winnerNickNameMaxLetters: PropTypes.number,
    winnerNickNameLetterTable: PropTypes.string,
    topPlayers: PropTypes.number
  }).isRequired,
  dirty: PropTypes.bool.isRequired,
  loadConfig: PropTypes.func.isRequired,
  saveConfig: PropTypes.func.isRequired,
  changeConfig: PropTypes.func.isRequired
};

export default Config;
