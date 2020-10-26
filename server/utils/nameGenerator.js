const {
  uniqueNamesGenerator,
  adjectives,
  names
} = require("unique-names-generator");

const generate = (opts = {}) => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, names],
    length: 2,
    separator: " ",
    style: "capital",
    ...opts
  });
};
module.exports = generate;
