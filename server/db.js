const mongoose = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("./constants/db");
const defaultConfig = require("./config");

const { Schema } = mongoose;

const playerSchema = new Schema({
  index: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  name: { type: String, default: "Player" }
});

const pictureSchema = new Schema({
  picture: String,
  selected: Boolean,
  selectedBy: { type: Number, default: -1 }
});

const roundSchema = new Schema({
  index: Number,
  pictures: [pictureSchema],
  answered: { type: Boolean, default: false },
  answerIndex: Number,
  answeredBy: { type: Number, default: -1 },
  timeLeft: Number,
  pointsReceived: Number
});

const timersConfigSchema = new Schema({
  controls: { type: Number, default: defaultConfig.timers.controls },
  round: { type: Number, default: defaultConfig.timers.round },
  roundEnd: { type: Number, default: defaultConfig.timers.roundEnd }
});

const gameplayConfigSchema = new Schema({
  defaultPlayers: {
    type: Number,
    default: defaultConfig.gameplay.defaultPlayers
  },
  minPlayers: { type: Number, default: defaultConfig.gameplay.minPlayers },
  maxPlayers: { type: Number, default: defaultConfig.gameplay.maxPlayers },
  roundsInGame: { type: Number, default: defaultConfig.gameplay.roundsInGame },
  answersInRound: {
    type: Number,
    default: defaultConfig.gameplay.answersInRound
  },
  maxPointsPerRound: {
    type: Number,
    default: defaultConfig.gameplay.maxPointsPerRound
  },
  winnerNickNameMaxLetters: {
    type: Number,
    default: defaultConfig.gameplay.winnerNickNameMaxLetters
  },
  winnerNickNameLetterTable: {
    type: String,
    default: defaultConfig.gameplay.winnerNickNameLetterTable
  },
  topPlayers: { type: Number, default: defaultConfig.gameplay.topPlayers }
});

const configSchema = new Schema({
  timers: timersConfigSchema,
  gameplay: gameplayConfigSchema
});

const gameSchema = new Schema({
  finished: Boolean,
  players: [playerSchema],
  rounds: [roundSchema],
  roundsInGame: Number,
  winner: playerSchema,
  startedOn: Date,
  finishedOn: Date,
  config: configSchema
});

const Game = mongoose.model("Game", gameSchema);
const Config = mongoose.model("Config", configSchema);

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true });
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

  // eslint-disable-next-line no-use-before-define
  const config = await getConfig();

  const game = new Game({
    players: playersToSave,
    finished: false,
    startedOn: new Date(),
    config
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
  pointsReceived,
  pictures
}) => {
  const game = await Game.findOne({ _id: gameId });
  const [round] = game.rounds.slice(-1);
  round.answered = answered;
  round.answeredBy = answeredBy;
  round.timeLeft = timeLeft;
  round.pointsReceived = pointsReceived;
  round.pictures = pictures;

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
  game.finishedOn = new Date();
  await game.save();
};

const getTopPlayers = async (limit, page = 1) => {
  const {
    gameplay: { topPlayers }
  } = await getConfig(); // eslint-disable-line no-use-before-define

  const realLimit = limit || topPlayers;

  const documents = await Game.find()
    .select({ "winner.name": true, "winner.score": true })
    .where({ finished: true })
    .sort({ "winner.score": -1, _id: 1 })
    .skip((page - 1) * realLimit)
    .limit(realLimit)
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

const saveNickName = async ({ gameId, nickName }) => {
  const game = await Game.findOne({ _id: gameId });
  game.winner.name = nickName;
  await game.save();
};

const getPlayers = async ({ limit, page = 1 } = {}) => {
  const players = await getTopPlayers(limit, page);
  const total = await Game.where({ finished: true })
    .count()
    .exec();
  return {
    players,
    total
  };
};

const getGames = async ({ page = 1, limit = 100 } = {}) => {
  const games = await Game.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  const total = await Game.count().exec();
  const finished = await Game.where({ finished: true })
    .count()
    .exec();

  return {
    games,
    total,
    finished
  };
};

const setConfig = async (newConfig = {}) =>
  Config.findOneAndUpdate({}, newConfig, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    fields: {
      gameplay: true,
      timers: true
    }
  });

const getConfig = () => Config.findOne() || setConfig();

module.exports = {
  connect,
  startGame,
  startRound,
  endRound,
  endGame,
  getPlayers,
  getTopPlayers,
  getTopPlayersWithCurrent,
  saveNickName,
  getGames,
  getConfig,
  setConfig
};
