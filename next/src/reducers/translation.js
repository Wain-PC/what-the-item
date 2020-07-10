import {
  LOAD_LANGUAGE_START,
  LOAD_LANGUAGE_SUCCESS
} from "../constants/actions";

const initialState = {
  language: "ru",
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LANGUAGE_START: {
      return {
        ...initialState,
        language: action.payload || initialState.language
      };
    }
    case LOAD_LANGUAGE_SUCCESS: {
      return {
        ...state,
        language: action.payload.language || initialState.language,
        data: action.payload.data || initialState.data
      };
    }

    default: {
      return state;
    }
  }
};
