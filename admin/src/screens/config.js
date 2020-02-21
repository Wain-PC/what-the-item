import React from "react";
import PropTypes from "prop-types";
import { Table, Input, Label } from "semantic-ui-react";

const Row = ({ title, value, onChange }) => {
  return (
    <Table.Row key={title}>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>
        <Input
          value={value}
          onChange={({ value: newValue }) => onChange(title, newValue)}
        />
      </Table.Cell>
    </Table.Row>
  );
};

Row.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};

Row.defaultProps = {
  value: "",
  onChange: console.log
};

const Config = ({ config: { timers, gameplay } = {} }) => {
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
            <Label>Таймеры</Label>
          </Table.HeaderCell>
        </Table.Row>
        <Row title="Управление" value={timers.controls} />
        <Row title="Раунд" value={timers.round} />
        <Row title="Конец раунда" value={timers.roundEnd} />

        <Table.Row>
          <Table.HeaderCell colSpan={2}>
            <Label>Геймплей</Label>
          </Table.HeaderCell>
        </Table.Row>
        <Row title="Игроков по умолчанию" value={gameplay.defaultPlayers} />
        <Row title="Мин. игроков" value={gameplay.minPlayers} />
        <Row title="Макс. игроков" value={gameplay.maxPlayers} />
        <Row title="Раундов в игре" value={gameplay.roundsInGame} />
        <Row title="Ответов в раунде" value={gameplay.answersInRound} />
        <Row
          title="Множитель очков за раунд"
          value={gameplay.maxPointsPerRound}
        />
        <Row
          title="Макс. букв в никнейме"
          value={gameplay.winnerNickNameMaxLetters}
        />
        <Row
          title="Символы никнейма"
          value={gameplay.winnerNickNameLetterTable}
        />
        <Row title="Топ игроков в таблице" value={gameplay.topPlayers} />
      </Table.Body>
    </Table>
  );
};

Config.propTypes = {
  config: PropTypes.shape({
    timers: PropTypes.shape({}).isRequired,
    gameplay: PropTypes.shape({}).isRequired
  }).isRequired
};

export default Config;
