// TODO: Use real config

const config = {
  game: {
    system: {
      mode: "user",
      baseURL: "/",
      port: 3333,
      apiPath: "/game",
      staticDir: "static",
      imageCache: ".cache/images"
    },
    auth: {
      user: "",
      password: ""
    },
    db: {
      mongoConnectionLine: "mongodb://localhost/what-the-item"
    },
    timers: {
      controls: 3,
      round: 9,
      roundEnd: 3
    },
    gameplay: {
      roundsInGame: 4,
      answersInRound: 4,
      maxPointsPerRound: 100,
      winnerNickNameMaxLetters: 8,
      winnerNickNameLetterTable: "0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      contactMaxLetters: 20,
      contactLetterTable:
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-_@",
      topPlayers: 5
    }
  }
};

export default config.game;
