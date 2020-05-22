import { send } from "./request";

const getConfig = () => send("getConfig");
const getTopPlayers = () => send("getTopPlayers");
const isInTop = ({ gameId }) => send("isInTop", { gameId });
const startGame = () => send("startGame");
const nextRound = ({ gameId }) => send("nextRound", { gameId });
const endRound = ({ gameId, answerIndex }) =>
  send("endRound", {
    gameId,
    answerIndex
  });
const saveName = ({ gameId, name, contact }) =>
  send("saveName", { gameId, name, contact });

export {
  getConfig,
  startGame,
  nextRound,
  endRound,
  getTopPlayers,
  saveName,
  isInTop
};
