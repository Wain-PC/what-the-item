import * as db from "../utils/db";
import {
  SET_GAME_MESSAGE,
  START_GAME_ROUND,
  END_GAME_ROUND,
  SELECT_ROUND_ANSWER,
  LOAD_GAME_START,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_ERROR
} from "../constants/actions";

import { runTimer, stopTimer } from "./timer";
// eslint-disable-next-line import/no-cycle
import { setScreenWinner } from "./screen";

const clearMessage = () => ({
  type: SET_GAME_MESSAGE
});

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

const selectAnswer = answerIndex => async (dispatch, getState) => {
  const {
    game: { id: gameId },
    config: {
      timers: { roundEnd: roundEndTimer }
    }
  } = getState();

  dispatch({
    type: SELECT_ROUND_ANSWER,
    payload: answerIndex
  });

  const { isCorrectAnswer, score, pointsReceived } = await db.endRound({
    gameId,
    answerIndex
  });

  dispatch({
    type: END_GAME_ROUND,
    payload: {
      score,
      pointsReceived,
      answerIndex,
      isCorrectAnswer
    }
  });

  // Show correct/incorrect answer message for N seconds
  await dispatch(setMessage({ answered: isCorrectAnswer }, roundEndTimer));

  // eslint-disable-next-line no-use-before-define
  dispatch(startRound());
};

const startGame = () => async dispatch => {
  dispatch({
    type: LOAD_GAME_START
  });
  try {
    const gameId = await db.startGame();

    dispatch({
      type: LOAD_GAME_SUCCESS,
      payload: gameId
    });
  } catch (e) {
    dispatch({
      type: LOAD_GAME_ERROR
    });

    throw e;
  }
};

const startRound = () => async (dispatch, getState) => {
  // This is the data for the the previous round.
  const {
    game: { id: gameId },
    config: {
      timers: { round: roundTimer }
    }
  } = getState();

  const round = await db.nextRound({ gameId });

  if (round) {
    dispatch({
      type: START_GAME_ROUND,
      payload: { round }
    });

    // Run the timer.
    dispatch(
      runTimer(roundTimer, async () => {
        // If the timer is here, no one has answered correctly.
        await dispatch(selectAnswer());
      })
    );

    // If we've just had a final round, switch to 'final' screen
  } else {
    await dispatch(stopTimer());
    await dispatch(setScreenWinner());
  }
};

export { startGame, startRound, selectAnswer };
