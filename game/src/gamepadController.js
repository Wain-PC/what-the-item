export default class GamepadController {
    constructor() {
        this.pressListener = () => {};
        this.releaseListener = () => {};
        this.prevState = this.getActiveGamepads();

        this._run();
    }

    onPress(listener) {
        this.pressListener = listener;
    }

    onRelease(listener) {
        this.releaseListener = listener;
    }

    _run = () => {
        const gamepads = this.getActiveGamepads();

        this.checkPressed(gamepads);
        this.checkReleased(gamepads);

        this.prevState = gamepads;

        requestAnimationFrame(this._run);
    };

    checkPressed(gamepads) {
        gamepads.forEach(({index, buttons}, gamepadIndex) => {
            buttons.forEach((button, buttonIndex) => {
                if(button.pressed === true) {
                    if(
                        this.prevState[gamepadIndex] &&
                        this.prevState[gamepadIndex].buttons[buttonIndex] &&
                        this.prevState[gamepadIndex].buttons[buttonIndex].pressed === false
                    ) {
                        const buttonName = this.getButtonMapping(buttonIndex);
                        if(buttonName) {
                            this.pressListener({gamepad: index, button: buttonName});
                        }

                    }
                }
            });
        });
    }

    checkReleased(gamepads) {
        gamepads.forEach(({index, buttons}, gamepadIndex) => {
            buttons.forEach(({pressed}, buttonIndex) => {
                if(pressed === false) {
                    if(
                        this.prevState[gamepadIndex] &&
                        this.prevState[gamepadIndex].buttons[buttonIndex] &&
                        this.prevState[gamepadIndex].buttons[buttonIndex].pressed === true
                    ) {
                        const buttonName = this.getButtonMapping(buttonIndex);
                        this.releaseListener({gamepad: index, button: buttonName});
                    }
                }
            });
        });
    }

    getButtonMapping(buttonIndex) {
        switch(buttonIndex) {
            case 0: {
               return 'ok';
            }
            case 1: {
                return 'back';
            }
            case 2: {
                return 'triangle';
            }
            case 3: {
                return 'square';
            }
            case 12: {
                return 'up';
            }
            case 13: {
                return 'down';
            }
            case 14: {
                return 'left';
            }
            case 15: {
                return 'right';
            }
            default: {
                return null;
            }
        }
    }

    getActiveGamepads() {
        return Array.from(navigator.getGamepads()).filter(gamepad => gamepad !== null);
    }
}
