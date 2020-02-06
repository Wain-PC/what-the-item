import React from "react";
import PropTypes from "prop-types";
import { Box, Heading } from "grommet";

const Winner = props => {
  const {
    winner: { name, score }
  } = props;

  return (
    <Box fill align="center">
      <Heading level={1}>Победитель</Heading>
      <Heading level={2} color="status-ok">
        {name}
      </Heading>
      <Heading level={1}>Набрано очков</Heading>
      <Heading level={2} color="status-ok">
        {score}
      </Heading>
    </Box>
  );
};

Winner.propTypes = {
  winner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nickName: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
  }).isRequired
};

export default Winner;
