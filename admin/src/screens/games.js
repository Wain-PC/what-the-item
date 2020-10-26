import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table, Header, Button, Confirm } from "semantic-ui-react";
import Timestamp from "react-timestamp";
import LinkComponent from "../components/link/link";

const Games = ({
  games,
  total,
  finished: finishedCount,
  loadGames,
  removeGame,
  removeGames
}) => {
  useEffect(() => {
    loadGames();
  }, []);

  const [open, setOpen] = useState(false);
  const [openSingle, setOpenSingle] = useState(false);

  const tableRows = games.map(({ _id, startedOn, player }) => {
    return (
      <Table.Row key={_id}>
        <Table.Cell>
          <LinkComponent id={_id} />
        </Table.Cell>
        <Table.Cell>
          <Timestamp date={startedOn} options={{ twentyFourHour: true }} />
        </Table.Cell>
        <Table.Cell>{player.name === "Player" ? "" : player.name}</Table.Cell>
        <Table.Cell>{player.contact}</Table.Cell>
        <Table.Cell>{player && player.score}</Table.Cell>
        <Table.Cell>
          <Button
            color="red"
            onClick={() => setOpenSingle(_id)}
            content="Удалить"
            size="small"
          />
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <>
      <Header as="h1" content="Последние 100 игр" />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Время</Table.HeaderCell>
            <Table.HeaderCell>Имя</Table.HeaderCell>
            <Table.HeaderCell>Контакт</Table.HeaderCell>
            <Table.HeaderCell>Очки</Table.HeaderCell>
            <Table.HeaderCell>Действия</Table.HeaderCell>
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
            <Table.HeaderCell colSpan={2} />
            <Table.HeaderCell>
              <Button
                color="red"
                onClick={() => setOpen(true)}
                content="Удалить все игры"
                size="medium"
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <Confirm
        header="Удаление ВСЕХ игр"
        content="Действительно удалить все игры? Эта операция необратима."
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          removeGames();
        }}
      />
      <Confirm
        header="Удаление игры"
        content="Действительно удалить эту игру? Эта операция необратима."
        open={!!openSingle}
        onCancel={() => setOpenSingle(false)}
        onConfirm={() => {
          setOpenSingle(false);
          removeGame(openSingle);
        }}
      />
    </>
  );
};

Games.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  finished: PropTypes.number.isRequired,
  loadGames: PropTypes.func.isRequired,
  removeGame: PropTypes.func.isRequired,
  removeGames: PropTypes.func.isRequired
};

export default Games;
