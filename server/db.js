const mongoose = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("./constants/db");
const { GAME_SCREEN_TIMER } = require("./constants/gameplay");

const { Schema } = mongoose;

const playerSchema = new Schema({
  index: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  name: { type: String, default: "Player" }
});

const roundSchema = new Schema({
  index: Number,
  pictures: [String],
  answer: String,
  answered: { type: Boolean, default: false },
  answerIndex: Number,
  answeredBy: { type: Number, default: -1 },
  timeLeft: Number,
  pointsReceived: Number
});

const gameSchema = new Schema({
  finished: Boolean,
  players: { type: [playerSchema], default: [] },
  round: { type: [roundSchema], default: [] },
  timeToSolve: Number,
  winner: playerSchema
});

const Game = mongoose.model("Game", gameSchema);

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGODB_CONNECTION_STRING);
    const db = mongoose.connection;
    db.on("error", reject);
    db.once("open", () => {
      console.log("DB connection sucessful");
      resolve();
    });
  });
};

const startGame = async ({ players }) => {
  const playersToSave = players.map(({ index, name, score }) => ({
    index,
    name,
    score
  }));

  const game = new Game({
    players: playersToSave,
    finished: false,
    timeToSolve: GAME_SCREEN_TIMER
  });
  const { _id } = await game.save();
  return _id;
};

const startRound = async ({ gameId, index, pictures, answer, answerIndex }) => {
  const game = await Game.findOne({ _id: gameId });
  const round = { index, pictures, answer, answerIndex };
  game.rounds.push(round);
  await game.save();
};

const endRound = async ({
  gameId,
  answered,
  answeredBy,
  timeLeft,
  pointsReceived
}) => {
  const game = await Game.findOne({ _id: gameId });
  const lastRoundIndex = game.rounds.length - 1;
  const round = game.rounds[lastRoundIndex];
  const updatedRound = {
    ...round,
    answered,
    answeredBy,
    timeLeft,
    pointsReceived
  };
  game.rounds.splice(game.rounds.length - 1, 1, updatedRound);
  await game.save();
};

const endGame = async ({ gameId, winner: { index, score, name } }) => {
  const game = await Game.findOne({ _id: gameId });
  const winnerToSave = {
    index,
    score,
    name
  };
  game.finished = true;
  game.winner = winnerToSave;
  await game.save();
};

module.exports = { connect, startGame, startRound, endRound, endGame };
