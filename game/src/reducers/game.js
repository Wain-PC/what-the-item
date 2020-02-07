import {
  SET_SCREEN_GAME,
  START_GAME_ROUND,
  SET_SCREEN_TOP,
  SET_GAME_MESSAGE
} from "../constants/actions";

import { ROUNDS_IN_GAME } from "../constants/gameplay";

const initialState = {
  id: "",
  round: 0,
  rounds: ROUNDS_IN_GAME,
  finished: false,
  message: "",
  pictures: []
};

export default (state = initialState, action) => {
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
      const { round, rounds } = state;

      // Current round was the last one
      if (round === rounds) {
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
