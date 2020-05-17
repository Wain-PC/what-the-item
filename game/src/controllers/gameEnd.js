const controller = ({ actions, message }) => {
  if (message.type === "button") {
    switch (message.button) {
      case "ok": {
        actions.enterPress();
        break;
      }
      case "back": {
        actions.removeLetter();
        break;
      }
      default: {
        actions.enterLetter(message.button);
      }
    }
  }
};

export default controller;
