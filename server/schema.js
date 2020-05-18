const mongoose = require("mongoose");
const config = require("./config");
const getImageUrl = require("./utils/fileCache");
const { base64ToBinary } = require("./utils/base64");

const { Schema } = mongoose;

const playerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  score: { type: Number, default: 0 },
  name: { type: String, default: "" },
  contact: { type: String, default: "" }
});

const imageSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    image: {
      type: Buffer,
      get(value) {
        const id = this._id.toString();
        const { extension } = this;
        return getImageUrl(id, extension, value);
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
    extension: String,
    title: String,
    incorrectTitles: [String],
    active: { type: Boolean, default: true }
  },
  {
    toObject: { getters: true },
    toJSON: { getters: true }
  }
);

const selectionSchema = new Schema({
  title: String
});

const roundSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    index: Number,
    image: imageSchema,
    selection: [selectionSchema],
    started: { type: Boolean, default: false },
    finished: { type: Boolean, default: false },
    startedOn: Date,
    finishedOn: Date,
    answered: { type: Boolean, default: false },
    answerIndex: Number, // Correct answer for a round
    userAnswered: Number, // Answer that the user has selected
    timeLeft: Number,
    pointsReceived: Number
  },
  {
    toObject: { getters: true },
    toJSON: { getters: true }
  }
);

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

const gameSchema = new Schema(
  {
    finished: { type: Boolean, default: false },
    player: playerSchema,
    rounds: [roundSchema],
    startedOn: Date,
    finishedOn: Date,
    config: configSchema
  },
  {
    toObject: { getters: true },
    toJSON: { getters: true }
  }
);

const models = {
  Game: mongoose.model("Game", gameSchema),
  Config: mongoose.model("Config", configSchema),
  Image: mongoose.model("Image", imageSchema)
};

module.exports = models;
