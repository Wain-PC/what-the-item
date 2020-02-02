const controller = ({ actions, message, state }) => {
  const { index } = state.winner;

  // Only the winner can have controls on this screen
  if (message.type === "button" && message.gamepad === index) {
    switch (message.button) {
      case "ok": {
        actions.setScreenTop();
        break;
      }
      case "left": {
        actions.setNickNameLetterIndexDecrease();
        break;
      }
      case "right": {
        actions.setNickNameLetterIndexIncrease();
        break;
      }
      case "up": {
        actions.setNickNameLetterIncrease();
        break;
      }
      case "down": {
        actions.setNickNameLetterDecrease();
        break;
      }
      default: {
        // do nothing
      }
    }
  }
};

module.exports = { controller };
