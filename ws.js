const WebSocket = require("ws");
const Game = require("./server/game");

module.exports = () => {
  const wss = new WebSocket.Server({ port: "3334" });

  wss.on("connection", ws => {
    const game = new Game(ws.send.bind(ws));

    ws.on("message", message => {
      console.log("received: %s", message);
      try {
        const parsedMessage = JSON.parse(message);
        game.onMessage(parsedMessage);
      } catch (err) {
        // Incorrect message
        console.error("Received incorrect message (not parseable)", err);
      }
    });

    ws.on("close", (code, reason) => {
      console.log("connection closed", code, reason);
    });

    ws.on("error", error => {
      console.log("connection errored", error);
    });
  });
};
