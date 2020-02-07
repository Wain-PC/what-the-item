const http = require("http");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const db = require("./server/db");
const config = require("./server/config");
const api = require("./server/api");

/**
 * Listen on provided port, on all network interfaces.
 */

const app = express();
const server = http.createServer(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

db.connect();

server.listen(config.system.port);

module.exports = app;
