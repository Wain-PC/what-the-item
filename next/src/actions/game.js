import * as db from "../utils/db";
import {
  SELECT_ROUND_ANSWER,
  LOAD_GAME_START,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_ERROR,
  START_ROUND_START,
  START_ROUND_SUCCESS,
  START_ROUND_ERROR,
  END_ROUND_START,
  END_ROUND_ERROR,
  END_ROUND_SUCCESS
} from "../constants/actions";

import { runTimer, stopTimer } from "./timer";
// eslint-disable-next-line import/no-cycle
import { setScreenWinner } from "./screen";

const selectAnswer = answerIndex => async (dispatch, getState) => {
  const {
    game: { id: gameId },
    config: {
      timers: { roundEnd }
    }
  } = getState();

  dispatch(stopTimer());

  dispatch({
    type: SELECT_ROUND_ANSWER,
    payload: answerIndex
  });

  dispatch({
    type: END_ROUND_START,
    payload: answerIndex
  });

  try {
    const { isCorrectAnswer, score, pointsReceived } = await db.endRound({
      gameId,
      answerIndex
    });

    dispatch({
      type: END_ROUND_SUCCESS,
      payload: {
        score,
        pointsReceived,
        answerIndex,
        isCorrectAnswer
      }
    });

    await dispatch(runTimer(roundEnd));
  } catch (e) {
    dispatch({
      type: END_ROUND_ERROR
    });
  }

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

  dispatch({
    type: START_ROUND_START
  });

  try {
    const round = await db.nextRound({ gameId });

    if (round) {
      dispatch({
        type: START_ROUND_SUCCESS,
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
  } catch (e) {
    dispatch({
      type: START_ROUND_ERROR
    });
  }
};

export { startGame, startRound, selectAnswer };
