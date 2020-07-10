import {
  uniqueNamesGenerator,
  adjectives,
  names
} from "unique-names-generator";

// eslint-disable-next-line import/prefer-default-export
export const generate = (opts = {}) => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, names],
    length: 2,
    separator: " ",
    style: "capital",
    ...opts
  });
};
