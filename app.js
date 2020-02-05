const http = require("http");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const ws = require("./ws");
const db = require("./server/db");
const config = require("./server/config");

/**
 * Listen on provided port, on all network interfaces.
 */

const app = express();
const server = http.createServer(app);
server.listen(config.system.port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

db.connect();
ws({ server, path: "/ws" });

module.exports = app;
