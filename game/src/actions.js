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
  SET_WINNER_NICKNAME,
  SET_GAME_MESSAGE,
  LOAD_CONFIG_START,
  LOAD_CONFIG_SUCCESS,
  LOAD_CONFIG_ERROR,
  SET_WINNER_LETTER_INDEX,
  SET_WINNER_LETTER,
  LOAD_GAME_SUCCESS,
  END_GAME_ROUND,
  END_GAME
} from "./constants/actions";

import * as db from "./utils/db";

const getConfig = () => async dispatch => {
  dispatch({
    type: LOAD_CONFIG_START
  });

  try {
    const config = await db.getConfig();

    dispatch({
      type: LOAD_CONFIG_SUCCESS,
      payload: { config }
    });
  } catch (e) {
    dispatch({
      type: LOAD_CONFIG_ERROR,
      payload: e.message
    });
  }
};

const endGame = () => ({
  type: END_GAME
});

const setScreenTop = () => async dispatch => {
  const { players } = await db.getTopPlayers();

  dispatch({
    type: SET_SCREEN_TOP,
    payload: players
  });
};

const setScreenReady = () => (dispatch, getState) => {
  const { defaultPlayers } = getState().config.gameplay;

  dispatch({
    type: SET_PLAYERS_NUMBER,
    payload: defaultPlayers
  });

  dispatch({
    type: SET_SCREEN_READY
  });
};

const setPlayersNumber = number => (dispatch, getState) => {
  const {
    config: {
      gameplay: { minPlayers, maxPlayers }
    }
  } = getState();

  if (number < minPlayers || number > maxPlayers) {
    return;
  }

  dispatch({
    type: SET_PLAYERS_NUMBER,
    payload: number
  });
};

const setScreenGame = () => async dispatch => {
  await dispatch(startRound());

  return dispatch({
    type: SET_SCREEN_GAME
  });
};

// Show timer for N seconds, then switch to game screen
const setScreenControls = () => async (dispatch, getState) => {
  const {
    players: { list },
    config: {
      timers: { controls }
    }
  } = getState();

  dispatch({
    type: SET_SCREEN_CONTROLS
  });

  const players = list.map(({ index, name, score }) => ({
    index,
    name,
    score
  }));

  const timerPromise = dispatch(runTimer(controls));

  const [data] = await Promise.all([db.startGame({ players }), timerPromise]);

  dispatch({
    type: LOAD_GAME_SUCCESS,
    payload: data
  });

  dispatch(setScreenGame());
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

const setWinner = () => (dispatch, getState) => {
  // Determine the winner to show
  const {
    players: { list },
    game: {
      id: gameId,
      config: {
        gameplay: { winnerNickNameMaxLetters }
      }
    }
  } = getState();

  // TODO: what to do in case of a draw?
  const { index, name, score } = list.sort((p1, p2) => p2.score - p1.score)[0];

  // Set the winner
  dispatch({
    type: SET_WINNER,
    payload: {
      winner: {
        index,
        name,
        score
      },
      nickName: Array(winnerNickNameMaxLetters)
        .fill("_")
        .join("")
    }
  });

  // Save the winner to DB for this game.
  return db.endGame({ gameId, winner: { index, name, score } });
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
  const { players } = await db.getTopPlayers({ gameId });

  // If the player is in top N players,
  const isInTop = players.some(player => player.gameId === gameId);

  if (isInTop) {
    dispatch({
      type: SET_SCREEN_GAME_END,
      payload: players
    });
  } else {
    dispatch(endGame());
    dispatch(setScreenTop());
  }
};

const endRound = () => async (dispatch, getState) => {
  const {
    round: { answered },
    game: {
      config: {
        timers: { roundEnd: roundEndTimer }
      }
    }
  } = getState();
  await dispatch(calculateRoundPoints());
  // Show correct/incorrect answer message for N seconds
  await dispatch(setMessage({ answered }, roundEndTimer));
  // Increase round ID or set the game to finished
  dispatch({
    type: END_GAME_ROUND
  });
};

const startRound = () => async (dispatch, getState) => {
  // This is the data for the the previous round.
  const {
    game: {
      currentRound,
      rounds,
      config: {
        timers: { round }
      }
    }
  } = getState();

  dispatch({
    type: START_GAME_ROUND,
    payload: {
      round: rounds[currentRound]
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
    runTimer(round, async () => {
      // If the timer is here, no one has answered correctly.
      // Finish the current round
      await dispatch(endRound());
      // Start the next round
      await dispatch(startRound());
    })
  );

  // Save round to DB
  const {
    game: { id: gameId, currentRound: index }
  } = getState();

  await db.startRound({
    gameId,
    index
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
    await dispatch(endRound());
    await dispatch(startRound());
  }
};

const calculateRoundPoints = () => async (dispatch, getState) => {
  // Find the user that won the round
  const {
    timer: { timer: timeLeft },
    round: { index, answerIndex, answered: roundAnswered, selection },
    game: {
      id: gameId,
      players: list,
      config: {
        timers: { round },
        gameplay: { maxPointsPerRound }
      }
    }
  } = getState();

  const winner = list[selection[answerIndex].selectedBy];

  // No winner in this round, still save the stats.
  if (!winner) {
    db.endRound({
      gameId,
      round: {
        index,
        answered: false,
        timeLeft: 0,
        pointsReceived: 0,
        selection
      }
    });
    return;
  }

  const points = Math.round(maxPointsPerRound * (timeLeft / round));

  dispatch({
    type: CALCULATE_ROUND_POINTS,
    payload: { index: winner.index, points }
  });

  // Winner found, save round stats to DB.
  db.endRound({
    gameId,
    round: {
      index,
      answered: roundAnswered,
      answeredBy: winner.index,
      timeLeft,
      pointsReceived: points,
      selection
    }
  });
};

const setNickNameLetterIndexIncrease = () => (dispatch, getState) => {
  const { winnerNickNameMaxLetters } = getState().game.config.gameplay;
  const { activeLetter } = getState().winner;

  dispatch({
    type: SET_WINNER_LETTER_INDEX,
    payload: (activeLetter + 1) % winnerNickNameMaxLetters
  });
};

const setNickNameLetterIndexDecrease = () => (dispatch, getState) => {
  const { winnerNickNameMaxLetters } = getState().game.config.gameplay;
  const { activeLetter } = getState().winner;

  dispatch({
    type: SET_WINNER_LETTER_INDEX,
    payload:
      (activeLetter + winnerNickNameMaxLetters - 1) % winnerNickNameMaxLetters
  });
};
const setNickNameLetterIncrease = () => (dispatch, getState) => {
  const { activeLetter, nickName } = getState().winner;
  const { winnerNickNameLetterTable } = getState().game.config.gameplay;

  const currentLetterIndex = winnerNickNameLetterTable.indexOf(
    nickName.charAt(activeLetter)
  );
  const newLetter =
    winnerNickNameLetterTable[
      (currentLetterIndex + 1) % winnerNickNameLetterTable.length
    ];

  dispatch({
    type: SET_WINNER_LETTER,
    payload: newLetter
  });
};

const setNickNameLetterDecrease = () => (dispatch, getState) => {
  const { activeLetter, nickName } = getState().winner;
  const { winnerNickNameLetterTable } = getState().game.config.gameplay;

  const currentLetterIndex = winnerNickNameLetterTable.indexOf(
    nickName.charAt(activeLetter)
  );
  const newLetter =
    winnerNickNameLetterTable[
      (currentLetterIndex + winnerNickNameLetterTable.length - 1) %
        winnerNickNameLetterTable.length
    ];

  dispatch({
    type: SET_WINNER_LETTER,
    payload: newLetter
  });
};

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
  await dispatch(endGame());
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
  getConfig,
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
