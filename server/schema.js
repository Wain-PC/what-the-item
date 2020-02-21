const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const schema = gql`
  scalar Date

  type Player {
    gameId: String
    index: Int!
    score: Int!
    name: String!
  }

  type Picture {
    picture: String!
    selected: Boolean!
    selectedBy: Int!
  }

  type Round {
    index: Int!
    pictures: [Picture]!
    answered: Boolean!
    answerIndex: Int!
    answeredBy: Boolean!
    timeLeft: Int!
    pointsReceived: Int!
  }

  type ConfigTimers {
    controls: Int!
    round: Int!
    roundEnd: Int!
  }

  type ConfigGameplay {
    defaultPlayers: Int!
    minPlayers: Int!
    maxPlayers: Int!
    roundsInGame: Int!
    answersInRound: Int!
    maxPointsPerRound: Int!
    winnerNickNameMaxLetters: Int!
    winnerNickNameLetterTable: String!
    topPlayers: Int!
  }

  type Config {
    timers: ConfigTimers!
    gameplay: ConfigGameplay!
  }

  type Game {
    _id: String!
    config: Config
    finished: Boolean!
    players: [Player]!
    rounds: [Round]!
    winner: Player
    startedOn: Date
    finishedOn: Date
  }

  type PlayersResponse {
    players: [Player]!
    total: Int
    page: Int!
    pages: Int!
  }

  type GamesResponse {
    games: [Game]!
    total: Int
    finished: Int
    page: Int!
    pages: Int!
  }

  type Query {
    players: PlayersResponse!
    games: GamesResponse!
    config: Config!
  }

  input InputPlayer {
    index: Int!
    score: Int!
    name: String!
  }

  input InputWinner {
    score: Int!
    name: String!
  }

  input InputPicture {
    picture: String!
    selected: Boolean!
    selectedBy: Int!
  }

  input InputRound {
    index: Int!
    pictures: [InputPicture]!
    answered: Boolean!
    answerIndex: Int!
    answeredBy: Boolean!
    timeLeft: Int!
    pointsReceived: Int!
  }

  input InputConfigTimers {
    controls: Int
    round: Int
    roundEnd: Int
  }

  input InputConfigGameplay {
    defaultPlayers: Int
    minPlayers: Int
    maxPlayers: Int
    roundsInGame: Int
    answersInRound: Int
    maxPointsPerRound: Int
    winnerNickNameMaxLetters: Int
    winnerNickNameLetterTable: String
    topPlayers: Int
  }

  input InputConfig {
    timers: InputConfigTimers
    gameplay: InputConfigGameplay
  }

  type Mutation {
    startGame(players: [InputPlayer]!): Game!
    endGame(gameId: String, winner: InputWinner!): Game!
    startRound(
      gameId: String!
      index: Int!
      pictures: [InputPicture!]!
      answerIndex: Int!
    ): Game!
    endRound(gameId: Int!, round: InputRound!): Game!
    setNickName(nickName: String!): Game!
    setConfig(config: InputConfig!): Config!
  }
`;

module.exports = schema;
