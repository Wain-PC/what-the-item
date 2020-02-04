import React from "react";
import PropTypes from "prop-types";

const Top = props => {
  const {
    players: { list },
    top: { players }
  } = props;

  const topTableRows = players.map(({ name, score }) => {
    return (
      <tr key={name + score}>
        <td>{name}</td>
        <td>{score}</td>
      </tr>
    );
  });

  return (
    <>
      <h3>Текущий ТОП</h3>
      <div>
        <table border={2}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Счёт</th>
            </tr>
          </thead>
          <tbody>{topTableRows}</tbody>
        </table>
      </div>
      <br />
      <div>Количество игроков: {list.length}</div>
      <br />
      <br />
      <div>
        <strong>Нажмите X, чтобы начать игру</strong>
      </div>
    </>
  );
};

Top.propTypes = {
  players: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired,
  top: PropTypes.shape({
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Top;
