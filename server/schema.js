const mongoose = require("mongoose");
const config = require("./config");
const { binaryToBase64, base64ToBinary } = require("./utils/base64");

const { Schema } = mongoose;

const playerSchema = new Schema({
  score: { type: Number, default: 0 },
  name: { type: String, default: "" },
  contact: { type: String, default: "" }
});

const imageSchema = new Schema({
  image: {
    type: Buffer,
    get(value) {
      return binaryToBase64(value, this.extension);
    },
    set(v) {
      // Need to check if `this` is a document, because in mongoose 5
      // setters will also run on queries, in which case `this` will be a
      // mongoose query object.
      if (v != null && typeof v === "string") {
        const { binary, extension } = base64ToBinary(v);
        this.extension = extension;
        return binary;
      }
      return v;
    }
  },
  extension: { type: String, default: "jpeg" }, // TODO: remove this hack ASAP
  title: String,
  incorrectTitles: [String],
  active: { type: Boolean, default: true }
});

const selectionSchema = new Schema({
  title: String
});

const roundSchema = new Schema({
  index: Number,
  image: imageSchema,
  selection: [selectionSchema],
  started: { type: Boolean, default: false },
  finished: { type: Boolean, default: false },
  startedOn: Date,
  finishedOn: Date,
  answered: { type: Boolean, default: false },
  answerIndex: Number,
  timeLeft: Number,
  pointsReceived: Number
});

const timersConfigSchema = new Schema({
  controls: { type: Number, default: config.timers.controls },
  round: { type: Number, default: config.timers.round },
  roundEnd: { type: Number, default: config.timers.roundEnd }
});

const gameplayConfigSchema = new Schema({
  roundsInGame: { type: Number, default: config.gameplay.roundsInGame },
  answersInRound: {
    type: Number,
    default: config.gameplay.answersInRound
  },
  maxPointsPerRound: {
    type: Number,
    default: config.gameplay.maxPointsPerRound
  },
  winnerNickNameMaxLetters: {
    type: Number,
    default: config.gameplay.winnerNickNameMaxLetters
  },
  winnerNickNameLetterTable: {
    type: String,
    default: config.gameplay.winnerNickNameLetterTable
  },
  contactMaxLetters: {
    type: Number,
    default: config.gameplay.contactMaxLetters
  },
  contactLetterTable: {
    type: String,
    default: config.gameplay.contactLetterTable
  },
  topPlayers: { type: Number, default: config.gameplay.topPlayers }
});

const configSchema = new Schema({
  timers: timersConfigSchema,
  gameplay: gameplayConfigSchema
});

const gameSchema = new Schema({
  finished: { type: Boolean, default: false },
  player: playerSchema,
  rounds: [roundSchema],
  startedOn: Date,
  finishedOn: Date,
  config: configSchema
});

const models = {
  Game: mongoose.model("Game", gameSchema),
  Config: mongoose.model("Config", configSchema),
  Image: mongoose.model("Image", imageSchema)
};

module.exports = models;
