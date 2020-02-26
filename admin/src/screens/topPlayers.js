import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Label } from "semantic-ui-react";

const TopPlayers = ({ players, total, loadTopPlayers }) => {
  useEffect(() => {
    loadTopPlayers();
  }, []);

  const tableRows = players.map(({ gameId, name, score }) => {
    return (
      <Table.Row key={gameId}>
        <Table.Cell>
          <Label>{gameId}</Label>
        </Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{score}</Table.Cell>
      </Table.Row>
    );
  });

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Game Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Score</Table.HeaderCell>
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
