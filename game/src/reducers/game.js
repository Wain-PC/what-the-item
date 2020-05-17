import {
  SET_GAME_MESSAGE,
  LOAD_GAME_SUCCESS,
  END_GAME
} from "../constants/actions";

const initialState = {
  id: "",
  player: {
    name: "Player",
    score: 0,
    scoreAdd: 0
  },
  message: {} // internal-only field
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME_SUCCESS: {
      const id = action.payload;
      return {
        ...state,
        id
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
