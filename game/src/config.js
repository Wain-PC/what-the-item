const config = {
  game: {
    timers: {
      controls: 3,
      round: 10,
      roundEnd: 3
    },
    gameplay: {
      defaultPlayers: 2,
      minPlayers: 1,
      maxPlayers: 2,
      roundsInGame: 10,
      answersInRound: 4,
      pointsMultiplier: 10,
      winnerNickNameMaxLetters: 10,
      winnerNickNameLetterTable: "0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      topPlayers: 5,
      playersColors: ["aquamarine", "coral", "brown", "teal"]
    }
  }
};

export default config.game;
