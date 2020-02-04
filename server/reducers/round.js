const {
  START_GAME_ROUND,
  SELECT_ROUND_ANSWER,
  SET_SCREEN_GAME,
  SET_SCREEN_TOP,
  SET_SCREEN_GAME_END
} = require("../constants/actions");

const initialState = {
  pictures: [],
  answerIndex: 0,
  answered: false
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_GAME: {
      return {
        ...initialState
      };
    }
    case START_GAME_ROUND: {
      const { pictures, answerIndex } = action.payload;
      return {
        ...state,
        pictures,
        answerIndex,
        answered: false
      };
    }

    case SELECT_ROUND_ANSWER: {
      const { answerIndex, answered } = state;

      // One cannot select an answer in a finished round
      if (answered) {
        return state;
      }

      return {
        ...state,
        answered: answerIndex === action.payload
      };
    }

    case SET_SCREEN_TOP:
    case SET_SCREEN_GAME_END: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
