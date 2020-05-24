import {
  START_ROUND_START,
  START_ROUND_SUCCESS,
  END_GAME,
  END_ROUND_SUCCESS
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
    case START_ROUND_START: {
      return initialState;
    }
    case START_ROUND_SUCCESS: {
      const { round } = action.payload;
      return {
        ...state,
        ...round
      };
    }
    case END_ROUND_SUCCESS: {
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
