// Provide resolver functions for your schema fields
const call = (dbMethodName, ...params) => (
  parent,
  args,
  { dataSources: { db } }
) => db[dbMethodName](params);

const resolvers = {
  Query: {
    topPlayers: call("getPlayers"),
    topGames: call("getGames"),
    config: call("getConfig")
  }
};
module.exports = resolvers;
