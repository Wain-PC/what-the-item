const {
  SET_TIMER,
  SET_TIMER_INTERVAL_ID,
  CANCEL_TIMER_INTERVAL_ID
} = require("../constants/actions");

const initialState = {
  timer: 0,
  timerId: 0
};

module.exports = (state = initialState, action) => {
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
      const { timerId } = initialState;

      return {
        ...state,
        timerId
      };
    }
    default: {
      return state;
    }
  }
};
