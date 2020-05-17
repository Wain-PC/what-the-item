export default class KeyboardController {
  constructor() {
    this.pressListener = () => {};
    this.releaseListener = () => {};

    document.addEventListener("keydown", this.checkPressed.bind(this));
    document.addEventListener("keyup", this.checkReleased.bind(this));
  }

  onPress(listener) {
    this.pressListener = listener;
  }

  onRelease(listener) {
    this.releaseListener = listener;
  }

  checkPressed({ code }) {
    const button = KeyboardController.getButtonMapping(code);
    if (button) {
      this.pressListener({ gamepad: 0, button });
    }
  }

  checkReleased({ code }) {
    const button = KeyboardController.getButtonMapping(code);
    if (button) {
      this.releaseListener({ gamepad: 0, button });
    }
  }

  static getButtonMapping(code) {
    switch (code) {
      case "Enter":
      case "Space": {
        return "ok";
      }
      case "Escape":
      case "Backspace": {
        return "back";
      }
      case "Digit1": {
        return "1";
      }
      case "Digit2": {
        return "2";
      }
      case "Digit3": {
        return "3";
      }
      case "Digit4": {
        return "4";
      }
      default: {
        return null;
      }
    }
  }
}
