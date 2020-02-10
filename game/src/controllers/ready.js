const controller = ({ actions, message, state }) => {
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

export default controller;
