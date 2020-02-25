const base64ToBinary = dataURI => {
  const BASE64_MARKER = ";base64,";
  const extensionRegExp = /^data:image\/(\w+);/;

  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const regExpResult = extensionRegExp.exec(dataURI);
  const extension = regExpResult && regExpResult[1];
  const binary = Buffer.from(base64, "base64").toString("binary");
  return {
    binary,
    extension
  };
};

const binaryToBase64 = (blob, extension) => {
  const str = Buffer.from(blob).toString("base64");
  return `data:image/${extension};base64,${str}`;
};

const mapImage = ({ image, extension, title, incorrectTitles, active }) => ({
  image: binaryToBase64(image, extension),
  title,
  incorrectTitles,
  active
});

const mapImages = images => images.map(mapImage);

module.exports = { base64ToBinary, binaryToBase64, mapImage, mapImages };
