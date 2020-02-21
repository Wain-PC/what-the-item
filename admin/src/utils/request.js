import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "/graphql"
});

const query = async q => client.query({ query: q });
export default query;
