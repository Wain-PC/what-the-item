import { SET_SCREEN_TOP, LOAD_TOP_PLAYERS_SUCCESS } from "../constants/actions";

const initialState = {
  players: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_TOP:
    case LOAD_TOP_PLAYERS_SUCCESS: {
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
