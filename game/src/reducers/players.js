import {
  SET_PLAYERS_NUMBER,
  SET_PLAYER_READY,
  SET_SCREEN_TOP,
  SET_SCREEN_GAME,
  START_GAME_ROUND,
  SELECT_ROUND_ANSWER,
  CALCULATE_ROUND_POINTS,
  SET_GAME_MESSAGE
} from "../constants/actions";

import {
  MIN_PLAYERS,
  MAX_PLAYERS,
  INITIAL_PLAYERS
} from "../constants/gameplay";

const initialPlayer = {
  index: 0,
  name: "Игрок 1",
  ready: false,
  answered: false,
  score: 0,
  scoreAdd: undefined
};

const generatePlayers = n => {
  return Array(n)
    .fill(initialPlayer)
    .map((player, index) => {
      return {
        ...player,
        name: `Игрок ${index + 1}`,
        index
      };
    });
};

const isPlayerInList = (state, index) => {
  const playersNumber = state.list.length;
  return index >= 0 && index < playersNumber;
};

const getNewList = (state, index) => {
  if (index !== undefined) {
    if (!isPlayerInList(state, index)) {
      return null;
    }
  }

  return JSON.parse(JSON.stringify(state.list));
};

const initialState = {
  list: generatePlayers(INITIAL_PLAYERS)
};

export default (state = initialState, action) => {
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

    case SET_SCREEN_GAME: {
      const list = state.list.map(player => ({
        ...player,
        score: 0
      }));

      return {
        ...state,
        list
      };
    }

    case START_GAME_ROUND: {
      const list = state.list.map(player => ({
        ...player,
        answered: false
      }));

      return {
        ...state,
        list
      };
    }

    case SELECT_ROUND_ANSWER: {
      const { playerIndex } = action.payload;

      if (state.list[playerIndex].answered) {
        return state;
      }

      const list = getNewList(state, playerIndex);
      if (!list) {
        return state;
      }

      list[playerIndex].answered = true;

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
      list[index].scoreAdd = points;

      return {
        ...state,
        list
      };
    }

    case SET_SCREEN_TOP: {
      return {
        ...initialState,
        list: generatePlayers(state.list.length)
      };
    }

    case SET_GAME_MESSAGE: {
      if (!action.payload) {
        const list = state.list.map(player => ({
          ...player,
          scoreAdd: undefined
        }));
        return {
          ...state,
          list
        };
      }
      return state;
    }

    default: {
      return state;
    }
  }
};
