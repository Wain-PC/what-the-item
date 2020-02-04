import React from "react";
import PropTypes from "prop-types";

const TopTable = props => {
  const { players } = props;

  const tableRows = players.map(({ name, score, currentGame }, index) => {
    const nameStr = currentGame ? (
      <td>
        <strong>{name}</strong>
      </td>
    ) : (
      <td>{name}</td>
    );
    const scoreStr = currentGame ? (
      <td>
        <strong>{score}</strong>
      </td>
    ) : (
      <td>{score}</td>
    );
    return (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={index + name + score}>
        {nameStr}
        {scoreStr}
      </tr>
    );
  });

  return (
    <div>
      <h3>Текущий ТОП</h3>
      <table border={2}>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Счёт</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

TopTable.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      currentGame: PropTypes.bool.isRequired
    })
  ).isRequired
};

export default TopTable;
