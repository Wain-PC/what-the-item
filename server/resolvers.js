// Provide resolver functions for your schema fields
const call = dbMethodName => (parent, args, { dataSources: { db } }) =>
  db[dbMethodName](args);

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const resolvers = {
  Query: new Proxy(
    {},
    {
      get(target, prop) {
        return call(`get${capitalize(prop)}`);
      }
    }
  ),
  Mutation: new Proxy(
    {},
    {
      get(target, prop) {
        return call(prop);
      }
    }
  )
};

module.exports = resolvers;
