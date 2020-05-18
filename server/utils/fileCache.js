const { writeFileSync, existsSync } = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const config = require("../config");

const cache = new Map();

const getURL = (id, extension, buffer) => {
  if (cache.has(id)) {
    return cache.get(id);
  }

  const { baseURL, staticDir, imageCache } = config.system;
  const fileName = `${id.toString()}.${extension}`;
  const dirName = path.resolve(process.cwd(), staticDir, imageCache);
  const fullPath = path.resolve(dirName, fileName);
  const webPath = path.join(baseURL, imageCache, fileName);
  if (!existsSync(dirName)) {
    mkdirp.sync(dirName);
  }
  writeFileSync(fullPath, Buffer.from(buffer));
  cache.set(id, webPath);

  return webPath;
};

module.exports = getURL;