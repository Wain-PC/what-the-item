const controller = ({ actions, message }) => {
  const { type, gamepad, button } = message;
  if (type === "button") {
    switch (button) {
      case "1": {
        actions.selectAnswer(gamepad, 0);
        break;
      }
      case "2": {
        actions.selectAnswer(gamepad, 1);
        break;
      }
      case "3": {
        actions.selectAnswer(gamepad, 2);
        break;
      }
      case "4": {
        actions.selectAnswer(gamepad, 3);
        break;
      }
      default: {
        // do nothing
      }
    }
  }
};

export default controller;
