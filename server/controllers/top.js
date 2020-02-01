const controller = ({ state, actions, message }) => {
  // Switch to 'ready' screen 'ok' button is pressed
  if (message.type === "button") {
    switch (message.button) {
      case "ok": {
        actions.setScreenReady();
        break;
      }
      case "up":
      case "right": {
        actions.setPlayersNumber(state.players.list.length + 1);
        break;
      }
      case "down":
      case "left": {
        actions.setPlayersNumber(state.players.list.length - 1);
        break;
      }
      default: {
        // do nothing
      }
    }
  }
};

module.exports = { controller };
