const { DataSource } = require("apollo-datasource");

class DBDataSource extends DataSource {
  constructor(db) {
    super();
    this.models = db.models;
    this.connect = db.connect;
  }

  async initialize() {
    await this.connect();
  }

  async startGame({ players }) {
    const playersToSave = players.map(({ index, name, score }) => ({
      index,
      name,
      score
    }));

    const config = await this.getConfig();

    const game = new this.models.Game({
      players: playersToSave,
      finished: false,
      startedOn: new Date(),
      config
    });
    await game.save();
    return game;
  }

  async startRound({ gameId, index, pictures, answerIndex }) {
    const game = await this.models.Game.findOne({ _id: gameId });
    const round = { index, pictures, answerIndex };
    game.rounds.push(round);
    await game.save();
    return game;
  }

  async endRound({
    gameId,
    round: { answered, answeredBy, timeLeft, pointsReceived, pictures }
  }) {
    const game = await this.models.Game.findOne({ _id: gameId });
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
    return game;
  }

  async endGame({ gameId, winner: { index, score, name } }) {
    const game = await this.models.Game.findOne({ _id: gameId });
    const winnerToSave = {
      index,
      score,
      name
    };
    game.finished = true;
    game.winner = winnerToSave;
    game.finishedOn = new Date();
    await game.save();
    return game;
  }

  async getTopPlayers({ limit, where = {} }) {
    const {
      gameplay: { topPlayers }
    } = await this.getConfig();

    const realLimit = limit || topPlayers;

    const documents = await this.models.Game.find()
      .select({ "winner.name": true, "winner.score": true })
      .where(where)
      .sort({ "winner.score": -1, _id: 1 })
      .limit(realLimit)
      .exec();

    return documents.map(doc => ({
      gameId: doc._id.toString(),
      name: doc.winner.name,
      score: doc.winner.score
    }));
  }

  async getTopPlayersWithCurrent({ gameId }) {
    // Get the last player that qualifies for topN board
    const topPlayers = await this.getTopPlayers();

    return topPlayers.map(player => {
      return {
        ...player,
        currentGame: player.gameId === gameId
      };
    });
  }

  async saveNickName({ gameId, nickName }) {
    const game = await this.models.Game.findOne({ _id: gameId });
    game.winner.name = nickName;
    await game.save();
    return game;
  }

  async getPlayers({ limit, page = 1 } = {}) {
    const players = await this.getTopPlayers(limit, page);
    const total = await this.models.Game.where({ finished: true })
      .countDocuments()
      .exec();
    return {
      players,
      total
    };
  }

  async getGames({ page = 1, limit = 100 } = {}) {
    const games = await this.models.Game.find()
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
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

  async setConfig(newConfig = {}) {
    this.models.Config.findOneAndUpdate({}, newConfig, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      fields: {
        gameplay: true,
        timers: true
      }
    });
  }

  getConfig() {
    return this.models.Config.findOne() || this.setConfig();
  }
}

module.exports = { DBDataSource };
