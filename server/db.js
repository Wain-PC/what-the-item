const mongoose = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("./constants/db");
const {
  GAME_SCREEN_TIMER,
  ROUNDS_IN_GAME,
  TOP_PLAYERS
} = require("./constants/gameplay");

const { Schema } = mongoose;

const playerSchema = new Schema({
  index: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  name: { type: String, default: "Player" }
});

const roundSchema = new Schema({
  index: Number,
  pictures: [String],
  answered: { type: Boolean, default: false },
  answerIndex: Number,
  answeredBy: { type: Number, default: -1 },
  timeLeft: Number,
  pointsReceived: Number
});

const gameSchema = new Schema({
  finished: Boolean,
  players: [playerSchema],
  rounds: [roundSchema],
  timeToSolve: Number,
  roundsInGame: Number,
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
    timeToSolve: GAME_SCREEN_TIMER,
    roundsInGame: ROUNDS_IN_GAME
  });
  const { _id } = await game.save();
  return _id.toString();
};

const startRound = async ({ gameId, index, pictures, answerIndex }) => {
  const game = await Game.findOne({ _id: gameId });
  const round = { index, pictures, answerIndex };
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
  round.answered = answered;
  round.answeredBy = answeredBy;
  round.timeLeft = timeLeft;
  round.pointsReceived = pointsReceived;

  if (game.players[answeredBy]) {
    game.players[answeredBy].score += pointsReceived;
  }

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

const getTopPlayers = async () => {
  const documents = await Game.find()
    .select({ "winner.name": true, "winner.score": true })
    .where({ finished: true })
    .sort({ "winner.score": -1, _id: 1 })
    .limit(TOP_PLAYERS)
    .exec();

  return documents.map(doc => ({
    gameId: doc._id.toString(),
    name: doc.winner.name,
    score: doc.winner.score
  }));
};

const getTopPlayersWithCurrent = async ({ gameId }) => {
  // Get the last player that qualifies for topN board
  const topPlayers = await getTopPlayers();

  return topPlayers.map(player => {
    return {
      ...player,
      currentGame: player.gameId === gameId
    };
  });
};

module.exports = {
  connect,
  startGame,
  startRound,
  endRound,
  endGame,
  getTopPlayers,
  getTopPlayersWithCurrent
};
