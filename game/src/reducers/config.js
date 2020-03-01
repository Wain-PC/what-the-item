import { LOAD_CONFIG_SUCCESS, LOAD_GAME_SUCCESS } from "../constants/actions";

const initialState = {
  gameplay: {},
  timers: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONFIG_SUCCESS:
    case LOAD_GAME_SUCCESS: {
      const { config } = action.payload;
      return {
        ...state,
        ...config
      };
    }

    default: {
      return state;
    }
  }
};
