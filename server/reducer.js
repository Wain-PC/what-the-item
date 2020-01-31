const {
  SET_SCREEN_TOP,
  SET_SCREEN_READY,
  SET_SCREEN_CONTROLS,
  SET_SCREEN_GAME,
  SET_PLAYERS_NUMBER,
  SET_PLAYER_READY,
  SET_TIMER
} = require("./constants/actions");

const {
  SCREEN_TOP,
  SCREEN_CONTROLS,
  SCREEN_READY,
  SCREEN_GAME
} = require("./constants/screens");
const {
  MIN_PLAYERS,
  MAX_PLAYERS,
  CONTROLS_SCREEN_TIMER,
  GAME_SCREEN_TIMER
} = require("./constants/gameplay");

const initialState = {
  started: false,
  timer: 0,
  screen: SCREEN_TOP,
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
        screen: SCREEN_READY,
        playerReadiness: Array(state.players).fill(false)
      };
    }

    case SET_SCREEN_CONTROLS: {
      return {
        ...state,
        screen: SCREEN_CONTROLS,
        timer: CONTROLS_SCREEN_TIMER
      };
    }

    case SET_SCREEN_GAME: {
      return {
        ...state,
        screen: SCREEN_GAME,
        timer: GAME_SCREEN_TIMER
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
      const index = action.payload;
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

    case SET_TIMER: {
      return {
        ...state,
        timer: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
