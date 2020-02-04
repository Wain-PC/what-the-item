import React from "react";
import PropTypes from "prop-types";
import TopTable from "../components/topTable";

const Top = props => {
  const {
    players: { list },
    top: { players }
  } = props;

  return (
    <>
      <TopTable players={players} />
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
