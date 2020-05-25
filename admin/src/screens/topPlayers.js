import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Header } from "semantic-ui-react";
import LinkComponent from "../components/link/link";

const TopPlayers = ({ players, total, loadTopPlayers }) => {
  useEffect(() => {
    loadTopPlayers();
  }, []);

  const tableRows = players.map(({ gameIds, name, score, contact }) => {
    const games = gameIds.map(gameId => <LinkComponent id={gameId} />);

    return (
      <Table.Row key={name + score}>
        <Table.Cell>{score}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{contact}</Table.Cell>
        <Table.Cell>{games}</Table.Cell>
      </Table.Row>
    );
  });

  return (
    <>
      <Header as="h1" content="Топ игроков" />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Лучший счёт</Table.HeaderCell>
            <Table.HeaderCell>Имя</Table.HeaderCell>
            <Table.HeaderCell>Контакт</Table.HeaderCell>
            <Table.HeaderCell>Игры</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{tableRows}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <strong>
                Всего уникальных игроков (среди завершённых игр): {total}
              </strong>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

TopPlayers.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      gameIds: PropTypes.arrayOf(PropTypes.string).isRequired,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      contact: PropTypes.number.isRequired
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  loadTopPlayers: PropTypes.func.isRequired
};

export default TopPlayers;
