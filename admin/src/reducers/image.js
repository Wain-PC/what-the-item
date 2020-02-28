import {
  IMAGE_PROPERTY_CHANGE,
  ADD_INCORRECT_ANSWER,
  REMOVE_INCORRECT_ANSWER,
  CHANGE_INCORRECT_ANSWER,
  REMOVE_IMAGE_SUCCESS,
  SAVE_IMAGE_SUCCESS,
  LOAD_IMAGE_SUCCESS,
  IMAGE_DATA_CLEAR
} from "../constants/actions";

const initialState = {
  _id: "",
  image: "",
  title: "",
  incorrectTitles: [""],
  active: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_PROPERTY_CHANGE: {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value
      };
    }

    case ADD_INCORRECT_ANSWER: {
      return {
        ...state,
        incorrectTitles: state.incorrectTitles.concat("")
      };
    }

    case REMOVE_INCORRECT_ANSWER: {
      if (state.incorrectTitles.length === 1) {
        return state;
      }

      return {
        ...state,
        incorrectTitles: state.incorrectTitles.slice(0, -1)
      };
    }

    case CHANGE_INCORRECT_ANSWER: {
      const { index, value } = action.payload;
      return {
        ...state,
        incorrectTitles: state.incorrectTitles.map((title, i) => {
          if (index === i) {
            return value;
          }
          return title;
        })
      };
    }

    case LOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case SAVE_IMAGE_SUCCESS: {
      const { isEdit, ...image } = action.payload;

      if (isEdit) {
        return {
          ...state,
          ...image
        };
      }
      return initialState;
    }

    case IMAGE_DATA_CLEAR:
    case REMOVE_IMAGE_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
