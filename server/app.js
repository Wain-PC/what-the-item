const express = require("express");
const { join } = require("path");
const basicAuth = require("express-basic-auth");
const db = require("./db");
const config = require("./config");
const dataSources = require("./datasources");

const onMessage = async (dataSource, path, data) => {
  try {
    // If we have an appropriate DB path, execute it and return results.
    if (dataSource && dataSource[path]) {
      try {
        const payload = await dataSource[path](data);
        return { payload };
      } catch (dbErr) {
        console.error(dbErr);
        return { error: "Unable to process request" };
      }
      // No appropriate DB path.
    } else {
      return { error: "Unknown path" };
    }
  } catch (err) {
    console.error(err);
    return { error: "Cannot parse request" };
  }
};

const bootstrap = async () => {
  const { mode, apiPath, port, staticDir } = config.system;
  const { user, password } = config.auth;
  const app = express();
  app.use(express.json());
  await db.connect();
  app.listen(port, () => {
    if (user) {
      app.use(
        basicAuth({
          challenge: true,
          users: { [user]: password }
        })
      );
    }
    const dataSource = dataSources[mode];

    app.post(`${apiPath}/:path`, async (req, res) => {
      const response = await onMessage(dataSource, req.params.path, req.body);
      res.json(response);
    });

    app.use(express.static(join(__dirname, staticDir)));

    app.get("*", (req, res) =>
      res.sendFile(join(__dirname, staticDir, "index.html"))
    );

    console.log(`Mode:${mode}`);
    console.log(`WS server listening on :${port}${apiPath}`);
  });
};

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});
