import React from "react";
import PropTypes from "prop-types";
import { Box, Heading } from "grommet";
import TopTable from "../components/topTable";

const Top = props => {
  const {
    top: { players }
  } = props;

  return (
    <Box fill align="center">
      <Heading level={1}>Топ игроков</Heading>
      <TopTable players={players} />
    </Box>
  );
};

Top.propTypes = {
  top: PropTypes.shape({
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Top;
