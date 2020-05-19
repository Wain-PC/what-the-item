import {
  LOADER_SHOW,
  LOADER_HIDE,
  ERROR_SHOW,
  ERROR_HIDE,
  SUCCESS_SHOW,
  SUCCESS_HIDE
} from "../constants/actions";

const initialState = {
  loggedIn: true,
  loading: false,
  error: "",
  success: ""
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
    case SUCCESS_SHOW: {
      return {
        ...state,
        success: action.payload
      };
    }
    case SUCCESS_HIDE: {
      return {
        ...state,
        success: ""
      };
    }
    default: {
      return state;
    }
  }
};
