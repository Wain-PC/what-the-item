import React from "react";
import PropTypes from "prop-types";
import { Heading } from "grommet";

const Timer = ({ timer }) => {
  if (timer <= 0) {
    return null;
  }

  return (
    <Heading level={3} margin="xxsmall">
      {timer}
    </Heading>
  );
};

Timer.propTypes = {
  timer: PropTypes.number
};

Timer.defaultProps = {
  timer: -1
};

export default Timer;
