import React from "react";
import { Box, Image, Heading } from "grommet";
import gamepad from "./gamepad.jpg";

const Controls = () => {
  return (
    <Box fill align="center">
      <Heading level={1}>Управление</Heading>
      <Image src={gamepad} fill fit="contain" />
    </Box>
  );
};

export default Controls;
