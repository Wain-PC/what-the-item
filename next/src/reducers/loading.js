import { LOADER_SHOW, LOADER_HIDE } from "../constants/actions";

const initialState = {
  loading: false
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

    default: {
      return state;
    }
  }
};
