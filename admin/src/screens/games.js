import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Label, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Games = ({ games, total, finished: finishedCount, loadGames }) => {
  useEffect(() => {
    loadGames();
  }, []);

  const tableRows = games.map(({ _id, players, finished }) => {
    return (
      <Table.Row key={_id}>
        <Table.Cell>
          <Link to={`/game/${_id}`}>
            <Label>{_id}</Label>
          </Link>
        </Table.Cell>
        <Table.Cell>{players.length}</Table.Cell>
        <Table.Cell>{finished ? "Закончена" : "Не закончена"}</Table.Cell>
      </Table.Row>
    );
  });

  return (
    <>
      <Header as="h1" content="Последние игры" />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Game Id</Table.HeaderCell>
            <Table.HeaderCell>Players</Table.HeaderCell>
            <Table.HeaderCell>Finished</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{tableRows}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>
              <strong>Total: {total}</strong>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <strong>Finished: {finishedCount}</strong>
            </Table.HeaderCell>
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
