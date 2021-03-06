import {
  SET_TIMER,
  SET_TIMER_INTERVAL_ID,
  CANCEL_TIMER_INTERVAL_ID
} from "../constants/actions";

const initialState = {
  timer: 0,
  timerId: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMER: {
      return {
        ...state,
        timer: action.payload
      };
    }

    case SET_TIMER_INTERVAL_ID: {
      return {
        ...state,
        timerId: action.payload
      };
    }

    case CANCEL_TIMER_INTERVAL_ID: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
