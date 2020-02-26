import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Input, Label, Button } from "semantic-ui-react";

const Row = ({ type, id, title, value, onChange }) => {
  return (
    <Table.Row key={type + id}>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>
        <Input
          type="number"
          value={value}
          onChange={({ target: { value: newValue } }) =>
            onChange(type, id, +newValue)
          }
        />
      </Table.Cell>
    </Table.Row>
  );
};

Row.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};

Row.defaultProps = {
  value: "",
  onChange: console.log
};

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
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Поле конфигурации</Table.HeaderCell>
            <Table.HeaderCell>Значение</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>
              <Label>Таймеры</Label>
            </Table.HeaderCell>
          </Table.Row>
          <Row
            type="timers"
            id="controls"
            title="Управление"
            value={timers.controls}
            onChange={changeConfig}
          />
          <Row type="timers" id="round" title="Раунд" value={timers.round} />
          <Row
            type="timers"
            id="roundEnd"
            title="Конец раунда"
            value={timers.roundEnd}
            onChange={changeConfig}
          />

          <Table.Row>
            <Table.HeaderCell colSpan={2}>
              <Label>Геймплей</Label>
            </Table.HeaderCell>
          </Table.Row>
          <Row
            type="gameplay"
            id="defaultPlayers"
            title="Игроков по умолчанию"
            value={gameplay.defaultPlayers}
            onChange={changeConfig}
          />
          <Row
            type="gameplay"
            id="roundsInGame"
            title="Раундов в игре"
            value={gameplay.roundsInGame}
            onChange={changeConfig}
          />
          <Row
            type="gameplay"
            id="maxPointsPerRound"
            title="Множитель очков за раунд"
            value={gameplay.maxPointsPerRound}
            onChange={changeConfig}
          />
          <Row
            type="gameplay"
            id="winnerNickNameMaxLetters"
            title="Макс. букв в никнейме"
            value={gameplay.winnerNickNameMaxLetters}
            onChange={changeConfig}
          />
          <Row
            type="gameplay"
            id="topPlayers"
            title="Топ игроков в таблице"
            value={gameplay.topPlayers}
            onChange={changeConfig}
          />
        </Table.Body>
      </Table>
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
