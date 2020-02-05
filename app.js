const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const proxy = require("http-proxy-middleware");
const ws = require("./ws");
const db = require("./server/db");

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

db.connect();
ws();

app.use(
  "/ws",
  proxy({
    target: {
      port: 3334
    },
    ws: true
  })
);

module.exports = app;
