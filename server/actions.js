const {
  SET_SCREEN_TOP,
  SET_SCREEN_READY,
  SET_PLAYERS_NUMBER
} = require("./constants/actions");

const setScreenTop = () => ({
  type: SET_SCREEN_TOP
});
const setScreenReady = () => ({
  type: SET_SCREEN_READY
});

const setPlayersNumber = number => ({
  type: SET_PLAYERS_NUMBER,
  payload: number
});

module.exports = { setScreenTop, setScreenReady, setPlayersNumber };
