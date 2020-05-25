import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Label, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TopPlayers = ({ players, total, loadTopPlayers }) => {
  useEffect(() => {
    loadTopPlayers();
  }, []);

  const tableRows = players.map(({ gameId, name, score }) => {
    return (
      <Table.Row key={gameId}>
        <Table.Cell>{score}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>
          <Link to={`/game/${gameId}`}>
            <Label>{gameId}</Label>
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <>
      <Header as="h1" content="Топ игроков" />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Счёт</Table.HeaderCell>
            <Table.HeaderCell>Имя</Table.HeaderCell>
            <Table.HeaderCell>Игра</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{tableRows}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <strong>Total: {total}</strong>
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
      gameId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  loadTopPlayers: PropTypes.func.isRequired
};

export default TopPlayers;
