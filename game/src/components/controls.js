import React from "react";
import PropTypes from "prop-types";
import { Heading } from "grommet";

const Controls = ({ screen }) => {
  let message = [];

  switch (screen) {
    case "top": {
      message = ["A/Enter - Начать игру"];
      break;
    }
    case "ready": {
      message = ["A/Enter - Начать игру", "B/Esc - Вернуться назад"];
      break;
    }
    case "game":
    case "controls": {
      message = [
        "↑/W - Предыдущий вариант",
        "↓/S - Следующий вариант",
        "A/Enter - Подтвердить ответ"
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
