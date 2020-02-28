const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const schema = gql`
  scalar Date

  type Player {
    _id: ID
    gameId: ID
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
    _id: ID!
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

  type Image {
    _id: ID!
    image: String!
    extension: String!
    title: String!
    incorrectTitles: [String]!
    active: Boolean!
  }

  type ImagesResponse {
    images: [Image]!
    total: Int!
    active: Int!
  }

  type Query {
    players: PlayersResponse!
    games: GamesResponse!
    game(_id: ID!): Game!
    config: Config!
    images: ImagesResponse!
    image(_id: ID!): Image!
    nRandomImages(n: Int!): [Image]!
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

  input InputImage {
    _id: String
    image: String!
    title: String!
    incorrectTitles: [String]!
    active: Boolean!
  }

  type Mutation {
    startGame(players: [InputPlayer]!): Game!
    endGame(gameId: ID!, winner: InputWinner!): Game!
    startRound(
      gameId: ID!
      index: Int!
      pictures: [InputPicture!]!
      answerIndex: Int!
    ): Game!
    endRound(gameId: ID!, round: InputRound!): Game!
    setNickName(nickName: String!): Game!
    saveConfig(config: InputConfig!): Config!
    saveImage(image: InputImage!): Image!
    removeImage(_id: ID!): ImagesResponse!
  }
`;

module.exports = schema;
