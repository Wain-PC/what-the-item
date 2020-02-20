const express = require("express");
const path = require("path");
const logger = require("morgan");
const db = require("./server/db");
const config = require("./server/config");
const api = require("./server/api");
const apollo = require("./server/apollo");

/**
 * Listen on provided port, on all network interfaces.
 */

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

const { graphql, port } = config.system;
apollo(app, graphql);

db.connect();

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
});

module.exports = app;
