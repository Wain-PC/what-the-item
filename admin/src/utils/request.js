import ApolloClient, { InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    }
  }
});

const query = async (q, variables) =>
  client.query({ query: q, variables, fetchPolicy: "network-only" });
const mutation = async (m, variables = {}) => {
  client.mutate({ mutation: m, variables });
};
export { query, mutation };
