const {
  SET_SCREEN_TOP,
  SET_SCREEN_READY,
  SET_SCREEN_GAME,
  SET_SCREEN_GAME_END,
  SET_PLAYERS_NUMBER,
  SET_PLAYER_READY,
  SET_SCREEN_CONTROLS,
  SET_TIMER,
  SET_TIMER_INTERVAL_ID,
  CANCEL_TIMER_INTERVAL_ID,
  START_GAME_ROUND,
  MOVE_ROUND_ANSWER_UP,
  MOVE_ROUND_ANSWER_DOWN,
  SELECT_ROUND_ANSWER
} = require("./constants/actions");

const {
  CONTROLS_SCREEN_TIMER,
  GAME_SCREEN_TIMER,
  ROUNDS_IN_GAME
} = require("./constants/gameplay");

const getPictures = require("./utils/getPictures");

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
  const {
    timer: { timerId }
  } = getState();
  clearInterval(timerId);
  dispatch({
    type: CANCEL_TIMER_INTERVAL_ID
  });
};

const runTimer = (onTimerFinish = () => {}) => (dispatch, getState) => {
  let {
    timer: { timer }
  } = getState(); // initial timer
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

const setScreenGameEnd = () => dispatch => {
  // Set the screen
  dispatch({
    type: SET_SCREEN_GAME_END
  });
};

const startRound = () => async (dispatch, getState) => {
  const {
    round: { index }
  } = getState();

  // If we've just had a final round, switch to 'final' screen
  if (index >= ROUNDS_IN_GAME) {
    dispatch(setScreenGameEnd());
  }

  const pictures = await getPictures();
  dispatch({
    type: START_GAME_ROUND,
    payload: {
      pictures,
      answer: pictures[0]
    }
  });

  dispatch(setTimer(GAME_SCREEN_TIMER));
  // Run the timer.
  /* dispatch(
    runTimer(() => {
      // If the timer is here, no one has answered correctly.
      // Show failure message for 3 seconds, then switch to the next round.
      dispatch(startRound());
    })
  ); */
};

const setScreenGame = () => dispatch => {
  // Set the screen
  dispatch({
    type: SET_SCREEN_GAME
  });

  dispatch(startRound());
};

// Show timer for N seconds, then switch to game screen
const setScreenControls = () => dispatch => {
  dispatch({
    type: SET_SCREEN_CONTROLS
  });

  dispatch(setTimer(CONTROLS_SCREEN_TIMER));
  dispatch(
    runTimer(() => {
      dispatch(setScreenGame());
    })
  );
};

const moveAnswerUp = playerIndex => ({
  type: MOVE_ROUND_ANSWER_UP,
  payload: { playerIndex }
});

const moveAnswerDown = playerIndex => ({
  type: MOVE_ROUND_ANSWER_DOWN,
  payload: { playerIndex }
});

const selectAnswer = playerIndex => ({
  type: SELECT_ROUND_ANSWER,
  payload: playerIndex
});

module.exports = {
  setScreenTop,
  setScreenReady,
  setScreenControls,
  setScreenGame,
  setPlayersNumber,
  setPlayerReady,
  setTimer,
  startRound,
  moveAnswerUp,
  moveAnswerDown,
  selectAnswer
};
