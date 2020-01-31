import React from "react";
import PropTypes from "prop-types";

const Top = props => {
  const { players } = props;
  return (
    <>
      <div>Top Screen</div>
      <div>{JSON.stringify(props)}</div>
      <div>Players: {players}</div>
    </>
  );
};

Top.propTypes = {
  players: PropTypes.number
};

Top.defaultProps = {
  players: 0
};

export default Top;
