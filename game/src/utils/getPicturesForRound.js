const { ANSWERS_IN_ROUND } = require("../constants/gameplay");

const getPicturesForRound = (pictures, roundIndex) => {
  const start = ANSWERS_IN_ROUND * roundIndex;
  const end = start + ANSWERS_IN_ROUND;
  return pictures.slice(start, end);
};

export default getPicturesForRound;
