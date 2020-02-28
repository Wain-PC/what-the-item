import {
  LOADER_SHOW,
  LOADER_HIDE,
  ERROR_SHOW,
  ERROR_HIDE
} from "../constants/actions";

const initialState = {
  loggedIn: true,
  loading: false,
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADER_SHOW: {
      return {
        ...state,
        loading: true
      };
    }
    case LOADER_HIDE: {
      return {
        ...state,
        loading: false
      };
    }
    case ERROR_SHOW: {
      return {
        ...state,
        error: action.payload
      };
    }
    case ERROR_HIDE: {
      return {
        ...state,
        error: ""
      };
    }
    default: {
      return state;
    }
  }
};
