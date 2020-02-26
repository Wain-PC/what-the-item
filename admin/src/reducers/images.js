import { LOAD_IMAGES_SUCCESS } from "../constants/actions";

const initialState = {
  images: [],
  total: 0,
  active: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_IMAGES_SUCCESS: {
      const { images, total, active } = action.payload;
      return {
        ...state,
        images,
        total,
        active
      };
    }
    default: {
      return state;
    }
  }
};
