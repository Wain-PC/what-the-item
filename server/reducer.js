const {
  SET_SCREEN_TOP,
  SET_SCREEN_READY,
  SET_PLAYERS_NUMBER
} = require("./constants/actions");

const MIN_PLAYERS = 1;
const MAX_PLAYERS = 4;

const initialState = {
  started: false,
  screen: "top",
  players: 1
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_TOP: {
      return initialState;
    }
    case SET_SCREEN_READY: {
      return {
        ...initialState,
        screen: "ready",
        playerReadiness: Array(state.players).fill(false)
      };
    }
    case SET_PLAYERS_NUMBER: {
      const number = action.payload;
      if (number < MIN_PLAYERS || number > MAX_PLAYERS) {
        return state;
      }
      return {
        ...state,
        players: number
      };
    }
    default: {
      return state;
    }
  }
};
