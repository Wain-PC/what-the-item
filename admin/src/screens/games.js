import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Header } from "semantic-ui-react";
import Timestamp from "react-timestamp";
import LinkComponent from "../components/link/link";

const Games = ({ games, total, finished: finishedCount, loadGames }) => {
  useEffect(() => {
    loadGames();
  }, []);

  const tableRows = games.map(({ _id, startedOn, player }) => {
    return (
      <Table.Row key={_id}>
        <Table.Cell>
          <LinkComponent id={_id} />
        </Table.Cell>
        <Table.Cell>
          <Timestamp date={startedOn} />
        </Table.Cell>
        <Table.Cell>{player.name === "Player" ? "" : player.name}</Table.Cell>
        <Table.Cell>{player.contact}</Table.Cell>
        <Table.Cell>{player && player.score}</Table.Cell>
      </Table.Row>
    );
  });

  return (
    <>
      <Header as="h1" content="Последние игры" />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Время</Table.HeaderCell>
            <Table.HeaderCell>Имя</Table.HeaderCell>
            <Table.HeaderCell>Контакт</Table.HeaderCell>
            <Table.HeaderCell>Очки</Table.HeaderCell>
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
