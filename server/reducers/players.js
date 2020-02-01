const {
  SET_PLAYERS_NUMBER,
  SET_PLAYER_READY
} = require("../constants/actions");

const {
  MIN_PLAYERS,
  MAX_PLAYERS,
  INITIAL_PLAYERS
} = require("../constants/gameplay");

const initialPlayer = {
  index: 0,
  name: "Player 1",
  ready: false,
  score: 0
};

const generatePlayers = n => {
  return Array(n)
    .fill(initialPlayer)
    .map((player, index) => {
      return {
        ...player,
        name: `Player ${index + 1}`,
        index
      };
    });
};

const initialState = {
  list: generatePlayers(INITIAL_PLAYERS)
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYERS_NUMBER: {
      const number = action.payload;
      if (number < MIN_PLAYERS || number > MAX_PLAYERS) {
        return state;
      }
      return {
        ...state,
        list: generatePlayers(number)
      };
    }

    case SET_PLAYER_READY: {
      const index = action.payload;
      const playersNumber = state.list.length;
      if (index < 0 || index > playersNumber - 1) {
        return state;
      }

      const list = JSON.parse(JSON.stringify(state.list));
      list[index].ready = !list[index].ready;

      return {
        ...state,
        list
      };
    }
    default: {
      return state;
    }
  }
};
