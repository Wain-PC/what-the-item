export default {
  language: process.env.LANGUAGE,
  db: {
    mongoConnectionLine: process.env.MONGODB_URI
  },
  timers: {
    controls: Number(process.env.TIMERS_CONTROLS),
    round: Number(process.env.TIMERS_ROUND),
    roundEnd: Number(process.env.TIMERS_ROUND_END)
  },
  gameplay: {
    roundsInGame: Number(process.env.ROUNDS_IN_GAME),
    answersInRound: Number(process.env.ANSWERS_IN_ROUND),
    maxPointsPerRound: Number(process.env.MAX_POINTS_PER_ROUND),
    winnerNickNameMaxLetters: Number(process.env.WINNER_NICKNAME_MAX_LETTERS),
    winnerNickNameLetterTable: process.env.WINNER_NICKNAME_LETTER_TABLE,
    contactMaxLetters: Number(process.env.CONTACT_MAX_LETTERS),
    contactLetterTable: process.env.CONTACT_LETTER_TABLE,
    topPlayers: Number(process.env.TOP_PLAYERS)
  }
};
