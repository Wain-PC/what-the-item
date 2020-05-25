import React from "react";
import PropTypes from "prop-types";
import { Table, Input, Label } from "semantic-ui-react";

const Row = ({ type, id, title, value, onChange }) => {
  if (value === undefined) {
    return null;
  }

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
  value: undefined,
  onChange: Function.prototype
};

const Config = ({ config: { timers, gameplay }, onChange }) => {
  return (
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
            <Label ribbon color="teal">
              Таймеры
            </Label>
          </Table.HeaderCell>
        </Table.Row>
        <Row
          type="timers"
          id="controls"
          title="Управление"
          value={timers.controls}
          onChange={onChange}
        />
        <Row
          type="timers"
          id="round"
          title="Раунд"
          value={timers.round}
          onChange={onChange}
        />
        <Row
          type="timers"
          id="roundEnd"
          title="Конец раунда"
          value={timers.roundEnd}
          onChange={onChange}
        />

        <Table.Row>
          <Table.HeaderCell colSpan={2}>
            <Label color="orange" ribbon>
              Геймплей
            </Label>
          </Table.HeaderCell>
        </Table.Row>
        <Row
          type="gameplay"
          id="defaultPlayers"
          title="Игроков по умолчанию"
          value={gameplay.defaultPlayers}
          onChange={onChange}
        />
        <Row
          type="gameplay"
          id="roundsInGame"
          title="Раундов в игре"
          value={gameplay.roundsInGame}
          onChange={onChange}
        />
        <Row
          type="gameplay"
          id="maxPointsPerRound"
          title="Множитель очков за раунд"
          value={gameplay.maxPointsPerRound}
          onChange={onChange}
        />
        <Row
          type="gameplay"
          id="winnerNickNameMaxLetters"
          title="Макс. символов в никнейме"
          value={gameplay.winnerNickNameMaxLetters}
          onChange={onChange}
        />
        <Row
          type="gameplay"
          id="winnerNickNameMaxLetters"
          title="Макс. символов в почте/контакте"
          value={gameplay.contactMaxLetters}
          onChange={onChange}
        />
        <Row
          type="gameplay"
          id="topPlayers"
          title="Топ игроков в таблице"
          value={gameplay.topPlayers}
          onChange={onChange}
        />
      </Table.Body>
    </Table>
  );
};

Config.propTypes = {
  config: PropTypes.shape({
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
      contactMaxLetters: PropTypes.number,
      topPlayers: PropTypes.number
    }).isRequired
  }).isRequired,
  onChange: PropTypes.func
};

Config.defaultProps = {
  onChange: Function.prototype
};

export default Config;
