import {
  SET_GAME_MESSAGE,
  LOAD_GAME_SUCCESS,
  END_GAME,
  END_GAME_ROUND,
  CHANGE_WINNER_NICKNAME,
  CHANGE_WINNER_CONTACT,
  TOGGLE_NAME_ENTERED
} from "../constants/actions";

const initialState = {
  id: "",
  player: {
    name: "",
    contact: "",
    score: 0,
    scoreAdd: 0,
    nameFilled: false
  },
  message: {} // internal-only field
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME_SUCCESS: {
      const id = action.payload;
      return {
        ...state,
        id
      };
    }

    case END_GAME: {
      return initialState;
    }

    case SET_GAME_MESSAGE: {
      const message = action.payload;
      return {
        ...state,
        message: message
          ? {
              ...state.message,
              ...message
            }
          : initialState.message
      };
    }

    case END_GAME_ROUND: {
      const { score, pointsReceived } = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          score,
          scoreAdd: pointsReceived
        }
      };
    }

    case CHANGE_WINNER_NICKNAME: {
      const name = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          name
        }
      };
    }

    case CHANGE_WINNER_CONTACT: {
      const contact = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          contact
        }
      };
    }

    case TOGGLE_NAME_ENTERED: {
      return {
        ...state,
        player: {
          ...state.player,
          nameFilled: true
        }
      };
    }
    default: {
      return state;
    }
  }
};
