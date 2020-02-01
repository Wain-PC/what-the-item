const controller = ({ actions, message }) => {
  if (message.type === "button") {
    switch (message.button) {
      case "ok": {
        actions.setScreenTop();
        break;
      }
      default: {
        // do nothing
      }
    }
  }
};

module.exports = { controller };
