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

const models = {
  Game: mongoose.model("Game", gameSchema),
  Config: mongoose.model("Config", configSchema)
};

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

module.exports = { connect, models };
