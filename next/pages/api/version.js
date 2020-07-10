import config from "config";

export default (req, res) => {
  res.statusCode = 200;
  res.json({ version: config.server.apiVersion });
};
