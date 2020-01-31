import React from "react";
import PropTypes from "prop-types";

const Top = props => {
  const { players } = props;
  return (
    <>
      <div>Top Screen</div>
      <div>Players: {players}</div>
    </>
  );
};

Top.propTypes = {
  players: PropTypes.number.isRequired
};

export default Top;
