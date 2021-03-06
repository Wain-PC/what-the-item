const { writeFileSync, existsSync } = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const config = require("../config");

const cache = new Map();

const getURL = (id, extension, buffer) => {
  const timestamp = new Date().getTime();
  if (!cache.has(id)) {
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
  }

  const url = cache.get(id);

  if (url) {
    return `${url}?t=${timestamp}`;
  }

  return undefined;
};

const flush = id => {
  if (id) {
    cache.delete(id);
  }
};

module.exports = { getURL, flush };
