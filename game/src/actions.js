/* eslint-disable no-use-before-define */
import {
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
  SELECT_ROUND_ANSWER,
  CALCULATE_ROUND_POINTS,
  SET_WINNER,
  SET_WINNER_LETTER_INDEX_INCREASE,
  SET_WINNER_LETTER_INDEX_DECREASE,
  SET_WINNER_LETTER_INCREASE,
  SET_WINNER_LETTER_DECREASE,
  SET_WINNER_NICKNAME,
  SET_GAME_MESSAGE
} from "./constants/actions";

import {
  CONTROLS_SCREEN_TIMER,
  GAME_SCREEN_TIMER,
  POINTS_PER_ROUND,
  ROUND_END_TIMER
} from "./constants/gameplay";

import * as db from "./utils/db";

import getPicturesForRound from "./utils/getPicturesForRound";

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
  const id = await db.startGame({ players });
  const pictures = await db.getShuffledPictures();
  dispatch({
    type: SET_SCREEN_GAME,
    payload: {
      id,
      pictures
    }
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
  const topPlayers = await db.getTopPlayers({ gameId });

  // If the player is in top N players,
  const isInTop = topPlayers.some(player => player.gameId === gameId);

  if (isInTop) {
    dispatch({
      type: SET_SCREEN_GAME_END,
      payload: topPlayers
    });
  } else {
    dispatch(setScreenTop());
  }
};

const startRound = () => async (dispatch, getState) => {
  // This is the data for the the previous round.
  const {
    game: { round, pictures: allPictures },
    round: { answered }
  } = getState();

  // Recalculate points after each round (except the first one, obviously)
  if (round !== 0) {
    await dispatch(calculateRoundPoints());
    // Show correct/incorrect answer message for N seconds
    await dispatch(setMessage({ answered }, ROUND_END_TIMER));
  }

  const pictures = (await getPicturesForRound(allPictures, round)).map(
    picture => ({
      picture,
      selected: false,
      selectedBy: -1,
      correct: null
    })
  );

  const answerIndex = Math.floor(Math.random() * pictures.length);

  dispatch({
    type: START_GAME_ROUND,
    payload: {
      pictures,
      answerIndex
    }
  });

  // If we've just had a final round, switch to 'final' screen
  if (getState().game.finished) {
    await dispatch(stopTimer());
    await dispatch(setScreenWinner());
    return;
  }

  // Run the timer.
  dispatch(
    runTimer(GAME_SCREEN_TIMER, () => {
      // If the timer is here, no one has answered correctly.
      // Start the next round
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

const selectAnswer = (playerIndex, selectedAnswer) => async (
  dispatch,
  getState
) => {
  const {
    players: { list }
  } = getState();

  const { answered: playerAnswered } = list[playerIndex];

  if (playerAnswered) {
    return;
  }

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

  const winner = list[pictures[answerIndex].selectedBy];

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
  const points = Math.round(POINTS_PER_ROUND * (timeLeft / GAME_SCREEN_TIMER));

  dispatch({
    type: CALCULATE_ROUND_POINTS,
    payload: { index, points }
  });

  // Winner found, save round stats to DB.
  db.endRound({
    gameId,
    answered: roundAnswered,
    answeredBy: winner.index,
    timeLeft,
    pointsReceived: points,
    pictures
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

const setNickName = () => async (dispatch, getState) => {
  dispatch({
    type: SET_WINNER_NICKNAME
  });

  const {
    winner,
    game: { id: gameId }
  } = getState();

  const nickName = winner.nickName.replace(/_/g, " ").trim();

  if (!nickName) {
    return;
  }

  await db.setNickName({ gameId, nickName });

  await dispatch(setScreenTop());
};

const setMessage = (message, seconds = 0) => async dispatch => {
  dispatch({
    type: SET_GAME_MESSAGE,
    payload: message
  });
  if (seconds > 0) {
    await dispatch(runTimer(seconds));
    dispatch(clearMessage());
  }
};

const clearMessage = () => ({
  type: SET_GAME_MESSAGE
});

export {
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
  selectAnswer,
  calculateRoundPoints,
  setNickNameLetterIndexIncrease,
  setNickNameLetterIndexDecrease,
  setNickNameLetterIncrease,
  setNickNameLetterDecrease,
  setWinner,
  setNickName,
  setMessage
};
