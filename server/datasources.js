const { DataSource } = require("apollo-datasource");
const { mapGame } = require("./utils/base64");

class DBDataSource extends DataSource {
  constructor(db) {
    super();
    this.models = db.models;
    this.connect = db.connect;
  }

  initialize() {
    return this.connect();
  }

  async startGame({ players }) {
    const playersToSave = players.map(({ index, name, score }) => ({
      index,
      name,
      score
    }));

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
      await this.models.Image.aggregate([
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

    const rounds = new Array(roundsInGame).fill(null).map((_, index) => ({
      index,
      image: outputImages[index],
      selection: Array(answersInRound).fill({}),
      answerIndex: Math.floor(Math.random(answersInRound))
    }));

    const game = new this.models.Game({
      players: playersToSave,
      rounds,
      finished: false,
      startedOn: new Date(),
      config
    });
    await game.save();
    return game;
  }

  async startRound({ gameId, index, pictures, answerIndex }) {
    const game = await this.models.Game.findById(gameId);
    const round = { index, pictures, answerIndex };
    game.rounds.push(round);
    await game.save();
    return mapGame(game);
  }

  async endRound({
    gameId,
    round: { answered, answeredBy, timeLeft, pointsReceived, pictures }
  }) {
    const game = await this.models.Game.findById(gameId);
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
    return mapGame(game);
  }

  async endGame({ gameId, winner: { index, score, name } }) {
    const game = await this.models.Game.findById(gameId);
    const winnerToSave = {
      index,
      score,
      name
    };
    game.finished = true;
    game.winner = winnerToSave;
    game.finishedOn = new Date();
    await game.save();
    return mapGame(game);
  }

  async saveNickName({ gameId, nickName }) {
    const game = await this.models.Game.findById(gameId);
    game.winner.name = nickName;
    await game.save();
    return mapGame(game);
  }

  // ---------------ADMINISTRATION METHODS---------------

  async getGames() {
    const games = await this.models.Game.find()
      .sort({ _id: -1 })
      .exec();

    const total = await this.models.Game.countDocuments().exec();
    const finished = await this.models.Game.where({ finished: true })
      .countDocuments()
      .exec();

    return {
      games,
      total,
      finished
    };
  }

  getGame({ _id }) {
    return this.models.Game.findById({ _id });
  }

  async getWinners({ where = {}, limit = 100, sort = {} }) {
    const documentsModel = this.models.Game.find()
      .where({ finished: true, winner: { $ne: null }, ...where })
      .sort({ ...sort, _id: 1 });

    const documents = await documentsModel.limit(limit).exec();
    const total = await documentsModel.countDocuments().exec();

    return {
      players: documents.map(doc => ({
        gameId: doc._id.toString(),
        _id: doc.winner._id,
        name: doc.winner.name,
        score: doc.winner.score
      })),
      total
    };
  }

  async getWinnersWithCurrentGameId({ gameId }) {
    const {
      gameplay: { topPlayers }
    } = await this.getConfig();

    const { players } = await this.getWinners({
      limit: topPlayers,
      sort: { "winner.score": -1 }
    });

    return players.map(player => {
      return {
        ...player,
        currentGame: player.gameId === gameId
      };
    });
  }

  async getPlayers({ from = "" } = {}) {
    const where = from
      ? {
          _id: { $gt: from }
        }
      : {};

    const { players, total } = await this.getWinners({ where, limit: 10 });
    return {
      players,
      total
    };
  }

  async saveConfig(newConfig = {}) {
    const { config = {} } = newConfig;
    return this.models.Config.findOneAndUpdate({}, config, {
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

  getConfig() {
    return this.models.Config.findOne() || this.saveConfig();
  }

  getImage({ _id }) {
    return this.models.Image.findById(_id);
  }

  async saveImage({ image }) {
    const { _id, ...restImage } = image;

    return this.models.Image.findOneAndUpdate(
      _id ? { _id } : { title: "@@@@@@@@@@@@@@@@@@@@@@" },
      restImage,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        useFindAndModify: true
      }
    );
  }

  async removeImage({ _id }) {
    await this.models.Image.findByIdAndDelete(_id);
    return this.getImages();
  }

  async getImages() {
    const images = await this.models.Image.find()
      .sort({ _id: -1 })
      .exec();

    const total = await this.models.Image.countDocuments().exec();
    const active = await this.models.Image.where({ active: true })
      .countDocuments()
      .exec();

    return {
      images,
      total,
      active
    };
  }

  getNRandomImages({ n }) {
    return this.models.Image.aggregate([
      { $match: { active: true } },
      { $sample: { size: n } }
    ]).exec();
  }
}

module.exports = { DBDataSource };
