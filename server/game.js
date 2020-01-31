const { createStore, applyMiddleware, bindActionCreators } = require("redux");
const thunk = require("redux-thunk").default;
const reducer = require("./reducer");
const actions = require("./actions");
const controllers = require("./controllers");

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
    const { screen } = state;

    if (controllers[screen]) {
      controllers[screen]({ state, actions: this.actions, message });
    } else {
      console.error("Controller not found for screen ", screen);
    }
  }
}

module.exports = Game;
