const { promisify } = require("util");
const { resolve } = require("path");
const fs = require("fs");
const { ANSWERS_IN_ROUND } = require("../constants/gameplay");

const PICTURES_FOLDER = "../../public/pictures";

const readdir = promisify(fs.readdir);

module.exports = async () => {
  // Get all files from the directory (relative to project root).
  const picturesFolderAbsolutePath = resolve(__dirname, PICTURES_FOLDER);
  const files = (await readdir(picturesFolderAbsolutePath)).filter(file =>
    file.endsWith(".jpg")
  );

  // TODO: save used pictures & exclude them from the next rounds.
  // TODO: switch to while cycle, should be better.
  // TODO: rotate the output array.
  // TODO: return correct answer
  const filesToReturn = [];
  for (let i = 0; i < ANSWERS_IN_ROUND; i += 1) {
    const index = Math.floor(Math.random() * files.length);
    const file = files[index].slice(0, -4);
    if (filesToReturn.includes(file)) {
      i -= 1;
    } else {
      filesToReturn.push(files[index].slice(0, -4));
    }
  }

  return filesToReturn;
};
