import { LOAD_CONFIG_SUCCESS } from "../constants/actions";

const initialState = {
  timers: {},
  gameplay: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONFIG_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};
