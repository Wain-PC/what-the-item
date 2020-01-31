import React from "react";
import PropTypes from "prop-types";

const Ready = props => {
  const { players, playerReadiness } = props;

  const playersDivs = playerReadiness.map((status, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index}>
      Player {index + 1}: <strong>{status ? "Ready" : "Not ready"}</strong>
    </div>
  ));
  return (
    <>
      <div>Ready Screen</div>
      <div>
        Players in the game:
        <strong>{players}</strong>
        <div>{playersDivs}</div>
      </div>
    </>
  );
};

Ready.propTypes = {
  players: PropTypes.number.isRequired,
  playerReadiness: PropTypes.arrayOf(PropTypes.bool).isRequired
};

export default Ready;
