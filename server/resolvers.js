// Provide resolver functions for your schema fields
const call = dbMethodName => (parent, args, { dataSources: { db } }) =>
  db[dbMethodName](args);

const resolvers = {
  Query: {
    players: call("getPlayers"),
    games: call("getGames"),
    game: call("getGame"),
    config: call("getConfig"),
    images: call("getImages"),
    image: call("getImage"),
    nRandomImages: call("getNRandomImages")
  },
  Mutation: {
    startGame: call("startGame"),
    endGame: call("endGame"),
    startRound: call("startRound"),
    endRound: call("endRound"),
    setNickName: call("setNickName"),
    saveConfig: call("saveConfig"),
    saveImage: call("saveImage"),
    removeImage: call("removeImage")
  }
};
module.exports = resolvers;
