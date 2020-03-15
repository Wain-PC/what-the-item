import React from "react";
import PropTypes from "prop-types";
import { Table, Label } from "semantic-ui-react";
import Paginator from "../components/paginator/paginator";

export default ({ topPlayers: { players, total, page, pages } = {} }) => {
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
          <Table.HeaderCell colSpan="2">
            <Paginator total={pages} onChange={console.log} current={page} />
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="1">
            <strong>Total: {total}</strong>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};