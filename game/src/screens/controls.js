import React from "react";
import PropTypes from "prop-types";

const Controls = props => {
  const {
    timer: {
      timer: { timer }
    }
  } = props;

  return (
    <>
      <div>Controls Screen</div>
      <div>A picture of a controller here</div>
      <div>
        Game starts in:
        <strong>{timer}</strong>
      </div>
    </>
  );
};

Controls.propTypes = {
  timer: PropTypes.shape({
    timer: PropTypes.number.isRequired
  }).isRequired
};

export default Controls;
