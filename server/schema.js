const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const schema = gql`
  type Query {
    hello: String
  }
`;

module.exports = schema;
