import {
  START_GAME_ROUND,
  END_GAME,
  END_GAME_ROUND
} from "../constants/actions";

const initialState = {
  image: {
    image: ""
  },
  index: 0,
  selection: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_GAME_ROUND: {
      const { round } = action.payload;
      return {
        ...state,
        ...round
      };
    }
    case END_GAME_ROUND: {
      const { isCorrectAnswer, answerIndex } = action.payload;
      return {
        ...state,
        selection: state.selection.map((item, index) => {
          if (answerIndex === index) {
            return {
              ...item,
              isCorrectAnswer
            };
          }
          return {
            ...item
          };
        })
      };
    }

    case END_GAME: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
