const config = require("../config");

const MONGODB_CONNECTION_STRING = config.db.mongoConnectionLine;

module.exports = { MONGODB_CONNECTION_STRING };
