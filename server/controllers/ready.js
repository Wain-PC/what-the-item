module.exports = ({ actions, message }) => {
  if (message.type === "button") {
    switch (message.button) {
      // Toggle player readiness
      case "ok": {
        actions.setPlayerReady(message.gamepad);
        break;
      }
      // Switch back to 'top' screen when 'back' button is pressed
      case "back": {
        actions.setScreenTop();
        break;
      }
      default: {
        // do nothing
      }
    }
  }
};
