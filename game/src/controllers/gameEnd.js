const controller = ({ actions, message }) => {
  if (message.type === "button") {
    switch (message.button) {
      case "ok": {
        actions.saveName();
        break;
      }
      default: {
        break;
      }
    }
  }
};

export default controller;
