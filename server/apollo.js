const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const start = (path, app) => {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app, path });
};

module.exports = start;
