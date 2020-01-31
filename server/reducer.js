const {
  SET_SCREEN_TOP,
  SET_SCREEN_READY,
  SET_PLAYERS_NUMBER,
  SET_PLAYER_READY
} = require("./constants/actions");

const MIN_PLAYERS = 1;
const MAX_PLAYERS = 4;

const initialState = {
  started: false,
  screen: "top",
  players: 1,
  playerReadiness: []
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_TOP: {
      return {
        ...initialState,
        players: state.players
      };
    }

    case SET_SCREEN_READY: {
      return {
        ...state,
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

    case SET_PLAYER_READY: {
      console.log(action.payload);
      const { index } = action.payload;
      if (index < 0 || index > state.players - 1) {
        return state;
      }

      const readiness = [...state.playerReadiness];
      readiness[index] = !readiness[index];

      return {
        ...state,
        playerReadiness: readiness
      };
    }
    default: {
      return state;
    }
  }
};
