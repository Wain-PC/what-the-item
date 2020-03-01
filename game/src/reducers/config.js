import { LOAD_CONFIG_SUCCESS, SET_SCREEN_GAME } from "../constants/actions";

const initialState = {
  gameplay: {},
  timers: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONFIG_SUCCESS:
    case SET_SCREEN_GAME: {
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
