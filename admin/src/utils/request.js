import ApolloClient, { InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    addTypename: false
  })
});

const query = async q => client.query({ query: q });
const mutation = async (m, variables = {}) => {
  client.mutate({ mutation: m, variables });
};
export { query, mutation };
