const {createStore, applyMiddleware, bindActionCreators} = require('redux');
const thunk = require('redux-thunk').default;
const reducer = require('./reducer');
const actions = require('./actions');


class Game {
    constructor(send) {
        this.store = createStore(reducer, applyMiddleware(thunk));
        this._send = send;
        this.actions = bindActionCreators(actions, this.store.dispatch.bind(this.store));

        // Send default state
        this.send();

        this.store.subscribe(() => {
            console.log('Store has changed!');
            console.log(this.store.getState());
        });


    }

    send(object = this.store.getState()) {
        try {
            const str = JSON.stringify(object);
            return this._send(str);
        } catch (err) {
            console.error('Unable to send:', err);
        }
    }

    onMessage(message) {
        //
    }
}

module.exports = Game;
