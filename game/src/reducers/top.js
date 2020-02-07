import { SET_SCREEN_TOP, SET_SCREEN_GAME_END } from "../constants/actions";

const initialState = {
  players: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_TOP:
    case SET_SCREEN_GAME_END: {
      return {
        ...state,
        players: action.payload || initialState.players
      };
    }

    default: {
      return state;
    }
  }
};
