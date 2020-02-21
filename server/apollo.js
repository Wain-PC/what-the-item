const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { DBDataSource } = require("./datasources");
const db = require("./db");

const start = (path, app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      db: new DBDataSource(db)
    })
  });
  server.applyMiddleware({ app, path });
};

module.exports = start;
