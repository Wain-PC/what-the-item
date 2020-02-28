import { LOAD_GAME_SUCCESS } from "../constants/actions";

const initialState = {
  _id: "",
  config: {
    gameplay: {},
    timers: {}
  },
  finished: false,
  finishedOn: "",
  players: [],
  rounds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME_SUCCESS: {
      const game = action.payload;
      return {
        ...state,
        ...game
      };
    }
    default: {
      return state;
    }
  }
};
