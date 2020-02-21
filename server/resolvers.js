// Provide resolver functions for your schema fields
const call = dbMethodName => (parent, args, { dataSources: { db } }) =>
  db[dbMethodName](args);

const resolvers = {
  Query: {
    topPlayers: call("getPlayers"),
    topGames: call("getGames"),
    config: call("getConfig")
  },
  Mutation: {
    startGame: call("startGame"),
    endGame: call("endGame"),
    startRound: call("startRound"),
    endRound: call("endRound"),
    setNickName: call("setNickName")
  }
};
module.exports = resolvers;
