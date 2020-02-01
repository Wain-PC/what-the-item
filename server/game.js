const {
  createStore,
  applyMiddleware,
  bindActionCreators,
  combineReducers
} = require("redux");
const thunk = require("redux-thunk").default;
const reducers = require("./reducers");
const actions = require("./actions");
const controllers = require("./controllers");

class Game {
  constructor(send) {
    this.store = createStore(combineReducers(reducers), applyMiddleware(thunk));
    this._send = send;
    this.actions = bindActionCreators(
      actions,
      this.store.dispatch.bind(this.store)
    );

    // Send default state upon connection
    this.send();

    // Send updated state after each action.
    this.store.subscribe(() => {
      const state = this.store.getState();
      const {
        screen: { id }
      } = state;
      this.send(state);
      if (controllers[id] && controllers[id].onStateChange) {
        controllers[id].onStateChange({ state, actions: this.actions });
      }
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
    const {
      screen: { id }
    } = state;

    if (controllers[id] && controllers[id].controller) {
      controllers[id].controller({ state, actions: this.actions, message });
    }
  }
}

module.exports = Game;
