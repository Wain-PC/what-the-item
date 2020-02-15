const config = require("../config");

module.exports = {
  INITIAL_PLAYERS: config.gameplay.defaultPlayers,
  MIN_PLAYERS: config.gameplay.minPlayers,
  MAX_PLAYERS: config.gameplay.maxPlayers,
  CONTROLS_SCREEN_TIMER: config.timers.controls,
  GAME_SCREEN_TIMER: config.timers.round,
  ROUND_END_TIMER: config.timers.roundEnd,
  ROUNDS_IN_GAME: config.gameplay.roundsInGame,
  ANSWERS_IN_ROUND: config.gameplay.answersInRound,
  POINTS_PER_ROUND: config.gameplay.maxPointsPerRound,
  WINNER_NICKNAME_MAX_LETTERS: config.gameplay.winnerNickNameMaxLetters,
  NICKNAME_LETTER_TABLE: config.gameplay.winnerNickNameLetterTable,
  TOP_PLAYERS: config.gameplay.topPlayers
};
