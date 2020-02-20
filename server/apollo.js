const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const start = (app, path) => {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app, path });
};

module.exports = start;
