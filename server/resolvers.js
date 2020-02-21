const db = require("./db");

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    topPlayers: db.getPlayers,
    topGames: db.getGames,
    config: db.getConfig
  }
};

module.exports = resolvers;
