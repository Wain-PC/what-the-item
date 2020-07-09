import {
  END_GAME,
  SET_SCREEN_CONTROLS,
  SET_SCREEN_GAME,
  SET_SCREEN_GAME_END,
  SET_SCREEN_READY,
  SET_SCREEN_TOP,
  SET_SCREEN_WINNER
} from "../constants/actions";

import { getConfig, getTopPlayers } from "./top";
// eslint-disable-next-line import/no-cycle
import { startGame, startRound } from "./game";
// eslint-disable-next-line import/no-cycle
import { getIsInTop } from "./gameEnd";
import { runTimer } from "./timer";

const setScreenTop = () => async dispatch => {
  dispatch({
    type: END_GAME
  });

  dispatch({
    type: SET_SCREEN_TOP
  });

  await dispatch(getConfig());
  await dispatch(getTopPlayers());
};

const setScreenReady = () => (dispatch, getState) => {
  const {
    config: {
      gameplay: { topPlayers }
    },
    loading: { loading }
  } = getState();

  if (topPlayers && !loading) {
    dispatch({
      type: SET_SCREEN_READY
    });
  }
};

const setScreenControls = () => (dispatch, getState) => {
  const { controls } = getState().config.timers;

  if (!controls) {
    // eslint-disable-next-line no-use-before-define
    dispatch(setScreenGame());
    return;
  }

  dispatch(
    runTimer(controls, () => {
      // eslint-disable-next-line no-use-before-define
      dispatch(setScreenGame());
    })
  );

  dispatch({
    type: SET_SCREEN_CONTROLS
  });
};

const setScreenGame = () => async dispatch => {
  await dispatch(startGame());
  await dispatch(startRound());

  dispatch({
    type: SET_SCREEN_GAME
  });
};

const setScreenWinner = () => ({
  type: SET_SCREEN_WINNER
});

const setScreenGameEnd = () => async dispatch => {
  const isInTop = await dispatch(getIsInTop());

  if (isInTop) {
    dispatch({
      type: SET_SCREEN_GAME_END
    });
  } else {
    dispatch(setScreenTop());
  }
};

export {
  setScreenTop,
  setScreenReady,
  setScreenControls,
  setScreenGame,
  setScreenWinner,
  setScreenGameEnd
};
