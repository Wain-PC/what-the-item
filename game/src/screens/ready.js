import React from "react";
import PropTypes from "prop-types";
import { Box, Heading } from "grommet";

const Ready = props => {
  const {
    players: { list }
  } = props;

  const { length } = list;
  const readyLength = list.filter(({ ready }) => ready).length;

  return (
    <Box fill align="center">
      <Heading level={1}>Готово игроков</Heading>
      <Heading level={1}>
        {readyLength}/{length}
      </Heading>
    </Box>
  );
};

Ready.propTypes = {
  players: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        ready: PropTypes.bool.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Ready;
