const mongoose = require("mongoose");
const conf = require("./config");

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(conf.db.mongoConnectionLine, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on("error", reject);
    db.once("open", () => {
      console.log("DB connection successful");
      resolve();
    });
  });
};

module.exports = { connect };
