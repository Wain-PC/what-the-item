import {
  START_GAME_ROUND,
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
  selection: []
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

    case SET_SCREEN_TOP:
    case SET_SCREEN_GAME_END: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
