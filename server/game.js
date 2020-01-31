const {createStore, applyMiddleware} = require('redux');
const thunk = require('redux-thunk');
const reducer = require('./reducer');


class Game {
    constructor() {
        this.store = createStore(reducer, applyMiddleware(thunk));
    }
}
