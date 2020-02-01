const controller = ({ actions, message }) => {
  const { type, gamepad, button } = message;
  if (type === "button") {
    switch (button) {
      // Select answer above
      case "up": {
        actions.moveAnswerUp(gamepad);
        break;
      }
      // Select answer below
      case "down": {
        actions.moveAnswerDown(gamepad);
        break;
      }
      // Confirm answer selection
      case "ok": {
        actions.selectAnswer(gamepad);
        break;
      }
      default: {
        // do nothing
      }
    }
  }
};

const onStateChange = ({ state, actions }) => {
  if (state.round.answered === true) {
    actions.startRound();
  }
};

module.exports = { controller, onStateChange };
