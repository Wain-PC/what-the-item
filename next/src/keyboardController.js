export default class KeyboardController {
  constructor() {
    this.pressListener = () => {};
    this.releaseListener = () => {};

    // Don't set any listeners in SSR mode
    if (!process.client) {
      return;
    }

    document.addEventListener("keydown", this.checkPressed.bind(this));
    document.addEventListener("keyup", this.checkReleased.bind(this));
  }

  onPress(listener) {
    this.pressListener = listener;
  }

  onRelease(listener) {
    this.releaseListener = listener;
  }

  checkPressed({ code, key }) {
    const button = KeyboardController.getButtonMapping(code, key);
    if (button) {
      this.pressListener({ gamepad: 0, button });
    }
  }

  checkReleased({ code, key }) {
    const button = KeyboardController.getButtonMapping(code, key);
    if (button) {
      this.releaseListener({ gamepad: 0, button });
    }
  }

  static getButtonMapping(code, key) {
    switch (code) {
      case "Enter": {
        return "ok";
      }
      case "Escape": {
        return "back";
      }
      default: {
        return key;
      }
    }
  }
}
