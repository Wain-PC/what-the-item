const {
  SET_PLAYERS_NUMBER,
  SET_PLAYER_READY,
  START_GAME_ROUND,
  MOVE_ROUND_ANSWER_UP,
  MOVE_ROUND_ANSWER_DOWN,
  SELECT_ROUND_ANSWER,
  CALCULATE_ROUND_POINTS
} = require("../constants/actions");

const {
  MIN_PLAYERS,
  MAX_PLAYERS,
  INITIAL_PLAYERS,
  ANSWERS_IN_ROUND
} = require("../constants/gameplay");

const initialPlayer = {
  index: 0,
  name: "Player 1",
  ready: false,
  answered: false,
  score: 0,
  selectedAnswer: 0
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

const isPlayerInList = (state, index) => {
  const playersNumber = state.list.length;
  return index >= 0 && index < playersNumber;
};

const getNewList = (state, index) => {
  if (!isPlayerInList(state, index)) {
    return null;
  }

  return JSON.parse(JSON.stringify(state.list));
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
      const list = getNewList(state, index);
      if (!list) {
        return state;
      }

      list[index].ready = !list[index].ready;

      return {
        ...state,
        list
      };
    }

    case START_GAME_ROUND: {
      const list = state.list.map(player => ({
        ...player,
        answered: false,
        selectedAnswer: 0
      }));

      return {
        ...state,
        list
      };
    }

    case MOVE_ROUND_ANSWER_UP: {
      const { playerIndex: index } = action.payload;
      const list = getNewList(state, index);
      if (!list) {
        return state;
      }

      list[index].selectedAnswer =
        (list[index].selectedAnswer + ANSWERS_IN_ROUND - 1) % ANSWERS_IN_ROUND;

      return {
        ...state,
        list
      };
    }

    case MOVE_ROUND_ANSWER_DOWN: {
      const { playerIndex: index } = action.payload;
      const list = getNewList(state, index);
      if (!list) {
        return state;
      }

      list[index].selectedAnswer =
        (list[index].selectedAnswer + 1) % ANSWERS_IN_ROUND;

      return {
        ...state,
        list
      };
    }

    case SELECT_ROUND_ANSWER: {
      const index = action.payload;
      const list = getNewList(state, index);
      if (!list) {
        return state;
      }

      list[index].answered = true;

      return {
        ...state,
        list
      };
    }

    case CALCULATE_ROUND_POINTS: {
      const { index, points } = action.payload;

      const list = getNewList(state, index);
      if (!list) {
        return state;
      }

      list[index].score += points;

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
