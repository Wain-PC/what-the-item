const {SET_SCREEN_TOP, SET_SCREEN_READY} = require('./constants/actions');

const setScreenTop = () => ({
   type: SET_SCREEN_TOP
});
const setScreenReady = () => ({
   type: SET_SCREEN_READY
});

module.exports = { setScreenTop, setScreenReady };
