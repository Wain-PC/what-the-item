const {
  SET_SCREEN_TOP,
  SET_SCREEN_READY,
  SET_SCREEN_GAME,
  SET_PLAYERS_NUMBER,
  SET_PLAYER_READY,
  SET_SCREEN_CONTROLS,
  SET_TIMER,
  SET_TIMER_INTERVAL_ID,
  CANCEL_TIMER_INTERVAL_ID
} = require("./constants/actions");

const setScreenTop = () => ({
  type: SET_SCREEN_TOP
});

const setScreenReady = () => ({
  type: SET_SCREEN_READY
});

const setPlayersNumber = number => ({
  type: SET_PLAYERS_NUMBER,
  payload: number
});

const setPlayerReady = index => ({
  type: SET_PLAYER_READY,
  payload: index
});

const setTimer = number => ({
  type: SET_TIMER,
  payload: number
});

const stopTimer = () => (dispatch, getState) => {
  const { interval } = getState();
  clearInterval(interval);
  dispatch({
    type: CANCEL_TIMER_INTERVAL_ID
  });
};

const runTimer = (onTimerFinish = () => {}) => (dispatch, getState) => {
  let { timer } = getState(); // initial timer
  const interval = setInterval(() => {
    timer -= 1;
    if (timer >= 1) {
      dispatch(setTimer(timer));
    } else {
      dispatch(stopTimer());
      onTimerFinish();
    }
  }, 1000);

  dispatch({
    type: SET_TIMER_INTERVAL_ID,
    payload: interval
  });

  return interval;
};

const setScreenGame = () => dispatch => {
  // Set the screen
  dispatch({
    type: SET_SCREEN_GAME
  });

  // Start the round.
  // Run the timer.
  dispatch(runTimer());

  // Load 4 random pictures. Select one of them as a 'correct' one.
};

// Show timer for N seconds, then switch to game screen
const setScreenControls = () => dispatch => {
  dispatch({
    type: SET_SCREEN_CONTROLS
  });

  dispatch(
    runTimer(() => {
      dispatch(setScreenGame());
    })
  );
};

module.exports = {
  setScreenTop,
  setScreenReady,
  setScreenControls,
  setScreenGame,
  setPlayersNumber,
  setPlayerReady,
  setTimer
};
