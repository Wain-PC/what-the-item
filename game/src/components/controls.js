import React from "react";
import PropTypes from "prop-types";
import { Heading } from "grommet";

const Controls = ({ screen }) => {
  let message = [];

  switch (screen) {
    case "top": {
      message = ["X/Enter - Начать игру"];
      break;
    }
    case "ready": {
      message = ["X/Enter - Начать игру", "◯/Esc - Вернуться назад"];
      break;
    }
    case "game": {
      message = [
        "↑/W - Предыдущий вариант",
        "↓/S - Следующий вариант",
        "X/Enter - Подтвердить ответ"
      ];
      break;
    }
    default: {
      return null;
    }
  }

  return message.map(m => (
    <Heading key={m} level={3} margin="small">
      {m}
    </Heading>
  ));
};

Controls.propTypes = {
  screen: PropTypes.string.isRequired
};

export default Controls;
