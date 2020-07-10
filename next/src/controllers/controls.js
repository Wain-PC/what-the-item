const controller = ({ actions, message }) => {
  if (message.type === "button") {
    switch (message.button) {
      // Toggle player readiness
      case "ok": {
        actions.setScreenGame();
        break;
      }
      // Switch back to 'top' screen when 'back' button is pressed
      case "back": {
        actions.setScreenReady();
        break;
      }
      default: {
        // do nothing
      }
    }
  }
};

export default controller;
