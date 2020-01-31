import {SET_SCREEN_TOP} from './constants';

const initialState = {
    started: false,
    screen: 'top',
    rounds: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SCREEN_TOP: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
