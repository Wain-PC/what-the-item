import {
  SET_SCREEN_DASHBOARD,
  SET_SCREEN_TOP_PLAYERS,
  SET_SCREEN_GAMES
} from "../constants/actions";
import {
  SCREEN_DASHBOARD,
  SCREEN_TOP_PLAYERS,
  SCREEN_GAMES
} from "../constants/screens";

const initialState = {
  id: SCREEN_DASHBOARD
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_DASHBOARD: {
      return {
        ...state,
        id: SCREEN_DASHBOARD
      };
    }
    case SET_SCREEN_TOP_PLAYERS: {
      return {
        ...state,
        id: SCREEN_TOP_PLAYERS
      };
    }
    case SET_SCREEN_GAMES: {
      return {
        ...state,
        id: SCREEN_GAMES
      };
    }
    default: {
      return state;
    }
  }
};
