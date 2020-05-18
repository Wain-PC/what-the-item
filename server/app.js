const express = require("express");
const { join } = require("path");
const Websocket = require("express-ws");
const db = require("./db");
const config = require("./config");
const DataSources = require("./datasources");

const app = express();
Websocket(app);

const bootstrap = async () => {
  const { ws: wsPath, port } = config.system;
  await db.connect();
  const dataSources = new DataSources();
  app.listen(port, () => {
    app.use(express.static(join(__dirname, "static")));
    app.ws("/ws", ws => {
      ws.on("message", async msg => {
        try {
          const { id, path, data } = JSON.parse(msg);

          // If we have an appropriate DB path, execute it and return results.
          if (dataSources[path]) {
            try {
              const payload = await dataSources[path](data);
              const response = { id, payload };
              ws.send(JSON.stringify(response));
            } catch (dbErr) {
              console.error(dbErr);
              ws.send(JSON.stringify({ error: "Unable to process request" }));
            }
            // No appropriate DB path.
          } else {
            ws.send(JSON.stringify({ error: "Unknown path" }));
          }
        } catch (err) {
          console.error(err);
          ws.send(JSON.stringify({ error: "Cannot parse request" }));
        }
      });
    });
    console.log(`Websocket server listening on :${port}${wsPath}`);
  });
};

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});
