const controller = ({ actions, message }) => {
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

const onStateChange = ({ state, actions }) => {
  if (state.players.list.every(({ ready }) => ready === true)) {
    console.log("Every player is ready, start the game!");
    actions.setScreenControls();
  }
};

module.exports = { controller, onStateChange };
