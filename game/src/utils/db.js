import request from "./request";

const startGame = ({ players }) => {
  return request("game/start", { players });
};

const endGame = async ({ gameId, winner }) => {
  return request("game/end", { gameId, winner });
};

const startRound = ({ gameId, index, pictures, answerIndex }) => {
  return request("round/start", { gameId, index, pictures, answerIndex });
};

const endRound = ({
  gameId,
  answered,
  answeredBy,
  timeLeft,
  pointsReceived,
  pictures
}) => {
  return request("round/end", {
    gameId,
    answered,
    answeredBy,
    timeLeft,
    pointsReceived,
    pictures
  });
};

const getTopPlayers = async ({ gameId } = {}) => {
  return request("players/top", { gameId });
};

const saveNickName = async ({ gameId, nickName }) => {
  return request("players/nickname", { gameId, nickName });
};

const getShuffledPictures = async () => {
  return request("pictures/shuffled");
};

export {
  startGame,
  startRound,
  endRound,
  endGame,
  getTopPlayers,
  saveNickName,
  getShuffledPictures
};
