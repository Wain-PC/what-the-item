const express = require("express");
const Websocket = require("express-ws");

const fn = app => {
  Websocket(app);
  const router = express.Router();

  router.ws("/", ws => {
    ws.on("message", msg => {
      console.log(msg);
      ws.send(msg);
    });
  });

  return router;
};

module.exports = fn;
