import { send } from "./request";

const getConfig = () => send("getConfig");
const getTopPlayers = () => send("getTopPlayers");
const startGame = () => send("startGame");
const endGame = async ({ gameId }) => send("endGame", { gameId });
const startRound = ({ gameId }) => send("nextRound", { gameId });
const endRound = ({ gameId, answerIndex }) =>
  send("endRound", {
    gameId,
    answerIndex
  });
const setNickName = ({ gameId, nickName }) =>
  send("setNickName", { gameId, nickName });

export {
  getConfig,
  startGame,
  startRound,
  endRound,
  endGame,
  getTopPlayers,
  setNickName
};
