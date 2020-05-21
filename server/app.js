const express = require("express");
const { join } = require("path");
const Websocket = require("express-ws");
const db = require("./db");
const config = require("./config");
const { dataSources, adminDataSources } = require("./datasources");

const app = express();
Websocket(app);

const onMessage = (ws, dataSource) => async msg => {
  try {
    const { id, path, data } = JSON.parse(msg);

    // If we have an appropriate DB path, execute it and return results.
    if (dataSource[path]) {
      try {
        const payload = await dataSource[path](data);
        const response = { id, payload };
        ws.send(JSON.stringify(response));
      } catch (dbErr) {
        console.error(dbErr);
        ws.send(JSON.stringify({ id, error: "Unable to process request" }));
      }
      // No appropriate DB path.
    } else {
      ws.send(JSON.stringify({ error: "Unknown path" }));
    }
  } catch (err) {
    console.error(err);
    ws.send(JSON.stringify({ error: "Cannot parse request" }));
  }
};

const bootstrap = async () => {
  const { mode, websocketPath, port } = config.system;
  await db.connect();
  app.listen(port, () => {
    app.use(express.static(join(__dirname, "static")));

    app.ws(websocketPath, ws => {
      switch (mode) {
        case "admin": {
          ws.on("message", onMessage(ws, adminDataSources));
          break;
        }
        case "user":
        default: {
          ws.on("message", onMessage(ws, dataSources));
        }
      }
    });

    console.log(`Mode:${mode}`);
    console.log(`WS server listening on :${port}${websocketPath}`);
  });
};

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});
