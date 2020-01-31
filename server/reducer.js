const {SET_SCREEN_TOP} = require('./constants');

const initialState = {
    started: false,
    screen: 'top',
    rounds: []
};

module.exports = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCREEN_TOP: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
