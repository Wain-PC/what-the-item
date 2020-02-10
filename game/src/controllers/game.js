const controller = ({ actions, message }) => {
  const { type, gamepad, button } = message;
  if (type === "button") {
    switch (button) {
      case "triangle":
      case "up": {
        actions.selectAnswer(gamepad, 0);
        break;
      }
      case "right":
      case "back": {
        actions.selectAnswer(gamepad, 1);
        break;
      }
      case "down":
      case "ok": {
        actions.selectAnswer(gamepad, 2);
        break;
      }
      case "left":
      case "square": {
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
