const {
  START_GAME_ROUND,
  SELECT_ROUND_ANSWER,
  SET_SCREEN_GAME
} = require("../constants/actions");

const initialState = {
  pictures: [],
  answer: "",
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
      const { pictures, answer } = action.payload;
      return {
        ...state,
        pictures,
        answer,
        answered: false
      };
    }

    case SELECT_ROUND_ANSWER: {
      const answerIndex = action.payload;
      const { pictures, answer, answered } = state;

      // One cannot select an answer in a finished round
      if (answered) {
        return state;
      }

      return {
        ...state,
        answered: pictures[answerIndex] === answer
      };
    }

    default: {
      return state;
    }
  }
};
