const controller = ({ state, actions, message }) => {
  // Switch to 'ready' screen 'ok' button is pressed
  if (message.type === "button") {
    switch (message.button) {
      case "ok": {
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
