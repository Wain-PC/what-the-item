import React from "react";
import PropTypes from "prop-types";

const Top = props => {
  const {
    players: { list }
  } = props;
  return (
    <>
      <div>Top Screen</div>
      <div>Players: {list.length}</div>
    </>
  );
};

Top.propTypes = {
  players: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired
};

export default Top;
