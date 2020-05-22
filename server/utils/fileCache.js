const { writeFileSync, existsSync } = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const config = require("../config");

const cache = new Map();

const getURL = (id, extension, buffer) => {
  const timestamp = new Date().getTime();
  if (cache.has(id)) {
    return `${cache.get(id)}?t=${timestamp}`;
  }

  const { baseURL, staticDir, imageCache } = config.system;
  const fileName = `${id.toString()}.${extension}`;
  const dirName = path.resolve(process.cwd(), staticDir, imageCache);
  const fullPath = path.resolve(dirName, fileName);
  const webPath = path.join(baseURL, imageCache, fileName);
  if (!existsSync(dirName)) {
    mkdirp.sync(dirName);
    cache.clear();
  }
  if (buffer) {
    writeFileSync(fullPath, Buffer.from(buffer));
    cache.set(id, webPath);
  }

  return webPath;
};

const flush = id => {
  if (id) {
    cache.delete(id);
  }
};

module.exports = { getURL, flush };
