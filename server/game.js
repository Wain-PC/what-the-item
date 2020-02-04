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
    this.actions.setScreenTop();

    // Send updated state after each action.
    this.store.subscribe(() => {
      const state = this.store.getState();
      this.send(state);
    });
  }

  send(object = this.store.getState()) {
    // TODO: redo this shit. Only the safe state should be sent to client.
    const {
      timer: { timer },
      ...rest
    } = object;

    try {
      const objectToSend = {
        timer: { timer },
        ...rest
      };
      const str = JSON.stringify(objectToSend);
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
