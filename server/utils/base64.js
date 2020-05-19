const base64ToBinary = dataURI => {
  const BASE64_MARKER = ";base64,";

  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  return Buffer.from(base64, "base64");
};

const getExtension = dataURI => {
  const extensionRegExp = /^data:image\/(\w+);/;

  const regExpResult = extensionRegExp.exec(dataURI);
  return regExpResult && regExpResult[1] ? regExpResult[1] : null;
};

module.exports = {
  base64ToBinary,
  getExtension
};
