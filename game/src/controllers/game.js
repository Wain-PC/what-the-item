const controller = ({ actions, message }) => {
  const { type, button } = message;
  if (type === "button") {
    switch (button) {
      case "1": {
        actions.selectAnswer(0);
        break;
      }
      case "2": {
        actions.selectAnswer(1);
        break;
      }
      case "3": {
        actions.selectAnswer(2);
        break;
      }
      case "4": {
        actions.selectAnswer(3);
        break;
      }
      default: {
        // do nothing
      }
    }
  }
};

export default controller;
