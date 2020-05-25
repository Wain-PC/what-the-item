import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Label, Header } from "semantic-ui-react";
import Timestamp from "react-timestamp";
import LinkComponent from "../components/link/link";

const Games = ({ games, total, finished: finishedCount, loadGames }) => {
  useEffect(() => {
    loadGames();
  }, []);

  const tableRows = games.map(
    ({ _id, finished, startedOn, finishedOn, player }) => {
      return (
        <Table.Row key={_id}>
          <Table.Cell>
            <LinkComponent id={_id} />
          </Table.Cell>
          <Table.Cell>
            <Label
              color={finished ? "green" : "red"}
              content={finished ? "Закончена" : "Не закончена"}
            />
          </Table.Cell>
          <Table.Cell>
            <Timestamp date={startedOn} />
          </Table.Cell>
          <Table.Cell>
            <Timestamp date={finishedOn} />
          </Table.Cell>
          <Table.Cell>{player && player.score}</Table.Cell>
        </Table.Row>
      );
    }
  );

  return (
    <>
      <Header as="h1" content="Последние игры" />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Статус</Table.HeaderCell>
            <Table.HeaderCell>Время начала</Table.HeaderCell>
            <Table.HeaderCell>Время завершения</Table.HeaderCell>
            <Table.HeaderCell>Очков у победителя</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{tableRows}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              <strong>Всего игр: {total}</strong>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <strong>Завершено: {finishedCount}</strong>
            </Table.HeaderCell>
            <Table.HeaderCell colSpan={3} />
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

Games.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      players: PropTypes.array.isRequired,
      finished: PropTypes.bool.isRequired
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  finished: PropTypes.number.isRequired,
  loadGames: PropTypes.func.isRequired
};

export default Games;
