import { LOAD_CONFIG_SUCCESS } from "../constants/actions";

const initialState = {
  loader: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONFIG_SUCCESS: {
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
