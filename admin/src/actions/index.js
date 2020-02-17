import {
  SET_SCREEN_DASHBOARD,
  SET_SCREEN_TOP_PLAYERS
} from "../constants/actions";

export const setScreenDashboard = () => dispatch => {
  dispatch({
    type: SET_SCREEN_DASHBOARD
  });
};
export const setScreenTopPlayers = () => dispatch => {
  // DB request here

  dispatch({
    type: SET_SCREEN_TOP_PLAYERS
  });
};
