import React from "react";
import PropTypes from "prop-types";

const Top = props => {
  const {
    players: { list }
  } = props;
  return (
    <>
      <div>Таблица с топ-5 игроков здесь</div>
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
  }).isRequired
};

export default Top;
