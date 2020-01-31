const { createStore, applyMiddleware, bindActionCreators } = require("redux");
const thunk = require("redux-thunk").default;
const reducer = require("./reducer");
const actions = require("./actions");
const { SCREEN_TOP, SCREEN_READY } = require("./constants/screens.js");

class Game {
  constructor(send) {
    this.store = createStore(reducer, applyMiddleware(thunk));
    this._send = send;
    this.actions = bindActionCreators(
      actions,
      this.store.dispatch.bind(this.store)
    );

    // Send default state upon connection
    this.send();

    // Send updated state after each action.
    this.store.subscribe(() => {
      console.log("Store has changed");
      console.log(this.store.getState());
      this.send(this.store.getState());
    });
  }

  send(object = this.store.getState()) {
    try {
      const str = JSON.stringify(object);
      this._send(str);
    } catch (err) {
      console.error("Unable to send:", err);
    }
  }

  onMessage(message) {
    const state = this.store.getState();

    switch (state.screen) {
      case SCREEN_TOP: {
        // Switch to 'ready' screen 'ok' button is pressed
        if (message.type === "button" && message.button === "ok") {
          this.actions.setScreenReady();
        }
        break;
      }
      case SCREEN_READY: {
        // Switch back to 'top' screen when 'back' button is pressed
        if (message.type === "button") {
          if (message.button === "back") {
            this.actions.setScreenTop();
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }
}

module.exports = Game;
