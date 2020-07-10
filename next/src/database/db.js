import mongoose from "mongoose";
import config from "../utils/config";

// eslint-disable-next-line import/prefer-default-export
export const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.db.mongoConnectionLine, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on("error", reject);
    db.once("open", resolve);
  });
};

export const disconnect = () => mongoose.disconnect();
