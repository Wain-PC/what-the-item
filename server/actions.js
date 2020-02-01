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
  SELECT_ROUND_ANSWER,
  CALCULATE_ROUND_POINTS
} = require("./constants/actions");

const {
  CONTROLS_SCREEN_TIMER,
  GAME_SCREEN_TIMER,
  ROUNDS_IN_GAME,
  POINTS_PER_ROUND
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
  let timer = initialTimerValue || getState().timer.timer; // initial timer

  // Stop any timer from previous screen/rounds
  dispatch(stopTimer());

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

  // Run the timer.
  dispatch(
    runTimer(GAME_SCREEN_TIMER, () => {
      // If the timer is here, no one has answered correctly.
      // Show failure message for 3 seconds, then switch to the next round.
      dispatch(startRound());
    })
  );
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

  dispatch(
    runTimer(CONTROLS_SCREEN_TIMER, () => {
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

const calculateRoundPoints = () => (dispatch, getState) => {
  // Find the user that won the round
  const {
    players: { list },
    timer: { timer: timeLeft },
    round: { pictures, answer, answered: roundFinished }
  } = getState();

  // Prevent any miscalculations.
  if (!roundFinished) {
    return;
  }

  const winner = list.find(
    ({ answered, selectedAnswer }) =>
      answered && pictures[selectedAnswer] === answer
  );

  if (!winner) {
    return;
  }

  const { index } = winner;
  const points = timeLeft * POINTS_PER_ROUND;

  dispatch({
    type: CALCULATE_ROUND_POINTS,
    payload: { index, points }
  });
};

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
  selectAnswer,
  calculateRoundPoints
};
