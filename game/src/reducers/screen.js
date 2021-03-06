import {
  SET_SCREEN_TOP,
  SET_SCREEN_READY,
  SET_SCREEN_CONTROLS,
  SET_SCREEN_GAME,
  SET_SCREEN_WINNER,
  SET_SCREEN_GAME_END
} from "../constants/actions";

const {
  SCREEN_TOP,
  SCREEN_CONTROLS,
  SCREEN_READY,
  SCREEN_GAME,
  SCREEN_WINNER,
  SCREEN_GAME_END
} = require("../constants/screens");

const initialState = {
  id: SCREEN_TOP
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_TOP: {
      return {
        ...state,
        id: SCREEN_TOP
      };
    }

    case SET_SCREEN_READY: {
      return {
        ...state,
        id: SCREEN_READY
      };
    }

    case SET_SCREEN_CONTROLS: {
      return {
        ...state,
        id: SCREEN_CONTROLS
      };
    }

    case SET_SCREEN_GAME: {
      return {
        ...state,
        id: SCREEN_GAME
      };
    }

    case SET_SCREEN_WINNER: {
      return {
        ...state,
        id: SCREEN_WINNER
      };
    }

    case SET_SCREEN_GAME_END: {
      return {
        ...state,
        id: SCREEN_GAME_END
      };
    }
    default: {
      return state;
    }
  }
};
