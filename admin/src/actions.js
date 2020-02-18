import {
  LOAD_TOP_PLAYERS_SUCCESS,
  SET_SCREEN_DASHBOARD,
  SET_SCREEN_TOP_PLAYERS,
  SET_SCREEN_GAMES,
  LOAD_GAMES_SUCCESS
} from "./constants/actions";

import * as db from "./utils/db";

export const setScreenDashboard = () => dispatch => {
  dispatch({
    type: SET_SCREEN_DASHBOARD
  });
};

export const setScreenTopPlayers = () => async dispatch => {
  dispatch({
    type: SET_SCREEN_TOP_PLAYERS
  });

  // DB request here
  const data = await db.getPlayers();

  dispatch({
    type: LOAD_TOP_PLAYERS_SUCCESS,
    payload: data
  });
};

export const setScreenGames = () => async dispatch => {
  dispatch({
    type: SET_SCREEN_GAMES
  });

  // DB request here
  const data = await db.getGames();

  dispatch({
    type: LOAD_GAMES_SUCCESS,
    payload: data
  });
};
