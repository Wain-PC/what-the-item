const express = require("express");
const {
  startGame,
  startRound,
  endRound,
  endGame,
  getTopPlayers,
  getTopPlayersWithCurrent,
  saveNickName
} = require("./db");

const getShuffledPictures = require("./utils/getPictures");

const router = express.Router();

router.post("/game/start", async (req, res) => {
  const { players } = req.body;
  const data = await startGame({ players });
  res.json(data);
});

router.post("/game/end", async (req, res) => {
  const { gameId, winner } = req.body;
  const data = await endGame({ gameId, winner });
  res.json(data);
});

router.post("/round/start", async (req, res) => {
  const { gameId, index, pictures, answerIndex } = req.body;
  const data = await startRound({ gameId, index, pictures, answerIndex });
  res.json(data);
});

router.post("/round/end", async (req, res) => {
  const {
    gameId,
    answered,
    answeredBy,
    timeLeft,
    pointsReceived,
    pictures
  } = req.body;
  const data = await endRound({
    gameId,
    answered,
    answeredBy,
    timeLeft,
    pointsReceived,
    pictures
  });
  res.json(data);
});

router.post("/players/top", async (req, res) => {
  const { gameId } = req.body;
  const data = gameId
    ? await getTopPlayersWithCurrent({ gameId })
    : await getTopPlayers();
  res.json(data);
});

router.post("/players/nickname", async (req, res) => {
  const { gameId, nickName } = req.body;
  const data = await saveNickName({ gameId, nickName });
  res.json(data);
});

router.post("/pictures/shuffled", async (req, res) => {
  const data = await getShuffledPictures();
  res.json(data);
});

module.exports = router;
