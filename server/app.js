const express = require("express");
const path = require("path");
const Morgan = require("morgan");
const db = require("./db");
const websocketRouter = require("./ws");
const config = require("./config");

const app = express();

const logger = Morgan("dev");
app.use(logger);

const bootstrap = async () => {
  const { ws, port } = config.system;
  await db.connect();
  app.listen(port, () => {
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "public")));
    // Websocket server for the game.
    app.use(ws, websocketRouter(app));
  });
};

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});
