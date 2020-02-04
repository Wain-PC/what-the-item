const { SET_SCREEN_TOP } = require("../constants/actions");

const initialState = {
  players: []
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_TOP: {
      return {
        ...state,
        players: action.payload || initialState.players
      };
    }

    default: {
      return state;
    }
  }
};
