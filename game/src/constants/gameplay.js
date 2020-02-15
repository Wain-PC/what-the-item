import config from "../config";

const INITIAL_PLAYERS = config.gameplay.defaultPlayers;
const MIN_PLAYERS = config.gameplay.minPlayers;
const MAX_PLAYERS = config.gameplay.maxPlayers;
const CONTROLS_SCREEN_TIMER = config.timers.controls;
const GAME_SCREEN_TIMER = config.timers.round;
const ROUND_END_TIMER = config.timers.roundEnd;
const ROUNDS_IN_GAME = config.gameplay.roundsInGame;
const ANSWERS_IN_ROUND = config.gameplay.answersInRound;
const POINTS_PER_ROUND = config.gameplay.maxPointsPerRound;
const WINNER_NICKNAME_MAX_LETTERS = config.gameplay.winnerNickNameMaxLetters;
const NICKNAME_LETTER_TABLE = config.gameplay.winnerNickNameLetterTable;
const TOP_PLAYERS = config.gameplay.topPlayers;
const PLAYERS_COLORS = config.gameplay.playersColors;

export {
  INITIAL_PLAYERS,
  MIN_PLAYERS,
  MAX_PLAYERS,
  CONTROLS_SCREEN_TIMER,
  GAME_SCREEN_TIMER,
  ROUND_END_TIMER,
  ROUNDS_IN_GAME,
  ANSWERS_IN_ROUND,
  POINTS_PER_ROUND,
  WINNER_NICKNAME_MAX_LETTERS,
  NICKNAME_LETTER_TABLE,
  TOP_PLAYERS,
  PLAYERS_COLORS
};
