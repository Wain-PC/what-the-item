/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
const arrayShuffle = require("array-shuffle");
const models = require("./schema");
const { flush } = require("./utils/fileCache");

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

  async getConfig() {
    let config = await models.Config.findOne();
    if (!config) {
      config = this.saveConfig();
    }

    return config;
  }

  async saveConfig(newConfig = {}) {
    const { config = {} } = newConfig;
    return models.Config.findOneAndUpdate({}, config, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      useFindAndModify: true,
      fields: {
        gameplay: true,
        timers: true
      }
    });
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

  async getWinners(limit = 100, includeGameIds = false) {
    const docs = await models.Game.aggregate([
      { $match: { finished: true } },
      {
        $group: {
          _id: { name: "$player.name", contact: "$player.contact" },
          score: { $max: "$player.score" },
          gameIds: { $addToSet: "$_id" }
        }
      },
      {
        $addFields: {
          name: "$_id.name",
          gameIds: includeGameIds ? "$gameIds" : 0
        }
      },
      {
        $project: {
          _id: 0
        }
      },
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
    const { gameplay, timers } = await utils.getConfig();
    return { gameplay, timers };
  }

  async startGame() {
    const config = await utils.getConfig();

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

    const game = new models.Game({
      rounds,
      startedOn: new Date(),
      config,
      player: {
        name: "Player",
        score: 0
      }
    });
    await game.save();
    return game._id;
  }

  async nextRound({ gameId }) {
    const {
      timers: { round: secondsInRound }
    } = await utils.getConfig();

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
      pointsReceived = Math.round(
        (game.config.gameplay.maxPointsPerRound * timeLeftExact) /
          game.config.timers.round
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
    const config = await utils.getConfig();
    const { topPlayers } = config.gameplay;
    const game = await utils.getGame(gameId);
    const { players } = await utils.getWinners(topPlayers, true);

    const response = {
      topPlayers,
      isInTop: false,
      place: 0
    };

    players.some((player, index) => {
      if (game.player.score > player.score) {
        response.isInTop = true;
        response.place = index + 1;
        return true;
      }
      return false;
    });

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
    const config = await utils.getConfig();
    const { topPlayers } = config.gameplay;

    return utils.getWinners(topPlayers, false);
  }
}

class AdminDataSources {
  getConfig(gameId) {
    return utils.getConfig(gameId);
  }

  saveConfig({ config }) {
    return utils.saveConfig(config);
  }

  async getGames() {
    const games = await models.Game.find({ finished: true })
      .select("name started finished startedOn finishedOn player")
      .sort({ _id: -1 })
      .exec();

    const total = await models.Game.countDocuments().exec();
    const finished = await models.Game.where({ finished: true })
      .countDocuments()
      .exec();

    return {
      games,
      total,
      finished
    };
  }

  async getGame({ id }) {
    const game = (await utils.getGame(id)).toObject();

    game.rounds.forEach(round => {
      if (round.image) {
        // eslint-disable-next-line no-param-reassign
        delete round.image.image;
        // eslint-disable-next-line no-param-reassign
        delete round.imageRef;
      }
    });

    return game;
  }

  getAllPlayers() {
    return utils.getWinners(100, true);
  }

  async getImage({ id }) {
    if (!id) {
      throw new Error("No image ID provided or it is invalid");
    }

    const imageDocument = await models.Image.findById(id);

    if (!imageDocument) {
      throw new Error("No image ID provided or it is invalid");
    }

    const image = imageDocument.toObject();
    delete image.image;
    return image;
  }

  async saveImage({ image }) {
    const { _id, incorrectTitles, ...restImage } = image;

    // Invalidate image in cache if editing image.
    flush(_id);

    const imageDocument = await models.Image.findOneAndUpdate(
      _id ? { _id } : { title: "@@@@@@@@@@@@@@@@@@@@@@" },
      {
        ...restImage,
        incorrectTitles: incorrectTitles.filter(v => v)
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        useFindAndModify: true
      }
    );

    const savedImage = imageDocument.toObject();
    delete savedImage.image;
    return savedImage;
  }

  async removeImage({ id }) {
    await models.Image.findByIdAndDelete(id);
    return id;
  }

  async getImages() {
    const imagesDocuments = await models.Image.find()
      .sort({ _id: -1 })
      .exec();

    const images = imagesDocuments.map(imageDocument => {
      const image = imageDocument.toObject();
      delete image.image;
      return image;
    });

    const total = await models.Image.countDocuments().exec();
    const active = await models.Image.where({ active: true })
      .countDocuments()
      .exec();

    return {
      images,
      total,
      active
    };
  }
}

const user = new DataSources();
const admin = new AdminDataSources();

module.exports = { user, admin };
