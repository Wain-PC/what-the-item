const express = require("express");
const path = require("path");
const Morgan = require("morgan");
const db = require("./db");
const config = require("./config");
const apollo = require("./apollo");

const app = express();

const logger = Morgan("dev");
app.use(logger);

const bootstrap = async () => {
  const { graphql, port } = config.system;
  apollo(graphql, app);
  await db.connect();
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${graphql}`);
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "public")));
  });
};

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});
