import mongoose from "mongoose";
import config from "../utils/config";
import { getURL } from "../utils/fileCache";
import { base64ToBinary } from "../utils/base64";

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
      set(v) {
        if (v && typeof v === "string") {
          return base64ToBinary(v);
        }
        return v;
      }
    },
    extension: {
      type: String,
      default: "jpeg"
    },
    title: String,
    incorrectTitles: [String],
    active: { type: Boolean, default: true }
  },
  {
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
  }
);

imageSchema.index({ title: 1 });

imageSchema.virtual("url").get(function getUrl() {
  return getURL(this._id.toString(), this.extension, this.image);
});

const selectionSchema = new Schema({
  title: String
});

const roundSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    index: Number,
    imageRef: { type: Schema.Types.ObjectId, ref: "Image", alias: "image" },
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
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
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
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
  }
);

gameSchema.index({ "player.score": -1 });
gameSchema.index({ "player.score": -1, _id: 1 });
gameSchema.index({ "player.score": -1, _id: 1, contact: 1 });

const models = {
  Config: mongoose.models.Config || mongoose.model("Config", configSchema),
  Image: mongoose.models.Image || mongoose.model("Image", imageSchema),
  Game: mongoose.models.Game || mongoose.model("Game", gameSchema)
};

export default models;
