import {
  LOAD_GAME_SUCCESS,
  END_GAME,
  START_ROUND_SUCCESS,
  END_ROUND_SUCCESS,
  LOAD_IS_IN_TOP_SUCCESS,
  CHANGE_WINNER_NICKNAME,
  CHANGE_WINNER_CONTACT
} from "../constants/actions";

const initialState = {
  id: "",
  player: {
    name: "",
    contact: "",
    score: 0,
    scoreAdd: 0,
    place: 0
  }
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
      return {
        ...initialState,
        player: {
          ...initialState.player,
          name: state.player.name,
          contact: state.player.contact
        }
      };
    }

    case START_ROUND_SUCCESS: {
      return {
        ...state,
        player: {
          ...state.player,
          scoreAdd: initialState.scoreAdd
        }
      };
    }

    case END_ROUND_SUCCESS: {
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

    case LOAD_IS_IN_TOP_SUCCESS: {
      const { place } = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          place
        }
      };
    }
    default: {
      return state;
    }
  }
};
