const express = require("express");
const path = require("path");
const logger = require("morgan");
const db = require("./server/db");
const config = require("./server/config");
const apollo = require("./server/apollo");

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const { graphql, port } = config.system;
apollo(graphql, app);

db.connect();

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${graphql}`);
});

module.exports = app;
