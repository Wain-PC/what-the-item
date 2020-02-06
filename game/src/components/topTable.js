import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text
} from "grommet";

const TopTable = props => {
  const { players } = props;

  const tableRows = players.map(
    ({ name, score, currentGame = false }, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={index + name + score}>
          <TableCell>
            <Text>{index + 1}</Text>
          </TableCell>
          <TableCell>
            <Text>{name}</Text>
          </TableCell>
          <TableCell>
            <Text>{score}</Text>
          </TableCell>
        </TableRow>
      );
    }
  );

  return (
    <Table alignSelf="stretch">
      <TableHeader>
        <TableRow>
          <TableCell>
            <Text>#</Text>
          </TableCell>
          <TableCell>
            <Text>Имя</Text>
          </TableCell>
          <TableCell>
            <Text>Счёт</Text>
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>{tableRows}</TableBody>
    </Table>
  );
};

TopTable.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      currentGame: PropTypes.bool
    })
  ).isRequired
};

export default TopTable;
