import {
  SET_SCREEN_CONTROLS,
  SET_SCREEN_GAME,
  SET_SCREEN_GAME_END,
  SET_SCREEN_READY,
  SET_SCREEN_TOP,
  SET_SCREEN_WINNER
} from "../constants/actions";

import { getConfig, getTopPlayers } from "./top";
import { startGame, startRound } from "./game";

const setScreenTop = () => async dispatch => {
  dispatch({
    type: SET_SCREEN_TOP
  });

  await dispatch(getConfig());
  await dispatch(getTopPlayers());
};

const setScreenReady = () => ({
  type: SET_SCREEN_READY
});

const setScreenControls = () => ({
  type: SET_SCREEN_CONTROLS
});

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

const setScreenGameEnd = () => ({
  type: SET_SCREEN_GAME_END
});

export {
  setScreenTop,
  setScreenReady,
  setScreenControls,
  setScreenGame,
  setScreenWinner,
  setScreenGameEnd
};
