export default class KeyboardController {
  constructor() {
    this.pressListener = () => {};
    this.releaseListener = () => {};

    document.addEventListener("keydown", this.checkPressed);
    document.addEventListener("keyup", this.checkReleased);
  }

  onPress(listener) {
    this.pressListener = listener;
  }

  onRelease(listener) {
    this.releaseListener = listener;
  }

  checkPressed = ({ code }) => {
    const button = KeyboardController.getButtonMapping(code);
    if (button) {
      this.pressListener({ gamepad: 0, button });
    }
  };

  checkReleased = ({ code }) => {
    const button = KeyboardController.getButtonMapping(code);
    if (button) {
      this.releaseListener({ gamepad: 0, button });
    }
  };

  static getButtonMapping(code) {
    switch (code) {
      case "Enter":
      case "Space": {
        return "ok";
      }
      case "Escape": {
        return "back";
      }
      case "ArrowUp":
      case "KeyW": {
        return "up";
      }
      case "ArrowDown":
      case "KeyS": {
        return "down";
      }
      case "ArrowLeft":
      case "KeyA": {
        return "left";
      }
      case "ArrowRight":
      case "KeyD": {
        return "right";
      }
      default: {
        return null;
      }
    }
  }
}
