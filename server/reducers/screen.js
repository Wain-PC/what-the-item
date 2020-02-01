const {
  SET_SCREEN_TOP,
  SET_SCREEN_READY,
  SET_SCREEN_CONTROLS,
  SET_SCREEN_GAME
} = require("../constants/actions");

const {
  SCREEN_TOP,
  SCREEN_CONTROLS,
  SCREEN_READY,
  SCREEN_GAME
} = require("../constants/screens");

const initialState = {
  id: SCREEN_TOP
};

module.exports = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};
