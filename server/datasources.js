/* eslint-disable class-methods-use-this */
const arrayShuffle = require("array-shuffle");
const models = require("./schema");

class DataSources {
  async getConfig() {
    let config = await models.Config.findOne();
    if (!config) {
      config = this.saveConfig();
    }

    return config;
  }

  async startGame() {
    const config = await this.getConfig();

    const {
      gameplay: { roundsInGame, answersInRound }
    } = config;
    // -1 because of the correct title
    const answersToGet = answersInRound - 1;

    // Get N random images
    const images = await this.getNRandomImages({ n: roundsInGame });
    // Get their ids
    const ids = images.map(({ _id }) => _id);
    // Find a total number of missing options.
    const numberOfMissingOptions = images.reduce(
      (acc, { incorrectTitles }) => acc + answersToGet - incorrectTitles.length,
      0
    );

    // Get some more random images' titles
    const randomOptions = (
      await models.Image.aggregate([
        { $match: { active: true, _id: { $nin: ids } } },
        { $sample: { size: numberOfMissingOptions } },
        { $project: { title: true } }
      ]).exec()
    ).map(({ title }) => title);

    const outputImages = images.map(image => {
      const { incorrectTitles } = image;
      const imagesToFill = answersToGet - incorrectTitles.length;
      return {
        ...image,
        incorrectTitles: incorrectTitles.concat(
          randomOptions.splice(0, imagesToFill)
        )
      };
    });

    const rounds = new Array(roundsInGame).fill(null).map((_, index) => {
      const image = outputImages[index];
      const answerIndex = Math.floor(Math.random() * answersInRound);
      const selection = arrayShuffle(image.incorrectTitles);
      selection.splice(answerIndex, 0, image.title);
      return {
        index,
        image,
        selection: selection.map(title => ({ title })),
        answerIndex
      };
    });

    const game = new models.Game({
      rounds,
      startedOn: new Date(),
      config,
      player: {}
    });
    await game.save();
    return game._id;
  }

  async nextRound({ gameId }) {
    const {
      timers: { round: secondsInRound }
    } = await this.getConfig();
    const game = await models.Game.findById(gameId);
    const nextRound = game.rounds.find(({ started }) => !started);
    if (nextRound) {
      nextRound.started = true;
      nextRound.startedOn = new Date();
      nextRound.timeLeft = secondsInRound;
      await game.save();
      // Get only required fields
      const { index, selection, image } = nextRound;

      return {
        index,
        selection: selection.map(({ title }) => ({ title })),
        image: { image: image.image, extension: image.extension }
      };
    }
    return null;
  }

  async endRound({ gameId, answerIndex }) {
    const game = await models.Game.findById(gameId);
    const finishedRound = game.rounds.find(
      ({ started, finished }) => started && !finished
    );
    finishedRound.finished = true;
    finishedRound.finishedOn = new Date();

    const timeLeft = Math.round(
      (finishedRound.finishedOn - finishedRound.startedOn) / 1000
    );
    const isCorrectAnswer = answerIndex === finishedRound.answerIndex;

    finishedRound.timeLeft = timeLeft;
    finishedRound.answered = isCorrectAnswer;

    let pointsReceived = 0;

    if (isCorrectAnswer && timeLeft) {
      pointsReceived = Math.round(
        game.config.gameplay.maxPointsPerRound *
          (game.config.timers.round - timeLeft)
      );
    }

    finishedRound.pointsReceived = pointsReceived;
    game.player.score += pointsReceived;

    await game.save();
    return {
      score: game.player.score,
      pointsReceived,
      isCorrectAnswer
    };
  }

  async endGame({ gameId }) {
    const game = await models.Game.findById(gameId);
    game.finished = true;
    game.finishedOn = new Date();
    await game.save();
    return {
      score: game.player.score
    };
  }

  async saveName({ gameId, name, contact }) {
    const game = await models.Game.findById(gameId);
    game.player.name = name;
    game.player.contact = contact;
    await game.save();
    return game;
  }

  async getTopPlayers() {
    const config = await this.getConfig();
    return this.getWinners({
      limit: config.gameplay.topPlayers,
      sort: { "player.score": -1 }
    });
  }

  // ---------------ADMINISTRATION METHODS---------------

  async getGames() {
    const games = await models.Game.find()
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

  getGame({ _id }) {
    return models.Game.findById({ _id });
  }

  async getWinners({ where = {}, limit = 100, sort = {} }) {
    const documentsModel = models.Game.find()
      .where({ finished: true, ...where })
      .sort({ ...sort, _id: 1 });

    const documents = await documentsModel.limit(limit).exec();
    const total = await documentsModel.countDocuments().exec();

    return {
      players: documents.map(doc => ({
        gameId: doc._id.toString(),
        _id: doc.player._id,
        name: doc.player.name,
        score: doc.player.score
      })),
      total
    };
  }

  async getAllPlayers() {
    const { players, total } = await this.getWinners({
      sort: { "player.score": -1 }
    });
    return {
      players,
      total
    };
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

  getImage({ _id }) {
    return models.Image.findById(_id);
  }

  async saveImage({ image }) {
    const { _id, incorrectTitles, ...restImage } = image;

    return models.Image.findOneAndUpdate(
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
  }

  async removeImage({ _id }) {
    await models.Image.findByIdAndDelete(_id);
    return this.getImages();
  }

  async getImages() {
    const images = await models.Image.find()
      .sort({ _id: -1 })
      .exec();

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

  // ---------------UTILS METHODS---------------

  getNRandomImages({ n }) {
    return models.Image.aggregate([
      { $match: { active: true } },
      { $sample: { size: n } }
    ]).exec();
  }
}

module.exports = DataSources;
