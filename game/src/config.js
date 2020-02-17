const config = {
  game: {
    timers: {
      controls: 9,
      round: 10,
      roundEnd: 3
    },
    gameplay: {
      defaultPlayers: 2,
      minPlayers: 1,
      maxPlayers: 2,
      roundsInGame: 10,
      answersInRound: 4,
      maxPointsPerRound: 100,
      winnerNickNameMaxLetters: 8,
      winnerNickNameLetterTable: "0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      topPlayers: 5
    }
  }
};

export default config.game;
