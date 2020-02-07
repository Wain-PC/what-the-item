const controller = ({ actions, message }) => {
  if (message.type === "button") {
    switch (message.button) {
      case "ok": {
        actions.setScreenGameEnd();
        break;
      }
      default: {
        // do nothing
      }
    }
  }
};

export default controller;
