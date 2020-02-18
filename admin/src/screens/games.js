import React from "react";
import PropTypes from "prop-types";
import { Table, Label } from "semantic-ui-react";
import Paginator from "../components/paginator/paginator";

export default ({
  games: { games, total, page, pages, finished: finishedCount } = {}
}) => {
  const tableRows = games.map(({ _id, players, finished }) => {
    return (
      <Table.Row key={_id}>
        <Table.Cell>
          <Label>{_id}</Label>
        </Table.Cell>
        <Table.Cell>{players.length}</Table.Cell>
        <Table.Cell>{finished ? "Закончена" : "Не закончена"}</Table.Cell>
      </Table.Row>
    );
  });

  return (
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
          <Table.HeaderCell>
            <Paginator total={pages} onChange={console.log} current={page} />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <strong>Total: {total}</strong>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <strong>Finished: {finishedCount}</strong>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};
