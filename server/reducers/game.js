const {
  SET_SCREEN_GAME,
  START_GAME_ROUND,
  SET_SCREEN_TOP,
  SET_GAME_MESSAGE
} = require("../constants/actions");

const { ROUNDS_IN_GAME } = require("../constants/gameplay");

const initialState = {
  id: "",
  round: 0,
  finished: false,
  message: "",
  pictures: []
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_GAME: {
      const { id, pictures } = action.payload;
      return {
        ...initialState,
        id,
        pictures
      };
    }

    case START_GAME_ROUND: {
      const { round } = state;

      // Current round was the last one
      if (round === ROUNDS_IN_GAME) {
        return {
          ...state,
          finished: true
        };
      }

      return {
        ...state,
        round: round + 1
      };
    }

    case SET_SCREEN_TOP: {
      return initialState;
    }

    case SET_GAME_MESSAGE: {
      return {
        ...state,
        message: action.payload || initialState.message
      };
    }
    default: {
      return state;
    }
  }
};
