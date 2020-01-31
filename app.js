const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const proxy = require("http-proxy-middleware");
const ws = require("./ws");

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/admin", adminRouter);

ws();

app.use("/ws", proxy({ target: "http://localhost:3334", ws: true }));

module.exports = app;
