import { send } from "./request";

export const getConfig = () => send("getConfig");
export const getTranslation = () => send("getTranslation");
export const getTopPlayers = () => send("getTopPlayers");
export const isInTop = ({ gameId }) => send("isInTop", { gameId });
export const startGame = () => send("startGame");
export const nextRound = ({ gameId }) => send("nextRound", { gameId });
export const endRound = ({ gameId, answerIndex }) =>
  send("endRound", {
    gameId,
    answerIndex
  });
export const saveName = ({ gameId, name, contact }) =>
  send("saveName", { gameId, name, contact });
