import {
  CANCEL_TIMER_INTERVAL_ID,
  SET_TIMER,
  SET_TIMER_INTERVAL_ID
} from "../constants/actions";

const stopTimer = () => (dispatch, getState) => {
  const {
    timer: { timerId }
  } = getState();
  clearInterval(timerId);
  dispatch({
    type: CANCEL_TIMER_INTERVAL_ID
  });
};

const setTimer = number => dispatch => {
  dispatch({
    type: SET_TIMER,
    payload: number
  });
};

const runTimer = (initialTimerValue, onTimerFinish = () => {}) => (
  dispatch,
  getState
) => {
  return new Promise(resolve => {
    let timer = initialTimerValue || getState().timer.timer; // initial timer

    // Stop any timer from previous screen/rounds
    dispatch(stopTimer());
    dispatch(setTimer(timer));

    const interval = setInterval(() => {
      timer -= 1;
      if (timer >= 1) {
        dispatch(setTimer(timer));
      } else {
        dispatch(stopTimer());
        onTimerFinish();
        resolve();
      }
    }, 1000);

    dispatch({
      type: SET_TIMER_INTERVAL_ID,
      payload: interval
    });
  });
};

export { runTimer, setTimer, stopTimer };
