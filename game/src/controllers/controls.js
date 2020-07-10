const controller = ({ actions, message }) => {
  if (message.type === "button") {
    switch (message.button) {
      // Toggle player readiness
      case "ok": {
        actions.setScreenGame();
        break;
      }
      default: {
        // do nothing
      }
    }
  }
};

export default controller;
