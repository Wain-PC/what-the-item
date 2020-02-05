import React from "react";
import PropTypes from "prop-types";

const PLAYERS_COLORS = ["aquamarine", "coral", "brown", "teal"];

const Ready = props => {
  const {
    players: { list }
  } = props;

  const playersDivs = list.map(({ name, ready, index }) => (
    <div key={index} style={{ color: PLAYERS_COLORS[index] }}>
      {name}: <strong>{ready ? "Готов" : "Не готов"}</strong>
    </div>
  ));
  return (
    <>
      <div>Готовность пользователей</div>
      <div>
        <div>{playersDivs}</div>
      </div>
    </>
  );
};

Ready.propTypes = {
  players: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        ready: PropTypes.bool.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Ready;
