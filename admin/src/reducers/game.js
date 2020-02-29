import { LOAD_GAME_SUCCESS } from "../constants/actions";

const initialState = {
  _id: "",
  config: {
    gameplay: {},
    timers: {}
  },
  started: false,
  finished: false,
  startedOn: "",
  finishedOn: "",
  players: [],
  rounds: [],
  image: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME_SUCCESS: {
      const game = action.payload;
      return { ...game };
    }
    default: {
      return state;
    }
  }
};
