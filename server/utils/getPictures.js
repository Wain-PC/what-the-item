const { promisify } = require("util");
const { resolve } = require("path");
const fs = require("fs");

const PICTURES_FOLDER = "../../public/pictures";

const readdir = promisify(fs.readdir);

const shuffle = array => {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter -= 1;

    // And swap the last element with it
    const temp = array[counter];
    // eslint-disable-next-line no-param-reassign
    array[counter] = array[index];
    // eslint-disable-next-line no-param-reassign
    array[index] = temp;
  }

  return array;
};

const getShuffledPictures = async () => {
  const picturesFolderAbsolutePath = resolve(__dirname, PICTURES_FOLDER);
  return shuffle(
    (await readdir(picturesFolderAbsolutePath))
      .filter(file => file.endsWith(".jpg"))
      .map(file => file.slice(0, -4))
  );
};

module.exports = getShuffledPictures;
