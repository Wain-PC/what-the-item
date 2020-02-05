/* eslint-disable no-use-before-define */
const {
  SET_SCREEN_TOP,
  SET_SCREEN_READY,
  SET_SCREEN_GAME,
  SET_SCREEN_WINNER,
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
  CALCULATE_ROUND_POINTS,
  SET_WINNER,
  SET_WINNER_LETTER_INDEX_INCREASE,
  SET_WINNER_LETTER_INDEX_DECREASE,
  SET_WINNER_LETTER_INCREASE,
  SET_WINNER_LETTER_DECREASE
} = require("./constants/actions");

const {
  CONTROLS_SCREEN_TIMER,
  GAME_SCREEN_TIMER,
  POINTS_PER_ROUND
} = require("./constants/gameplay");

const db = require("./db");

const getPictures = require("./utils/getPictures");

const setScreenTop = () => async dispatch => {
  const topPlayers = await db.getTopPlayers();

  dispatch({
    type: SET_SCREEN_TOP,
    payload: topPlayers
  });
};

const setScreenReady = () => ({
  type: SET_SCREEN_READY
});

const setPlayersNumber = number => ({
  type: SET_PLAYERS_NUMBER,
  payload: number
});

const setScreenGame = () => async (dispatch, getState) => {
  const {
    players: { list: players }
  } = getState();
  // Start the game in DB and get gameId
  const gameId = await db.startGame({ players });
  // Set the screen
  dispatch({
    type: SET_SCREEN_GAME,
    payload: gameId
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

const setPlayerReady = index => (dispatch, getState) => {
  dispatch({
    type: SET_PLAYER_READY,
    payload: index
  });
  const { list } = getState().players;

  if (list.every(({ ready }) => ready === true)) {
    dispatch(setScreenControls());
  }
};

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
  dispatch(setTimer(timer));

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

const setWinner = () => async (dispatch, getState) => {
  // Determine the winner to show
  const {
    players: { list },
    game: { id: gameId }
  } = getState();

  // TODO: what to do in case of a draw?
  const { index, name, score } = list.sort((p1, p2) => p2.score - p1.score)[0];

  // Set the winner
  dispatch({
    type: SET_WINNER,
    payload: {
      index,
      name,
      score
    }
  });

  // Save the winner to DB for this game.
  await db.endGame({ gameId, winner: { index, name, score } });
};

const setScreenWinner = () => async dispatch => {
  await dispatch(setWinner());

  // Change the screen
  dispatch({
    type: SET_SCREEN_WINNER
  });
};

const setScreenGameEnd = () => async (dispatch, getState) => {
  const {
    game: { id: gameId }
  } = getState();
  const topPlayers = await db.getTopPlayersWithCurrent({ gameId });

  dispatch({
    type: SET_SCREEN_GAME_END,
    payload: topPlayers
  });
};

const startRound = () => async (dispatch, getState) => {
  // This is the data for the the previous round.
  const {
    game: { round, finished }
  } = getState();

  // Recalculate points after each round (except the first one, obviously)
  if (round !== 0) {
    await dispatch(calculateRoundPoints());
  }

  const pictures = (await getPictures()).map(picture => ({
    picture,
    selected: false,
    selectedBy: -1,
    correct: null
  }));

  const answerIndex = Math.floor(Math.random() * pictures.length);

  dispatch({
    type: START_GAME_ROUND,
    payload: {
      pictures,
      answerIndex
    }
  });

  // If we've just had a final round, switch to 'final' screen
  if (finished) {
    await dispatch(stopTimer());
    await dispatch(setScreenWinner());
    return;
  }

  // Run the timer.
  dispatch(
    runTimer(GAME_SCREEN_TIMER, () => {
      // If the timer is here, no one has answered correctly.
      // Show failure message for 3 seconds, then switch to the next round.
      dispatch(startRound());
    })
  );

  // Save round to DB
  const {
    game: { id: gameId, round: index }
  } = getState();
  await db.startRound({
    gameId,
    index,
    pictures,
    answerIndex,
    timeToSolve: GAME_SCREEN_TIMER
  });
};

const moveAnswerUp = playerIndex => ({
  type: MOVE_ROUND_ANSWER_UP,
  payload: { playerIndex }
});

const moveAnswerDown = playerIndex => ({
  type: MOVE_ROUND_ANSWER_DOWN,
  payload: { playerIndex }
});

const selectAnswer = playerIndex => async (dispatch, getState) => {
  const {
    players: { list }
  } = getState();

  const { selectedAnswer } = list[playerIndex];

  dispatch({
    type: SELECT_ROUND_ANSWER,
    payload: { playerIndex, selectedAnswer }
  });

  // If the answer was correct, recalculate the points and start a new round.
  // Do the same thing if every player has answered at this point.

  const everyPlayerHasAnswered = getState().players.list.every(
    player => player.answered
  );
  const { answered } = getState().round;
  if (answered || everyPlayerHasAnswered) {
    await dispatch(startRound());
  }
};

const calculateRoundPoints = () => async (dispatch, getState) => {
  // Find the user that won the round
  const {
    players: { list },
    timer: { timer: timeLeft },
    round: { answerIndex, answered: roundAnswered, pictures },
    game: { id: gameId }
  } = getState();

  const winner = list.find(
    ({ answered, selectedAnswer }) => answered && selectedAnswer === answerIndex
  );

  // No winner in this round, still save the stats.
  if (!winner) {
    await db.endRound({
      gameId,
      answered: false,
      timeLeft: 0,
      pointsReceived: 0,
      pictures
    });
    return;
  }

  const { index } = winner;
  const points = timeLeft * POINTS_PER_ROUND;

  // Winner found, save round stats to DB.
  await db.endRound({
    gameId,
    answered: roundAnswered,
    answeredBy: winner.index,
    timeLeft,
    pointsReceived: points,
    pictures
  });

  dispatch({
    type: CALCULATE_ROUND_POINTS,
    payload: { index, points }
  });
};

const setNickNameLetterIndexIncrease = () => ({
  type: SET_WINNER_LETTER_INDEX_INCREASE
});

const setNickNameLetterIndexDecrease = () => ({
  type: SET_WINNER_LETTER_INDEX_DECREASE
});
const setNickNameLetterIncrease = () => ({
  type: SET_WINNER_LETTER_INCREASE
});

const setNickNameLetterDecrease = () => ({
  type: SET_WINNER_LETTER_DECREASE
});

module.exports = {
  setScreenTop,
  setScreenReady,
  setScreenControls,
  setScreenGame,
  setScreenWinner,
  setScreenGameEnd,
  setPlayersNumber,
  setPlayerReady,
  setTimer,
  startRound,
  moveAnswerUp,
  moveAnswerDown,
  selectAnswer,
  calculateRoundPoints,
  setNickNameLetterIndexIncrease,
  setNickNameLetterIndexDecrease,
  setNickNameLetterIncrease,
  setNickNameLetterDecrease,
  setWinner
};
