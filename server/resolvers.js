// Provide resolver functions for your schema fields
const call = dbMethodName => (parent, args, { dataSources: { db } }) =>
  db[dbMethodName](args);

const resolvers = {
  Query: {
    players: call("getPlayers"),
    games: call("getGames"),
    config: call("getConfig"),
    images: call("getImages")
  },
  Mutation: {
    startGame: call("startGame"),
    endGame: call("endGame"),
    startRound: call("startRound"),
    endRound: call("endRound"),
    setNickName: call("setNickName"),
    saveConfig: call("saveConfig"),
    saveImage: call("saveImage")
  }
};
module.exports = resolvers;
