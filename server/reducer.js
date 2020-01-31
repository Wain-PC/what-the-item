const {SET_SCREEN_TOP, SET_SCREEN_READY} = require('./constants/actions');

const initialState = {
    started: false,
    screen: 'top'
};

module.exports = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCREEN_TOP: {
            return initialState;
        }
        case SET_SCREEN_READY: {
            return {
                ...initialState,
                screen: 'ready',
                playerReadiness: [false, false]
            };
        }
        default: {
            return state;
        }
    }
};
