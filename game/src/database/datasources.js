/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
import arrayShuffle from "array-shuffle";
import config from "../utils/config";
import { generate } from "../utils/nameGenerator";

import models from "./schema";

class UtilsDataSources {
  async getGame(_id) {
    if (!_id) {
      throw new Error("No gameId provided or it is invalid");
    }

    const game = await models.Game.findById({ _id })
      .populate("rounds.imageRef")
      .exec();

    if (!game) {
      throw new Error("No gameId provided or it is invalid");
    }

    return game;
  }

  getNRandomImages(n, excludedIds = []) {
    const pipeline = [
      { $match: { active: true } },
      { $sample: { size: n } },
      { $project: { _id: true, title: true, incorrectTitles: true } }
    ];

    if (excludedIds.length) {
      pipeline[0].$match._id = { $nin: excludedIds };
    }

    return models.Image.aggregate(pipeline).exec();
  }

  async getWinners(limit = 100, admin = false) {
    const projection = admin
      ? {
          _id: false
        }
      : {
          _id: false,
          name: true,
          score: true
        };

    const docs = await models.Game.aggregate([
      { $match: { finished: true } },
      {
        $group: {
          _id: { name: "$player.name", contact: "$player.contact" },
          score: { $max: "$player.score" },
          gameIds: { $push: "$_id" }
        }
      },
      {
        $addFields: {
          contact: "$_id.contact",
          name: "$_id.name"
        }
      },
      { $project: projection },
      { $sort: { score: -1 } },
      { $limit: limit }
    ]);

    return {
      players: docs,
      total: docs.length
    };
  }
}

const utils = new UtilsDataSources();

class DataSources {
  async getConfig() {
    const { gameplay, timers } = config;
    return { gameplay, timers };
  }

  async startGame() {
    const {
      gameplay: { roundsInGame, answersInRound }
    } = config;
    // -1 because of the correct title
    const answersToGet = answersInRound - 1;

    // Get N random images
    const images = await utils.getNRandomImages(roundsInGame);
    // Get their ids
    const ids = images.map(({ _id }) => _id);
    // Find a total number of missing options.
    const numberOfMissingOptions = images.reduce(
      (acc, { incorrectTitles }) => acc + answersToGet - incorrectTitles.length,
      0
    );

    // Get some more random images' titles
    const randomOptions = (
      await utils.getNRandomImages(numberOfMissingOptions, ids)
    ).reduce((acc, { incorrectTitles }) => {
      return acc.concat(incorrectTitles);
    }, []);

    const rounds = images.map((image, index) => {
      const imagesToFill = answersToGet - image.incorrectTitles.length;
      const selection = arrayShuffle(
        image.incorrectTitles.concat(
          randomOptions.splice(0, imagesToFill),
          image.title
        )
      );
      const answerIndex = selection.indexOf(image.title);

      return {
        index,
        image: image._id, // Will use .populate() on that image later on
        selection: selection.map(title => ({ title })),
        answerIndex
      };
    });

    const name = generate();

    const game = new models.Game({
      rounds,
      startedOn: new Date(),
      config,
      player: {
        name,
        score: 0
      }
    });
    await game.save();
    return game._id;
  }

  async nextRound({ gameId }) {
    const {
      timers: { round: secondsInRound }
    } = config;

    const game = await utils.getGame(gameId);

    if (game.finished) {
      return null;
    }

    const nextRound = game.rounds.find(({ started }) => !started);
    if (nextRound && nextRound.image) {
      nextRound.started = true;
      nextRound.startedOn = new Date();
      nextRound.timeLeft = secondsInRound;

      await game.save();
      // Get only required fields
      const { index, selection, image } = nextRound;

      return {
        index,
        selection,
        image: {
          image: image && image.url
        }
      };
    }
    game.finished = true;
    game.finishedOn = new Date();

    await game.save();
    return null;
  }

  async endRound({ gameId, answerIndex }) {
    const game = await utils.getGame(gameId);

    const finishedRound = game.rounds.find(
      ({ started, finished }) => started && !finished
    );

    if (!finishedRound) {
      throw new Error("No valid round found");
    }

    finishedRound.finished = true;
    finishedRound.finishedOn = new Date();
    finishedRound.userAnswered = answerIndex;

    const timeLeftExact =
      game.config.timers.round -
      (finishedRound.finishedOn - finishedRound.startedOn) / 1000;

    const timeLeft = Math.round(timeLeftExact);
    const isCorrectAnswer = answerIndex === finishedRound.answerIndex;

    finishedRound.timeLeft = timeLeft;
    finishedRound.answered = isCorrectAnswer;

    let pointsReceived = 0;

    if (isCorrectAnswer && timeLeft) {
      pointsReceived = Math.max(
        Math.round(
          (game.config.gameplay.maxPointsPerRound * timeLeftExact) /
            game.config.timers.round
        ),
        0
      );
    }

    finishedRound.pointsReceived = pointsReceived;
    game.player.score += pointsReceived;

    await game.save();
    return {
      score: game.player.score,
      pointsReceived,
      isCorrectAnswer,
      answerIndex
    };
  }

  async isInTop({ gameId }) {
    const { topPlayers } = config.gameplay;
    const game = await utils.getGame(gameId);
    const { players } = await utils.getWinners(topPlayers, true);

    const response = {
      topPlayers,
      isInTop: false,
      place: 0
    };

    // No one in top, auto first place
    if (!players.length) {
      response.isInTop = true;
      response.place = 1;
    } else {
      players.some((player, index) => {
        if (
          game.player.score === player.score &&
          game.player.name === player.name
        ) {
          response.isInTop = true;
          response.place = index + 1;
          return true;
        }
        return false;
      });
    }

    return response;
  }

  async saveName({ gameId, name, contact }) {
    const game = await utils.getGame(gameId);

    if (name && name.trim()) {
      game.player.name = name.trim().toLocaleLowerCase();
    }

    if (contact && contact.trim()) {
      game.player.contact = contact.trim().toLocaleLowerCase();
    }

    await game.save();

    return game._id;
  }

  async getTopPlayers() {
    const { topPlayers } = config.gameplay;

    return utils.getWinners(topPlayers, false);
  }
}

export default new DataSources();
