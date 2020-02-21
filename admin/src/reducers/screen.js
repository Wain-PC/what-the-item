import {
  SET_SCREEN_DASHBOARD,
  SET_SCREEN_TOP_PLAYERS,
  SET_SCREEN_GAMES,
  SET_SCREEN_CONFIG
} from "../constants/actions";
import {
  SCREEN_DASHBOARD,
  SCREEN_TOP_PLAYERS,
  SCREEN_GAMES,
  SCREEN_CONFIG
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
    case SET_SCREEN_CONFIG: {
      return {
        ...state,
        id: SCREEN_CONFIG
      };
    }
    default: {
      return state;
    }
  }
};
