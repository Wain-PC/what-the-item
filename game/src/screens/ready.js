import React from "react";
import PropTypes from "prop-types";

const Ready = props => {
  const {
    players: { list }
  } = props;

  const playersDivs = list.map(({ name, ready, index }) => (
    <div key={index}>
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
