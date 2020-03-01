import {
  START_GAME_ROUND,
  SELECT_ROUND_ANSWER,
  SET_SCREEN_TOP,
  SET_SCREEN_GAME_END,
  END_GAME_ROUND
} from "../constants/actions";

const initialState = {
  answerIndex: 0,
  answered: false,
  answeredBy: -1,
  finished: false,
  image: {
    image: ""
  },
  index: 0,
  selection: [],
  started: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case END_GAME_ROUND: {
      return {
        ...initialState
      };
    }
    case START_GAME_ROUND: {
      const { round } = action.payload;
      return {
        ...state,
        ...round
      };
    }

    case SELECT_ROUND_ANSWER: {
      const { answerIndex, answered, selection } = state;
      const { playerIndex, selectedAnswer } = action.payload;
      const isCorrectAnswer = answerIndex === selectedAnswer;

      // One cannot select an answer in a finished round or if this answer has been previously selected by someone else.
      if (answered || selection[selectedAnswer].selected) {
        return state;
      }

      const newSelection = JSON.parse(JSON.stringify(selection));
      newSelection[selectedAnswer].selected = true;
      newSelection[selectedAnswer].selectedBy = playerIndex;

      return {
        ...state,
        answered: isCorrectAnswer,
        selection: newSelection
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
