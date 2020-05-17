import { START_GAME_ROUND, SET_SCREEN_TOP } from "../constants/actions";

const initialState = {
  image: {
    image: ""
  },
  index: 0,
  selection: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_GAME_ROUND: {
      const { round } = action.payload;
      return {
        ...state,
        ...round
      };
    }

    case SET_SCREEN_TOP: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
