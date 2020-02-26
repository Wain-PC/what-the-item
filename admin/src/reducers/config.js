import {
  LOAD_CONFIG_SUCCESS,
  SAVE_CONFIG_SUCCESS,
  CONFIG_PROPERTY_CHANGE
} from "../constants/actions";

const initialState = {
  timers: {},
  gameplay: {},
  dirty: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONFIG_SUCCESS:
    case SAVE_CONFIG_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        dirty: false
      };
    }
    case CONFIG_PROPERTY_CHANGE: {
      const { type, id, value } = action.payload;
      return {
        ...state,
        [type]: {
          ...state[type],
          [id]: value
        },
        dirty: true
      };
    }
    default: {
      return state;
    }
  }
};
