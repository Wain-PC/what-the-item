const {
  SET_SCREEN_TOP,
  SET_SCREEN_READY,
  SET_SCREEN_GAME,
  SET_PLAYERS_NUMBER,
  SET_PLAYER_READY,
  SET_SCREEN_CONTROLS,
  SET_TIMER
} = require("./constants/actions");

const setScreenTop = () => ({
  type: SET_SCREEN_TOP
});

const setScreenReady = () => ({
  type: SET_SCREEN_READY
});

const setScreenGame = () => ({
  type: SET_SCREEN_GAME
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

const runTimer = (onTimerFinish = () => {}) => (dispatch, getState) => {
  let { timer } = getState(); // initial timer
  const interval = setInterval(() => {
    timer -= 1;
    if (timer >= 1) {
      dispatch(setTimer(timer));
    } else {
      clearInterval(interval);
      onTimerFinish();
    }
  }, 1000);

  return interval;
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
