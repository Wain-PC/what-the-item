import {
  END_GAME_ROUND,
  SET_GAME_MESSAGE,
  LOAD_GAME_SUCCESS,
  END_GAME
} from "../constants/actions";

const initialState = {
  id: "",
  config: {
    gameplay: {},
    timers: {}
  },
  rounds: [],
  currentRound: 0,
  finished: false,
  startedOn: undefined,
  finishedOn: undefined,
  players: [],
  message: {} // internal-only field
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME_SUCCESS: {
      const { _id: id, ...game } = action.payload;
      return {
        ...state,
        id,
        ...game
      };
    }
    case END_GAME_ROUND: {
      const { currentRound, rounds } = state;

      // Current round was the last one
      if (currentRound === rounds.length - 1) {
        return {
          ...state,
          finished: true
        };
      }

      return {
        ...state,
        currentRound: currentRound + 1
      };
    }

    case END_GAME: {
      return initialState;
    }

    case SET_GAME_MESSAGE: {
      const message = action.payload;
      return {
        ...state,
        message: message
          ? {
              ...state.message,
              ...message
            }
          : initialState.message
      };
    }
    default: {
      return state;
    }
  }
};
