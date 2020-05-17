import {
  LOAD_CONFIG_ERROR,
  LOAD_CONFIG_START,
  LOAD_CONFIG_SUCCESS,
  LOAD_TOP_PLAYERS_ERROR,
  LOAD_TOP_PLAYERS_START,
  LOAD_TOP_PLAYERS_SUCCESS
} from "../constants/actions";
import * as db from "../utils/db";

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

const getTopPlayers = () => async dispatch => {
  dispatch({
    type: LOAD_TOP_PLAYERS_START
  });

  const { players } = await db.getTopPlayers();

  try {
    dispatch({
      type: LOAD_TOP_PLAYERS_SUCCESS,
      payload: players
    });
  } catch (error) {
    dispatch({
      type: LOAD_TOP_PLAYERS_ERROR,
      error
    });
  }
};

export { getConfig, getTopPlayers };
